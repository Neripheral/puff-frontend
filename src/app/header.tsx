import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="p-3 bg-black/30">
            <Link href="/">
                <Image
                    src="/full-logo.png"
                    width={100}
                    height={200}
                    className="border-1 border-white"
                    alt="Puff logo"
                />
            </Link>
        </header>
    );
}