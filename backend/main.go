package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"

	_ "github.com/mattn/go-sqlite3"
)

// struct for the data type I'm getting back
type ApiResponse struct {
	Results []Quote `json:"results"`
}

type Quote struct {
	Phrase string `json:"content"`
	Author string `json:"author"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type Payload struct {
	Model       string    `json:"model"`
	Messages    []Message `json:"messages"`
	Temperature float64   `json:"temperature"`
}

type ChatCompletion struct {
	Choices []struct {
		Message Message `json:"message"`
	} `json:"choices"`
}

func main() {
	wg := new(sync.WaitGroup)
	db, err := sql.Open("sqlite3", "quotes.db")
	if err != nil {
		log.Fatalln(err)
	}

	tag := "life"

	quoteUrl := fmt.Sprintf("https://api.quotable.io/search/quotes?query=%s&page=2", tag)

	resp, err := http.Get(quoteUrl)
	if err != nil {
		log.Fatalln(err)
	}
	//We Read the response body on the line below.
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	// this initializes the variable that the unmarshalled json data will be returned to
	var data ApiResponse

	// this throws an error if the error isn't nil and the err is being assigned to the json.unmarshal function
	if err := json.Unmarshal(body, &data); err != nil {
		log.Fatalln(err)
	}
	// for index, element := range data.Results[1:6] {
	for index, element := range data.Results[6:12] {
		wg.Add(1)
		go aiQuotes(wg, db, index, tag, element.Phrase)
	}
	wg.Wait()
}

func insertQuote(db *sql.DB, tag string, quote string, tagalog string) {
	log.Println("Inserting quote record ...")
	insertStudentSQL := `INSERT INTO quotes(tag, quote, tagalog) VALUES (?, ?, ?)`
	statement, err := db.Prepare(insertStudentSQL)

	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(tag, quote, tagalog)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func aiQuotes(wg *sync.WaitGroup, db *sql.DB, id int, tag string, quote string) {

	defer wg.Done()

	fmt.Printf("Worker %d starting\n", id)

	// Replace YOUR_API_KEY with your actual OpenAI API key
<<<<<<< HEAD
	apiKey := "<your_own_key"
=======
	apiKey := "{openai-api-key}"
>>>>>>> f830558 (working beta)

	// Setup the payload
	data := Payload{
		Model: "gpt-3.5-turbo", // Specify the model
		Messages: []Message{
			{
				Role:    "system",
				Content: "Create 5 separate positive affirmations, each up to 75 characters in length, from this quote. For each affirmation, provide a tagalog translation right after the english affirmation and make sure to separate it with a dollar sign. Don't number them and make sure to separate each english and tagalog affirmation pair with a percent sign.",
			},
			{
				Role:    "user",
				Content: quote,
			},
		},
		Temperature: 0.9,
	}
	payloadBytes, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
	}
	body := bytes.NewReader(payloadBytes)

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", body)
	if err != nil {
		log.Fatalln(err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var chatData ChatCompletion

	if err := json.Unmarshal(responseBody, &chatData); err != nil {
		log.Fatalln(err)
	}

	separateQuotes := strings.Split(chatData.Choices[0].Message.Content, "%")
	fmt.Print(strings.Split(separateQuotes[0], "$"))

	for _, element := range separateQuotes {
		println(len(element))

		taglish := strings.Split(element, "$")

		if len(taglish[0]) != 0 && len(taglish[0]) <= 75 {
			insertQuote(db, tag, taglish[0], taglish[1])
			fmt.Println(taglish[0])
		}
	}

	fmt.Printf("Worker %d done\n", id)

}
