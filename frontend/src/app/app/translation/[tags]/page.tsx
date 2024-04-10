"use client";

import React, {useState, useEffect} from "react";
import axios from "axios";
import { HiLanguage } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner"



import Link from "next/link";


export default function TranslationPage({params}:{params:{tags: string}}){
    const { data: session, status } = useSession();
    const [mainQuote, setMainQuote] = useState<any>();
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_QUOTES_WORKER}/api/af?tag=${params.tags}`)
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
        <div className="h-screen snap-center"> 
            <div className="bg-purple flex flex-row items-center h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <div className="flex items-center justify-between w-full p-6">
                        <Link href="/app#categories"><IoArrowBack className="text-2xl text-white"/></Link>
                        <p className="self-end text-white"><HiLanguage className="inline-block"/> English</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.quote:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>addQuote(mainQuote.quote, mainQuote.id )}><FaHeart className="text-2xl text-white"/></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <p className="self-end text-white p-6"><HiLanguage className="inline-block"/> Tagalog</p>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.tagalog:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>addQuote(mainQuote.tagalog, mainQuote.id )}><FaHeart className="text-2xl text-white"/></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <p className="self-end text-white p-6"><HiLanguage className="inline-block"/> Fijian</p>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.fijian:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>addQuote(mainQuote.fijian, mainQuote.id )}><FaHeart className="text-2xl text-white"/></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
            </div>
        </div>
    )
}