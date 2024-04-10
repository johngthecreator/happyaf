import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return <main className="flex h-full w-full flex-col overflow-y-scroll scroll-smooth">
    <div className="h-screen w-full flex flex-col bg-purple p-16">
      <div className="flex w-full">
        <h2 className="text-white text-3xl font-black italic">HAPPY AF</h2>
      </div>
      <div className="flex flex-col h-full justify-center">
        <h1 className="font-black text-[35px] md:text-[50px] text-white">It just means more when</h1>
        <h1 className="font-black text-[35px] md:text-[50px] text-white">you hear it in your <span className="underline text-pink">language</span>.</h1>
        <Link href="/app" className="text-center text-white w-3/4 md:w-1/4 p-4 rounded-[50px] font-bold bg-pink mt-5">Get Started</Link>
      </div>
    </div>
  </main>;
}
