import Link from "next/link"

export default function NavBar() {
    return (
        <ul className="flex flex-row justify-evenly p-4">
            <li>
                <Link href={"/"}>stable-diffusion</Link>
            </li>
            <li>
                <Link href={"SNPO"}>stylized-neural-painting-oil</Link>
            </li>
            <li>
                <Link href={"/SD"}>scribble-diffusion</Link>
            </li>
        </ul>
    )
}