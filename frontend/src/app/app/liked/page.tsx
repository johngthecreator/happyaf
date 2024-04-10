"use client";
import axios from "axios"
import React,{useState, useEffect} from "react";
import { SessionProvider, useSession } from "next-auth/react"
import Link from "next/link";
import { DeleteLiked } from "@/components/DeleteLiked";


export default function LikedPage(){
    const [likedQuotes, setLikedQuotes] = useState([]);
    const [toReRender, setToReRender] = useState(false);
    const { data: session, status } = useSession();
    useEffect(()=>{
        if (session)
        axios.get(`/api/all-liked?uid=${session.user.id}`)
        .then((resp:any) => setLikedQuotes(resp.data.body))
        setToReRender(false)

    },[status, toReRender])
    return(
        <SessionProvider>
            <div className="h-screen snap-center"> 
                <div id="categories" className="bg-pink flex flex-row items-center h-full snap-x snap-mandatory scroll-smooth">
                    <div className="flex flex-col h-full w-full items-center shrink-0 snap-center p-10">
                        <h2 className="text-2xl text-purple font-black italic self-start pb-3">LIKED</h2>
                        <div className="w-full items-center flex flex-col overflow-y-scroll">
                            {likedQuotes.length > 0 ? likedQuotes.map((quote:any, index:number)=>{
                                return(
                                        <div key={index} className="w-full md:w-1/2 p-4 space-y-4 bg-white rounded-xl md:text-center mb-10">
                                                <h2 className="text-2xl font-semibold">{quote.content}</h2>
                                                <div className="flex flex-row gap-2">
                                                    <DeleteLiked id={quote.id} toRerender={()=>setToReRender(true)}/>
                                                    <Link className="w-full border-2 border-solid border-purple flex items-center justify-center rounded-md" href={`/app/liked/${quote.d1Id}`}>
                                                        View
                                                    </Link>
                                                </div>
                                        </div>
                                )
                            }):(
                                <p className="text-2xl p-5 font-bold text-purple text-center">Nothing Here... <br/> Go like some stuff </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SessionProvider>
    )
}