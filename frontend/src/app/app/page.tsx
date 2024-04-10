"use client";
import axios from "axios"
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiLanguage } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner"


export default function Home(){
    const { data: session, status } = useSession();
    const [mainQuote, setMainQuote] = useState<any>();
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_QUOTES_WORKER}/api/af/random`)
        .then(resp => setMainQuote(resp.data[0]))

    },[])

    const addQuote = (content:string, d1Id:number ) => {
        axios.post('/api/like-quote',{
            content:content,
            d1Id:d1Id,
            userId:session?.user.id
        })
        .then(resp=>console.log(resp))
        .catch(err=>console.error(err));
        toast('Added to your Liked tab 👍')
    }
    return(
        <div className="min-h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
            <div className="bg-off-white flex flex-col h-screen snap-center items-center justify-center"> 
                <div className="flex flex-col items-center gap-5">
                    <div className="flex justify-center items-center h-[200px] w-[310px] rounded-[200px] bg-purple">
                        <h2 className="text-3xl font-bold font-serif text-white text-center p-3">Swipe Away.</h2>

                    </div>
                    <div className="h-[80px] w-[80px] rounded-[200px] bg-purple">

                    </div>
                    <div className="h-[50px] w-[50px] rounded-[200px] bg-purple">

                    </div>
                </div>
            </div>
            <div className="h-screen snap-center"> 
                <div className="bg-purple flex flex-row items-center h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                    <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center p-6">
                        <p className="self-end text-white"><HiLanguage className="inline-block"/> English</p>
                        <div className="flex flex-col items-center">
                            <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.quote:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                            <button onClick={()=>addQuote(mainQuote.quote, mainQuote.id )}><FaHeart className="text-2xl text-white"/></button>
                        </div>
                        <p className="text-white p-3"></p>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center p-6">
                        <p className="self-end text-white"><HiLanguage className="inline-block"/> Tagalog</p>
                        <div className="flex flex-col items-center">
                            <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.tagalog:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                            <button onClick={()=>addQuote(mainQuote.tagalog, mainQuote.id )}><FaHeart className="text-2xl text-white"/></button>
                        </div>
                        <p className="text-white p-3"></p>
                    </div>
                </div>
            </div>
            <div className="h-screen snap-center"> 
                <div id="categories" className="bg-pink flex flex-row items-center h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                    <div className="flex flex-col h-full w-full gap-5 items-center shrink-0 snap-center overflow-y-scroll p-10">
                        <h2 className="text-2xl text-purple font-black italic self-start">CATEGORIES</h2>
                        <Link href="app/translation/family" className="flex items-center justify-center h-[250px] w-full bg-purple rounded-[50px] text-[50px] font-black text-white shrink-0">
                            FAMILY
                        </Link>
                        <Link href="app/translation/love" className=" flex items-center justify-center h-[250px] w-full bg-white rounded-[500px] text-[50px] font-serif font-black text-purple shrink-0">
                            love.
                        </Link>
                        <Link href="app/translation/work" className=" flex items-center justify-center h-[250px] w-full bg-purple rounded-2xl text-[50px] font-black text-white shrink-0 underline italic">
                            WORK
                        </Link>
                        <Link href="app/translation/peace" className=" flex items-center justify-center h-[250px] w-full bg-purple rounded-[500px] text-[50px] font-black font-serif text-white shrink-0 italic">
                            peace.
                        </Link>
                        <Link href="app/translation/life" className=" flex items-center justify-center h-[250px] w-full bg-white rounded-[50px] text-[50px] font-black text-purple shrink-0">
                            LIFE
                        </Link>
                        <Link href="app/translation/joy" className=" flex items-center justify-center h-[250px] w-full bg-purple rounded-[500px] text-[50px] font-black font-serif text-white shrink-0 underline">
                            joy.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}