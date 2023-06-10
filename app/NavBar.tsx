'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const currentURL = usePathname();

  return (
    <ul className="flex flex-row justify-evenly p-4">
      <li className={currentURL === "/" ? "active-site" : ""}>
        <Link href={"/"}>stable-diffusion</Link>
      </li>
      <li className={currentURL === "/oil-painting" ? "active-site" : ""}>
        <Link href={"/oil-painting"}>stylized-neural-painting-oil</Link>
      </li>
      <li className={currentURL === "/scribble-diffusion" ? "active-site" : ""}>
        <Link href={"/scribble-diffusion"}>scribble-diffusion</Link>
      </li>
      <li className={currentURL === "/face-restoration" ? "active-site" : ""}>
        <Link href={"/face-restoration"}>face-restoration</Link>
      </li>
      <li className={currentURL === "/anime-style" ? "active-site" : ""}>
        <Link href={"/anime-style"}>anime-style</Link>
      </li>
    </ul>
  )
}
