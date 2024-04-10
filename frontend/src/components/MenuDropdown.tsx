"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { CgMenuGridO } from "react-icons/cg";

export default function MenuDropdown() {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger className="focus:outline-none">
        <CgMenuGridO className="font-black text-purple"/>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col justify-between p-5">
        <div className="p-5">
          <div className="flex flex-col gap-4 text-3xl font-black text-purple">
            <DrawerTrigger asChild>
              <Link href="/app">
                Home
              </Link>
            </DrawerTrigger>
            <DrawerTrigger asChild>
            <Link href="/app/liked">
              Liked
            </Link>
            </DrawerTrigger>
            {/* <h2>About</h2> */}
          </div>
        </div>
        <button className="py-3 rounded-[100px] bg-purple text-2xl font-black text-white"
        onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>
          Logout
        </button>
      </DrawerContent>
    </Drawer>
  );
}
