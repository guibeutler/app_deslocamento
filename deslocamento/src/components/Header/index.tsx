"use client";
import { Ubuntu } from "next/font/google";

import "./style.css";

const unbuto = Ubuntu({
  weight: ["400"],
  subsets: ["latin"],
});

interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header>
      <a className={unbuto.className}>App Deslocamento</a>
    </header>
  );
}
