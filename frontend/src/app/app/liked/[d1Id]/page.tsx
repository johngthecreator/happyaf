"use client";

import React, {useState, useEffect, useId} from "react";
import axios from "axios";
import { HiLanguage } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { IoShareOutline } from "react-icons/io5";
import Link from "next/link";
import { toast } from "sonner";

export default function LikeQuotePage({params}:{params:{d1Id: string}}){
    const [mainQuote, setMainQuote] = useState<any>();
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_QUOTES_WORKER}/api/af/single?id=${params.d1Id}`)
        .then(resp => setMainQuote(resp.data[0]))
    },[])

    const shareQuote = (link:string) => {
        navigator.clipboard.writeText(link)
        toast("Link copied!😃")
    }


    return(
        <div className="h-screen snap-center"> 
            <div className="bg-purple flex flex-row items-center h-full overflow-x-scroll snap-x snap-mandatory scroll-smooth">
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <div className="flex items-center justify-between w-full p-6">
                        <Link href="/app/liked"><IoArrowBack className="text-2xl text-white"/></Link>
                        <p className="self-end text-white"><HiLanguage className="inline-block"/> English</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.quote:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>shareQuote(`${process.env.NEXT_PUBLIC_SHARE_URL}/share/${mainQuote.id}`)}><IoShareOutline className="text-white text-2xl" /></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <p className="self-end text-white p-6"><HiLanguage className="inline-block"/> Tagalog</p>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.tagalog:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>shareQuote(`${process.env.NEXT_PUBLIC_SHARE_URL}/share/${mainQuote.id}`)}><IoShareOutline className="text-white text-2xl" /></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full shrink-0 snap-center">
                    <p className="self-end text-white p-6"><HiLanguage className="inline-block"/> Fijian</p>
                    <div className="flex flex-col items-center">
                        <p className="p-10 text-2xl font-black text-white">{mainQuote ? mainQuote.fijian:"Lorem ipsum dolor sit amet, ut labore et dolore magna."}</p>
                        <button onClick={()=>shareQuote(`${process.env.NEXT_PUBLIC_SHARE_URL}/share/${mainQuote.id}`)}><IoShareOutline className="text-white text-2xl" /></button>
                    </div>
                    <p className="text-white p-3"></p>
                </div>
            </div>
        </div>
    )
}