"use client";
import Link from "next/link";
import MenuDropdown from "./MenuDropdown";

export default function Header() {
  return (
    <nav className="flex w-5/6 md:w-[400px] flex-row items-center justify-between p-4 text-3xl bg-white self-center rounded-[50px] m-4 fixed bottom-0 z-10">
      <MenuDropdown />
      <Link href="/app#end" className="font-black text-purple">af.</Link>
      <p className="font-black font-serif text-white bg-purple rounded-3xl w-[45px] h-[45px] text-center">;</p>
    </nav>
  );
}
