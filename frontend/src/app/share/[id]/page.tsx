"use client";

import React, {useState, useEffect} from "react";
import axios from "axios";
import { HiLanguage } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner"



import Link from "next/link";


export default function SharePage({params}:{params:{id: string}}){
    const [mainQuote, setMainQuote] = useState<any>();
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_QUOTES_WORKER}/api/af/single?id=${params.id}`)
        .then(resp => setMainQuote(resp.data[0]))
    },[])

    return(
        <div className="h-screen snap-center"> 
            <div className="bg-purple flex flex-row items-center h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <div className="flex items-center justify-between w-full p-6">
                        <Link href="/" className="py-2 px-7 rounded-full bg-white font-bold text-pink">Sign Up</Link>
                        <p className="self-end text-white"><HiLanguage className="inline-block"/> English</p>
                    </div>
                    <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.quote:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                    <p className="text-white p-3"></p>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <p className="self-end text-white p-6"><HiLanguage className="inline-block"/> Tagalog</p>
                    <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.tagalog:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                    <p className="text-white p-3"></p>
                </div>
            </div>
        </div>
    )
}