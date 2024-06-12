"use client";
import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useMoralis } from "react-moralis";

const arr = [
  { name: "clothing & jewelry", link: "#clothing" },
  { name: "electronics & gadgets", link: "#electronics" },
  { name: "toys & gaming", link: "#toys" },
];

export default function Header() {
  const { isWeb3Enabled } = useMoralis();
  return (
    <nav className="flex flex-col pt-2 bg-black">
      <div className="flex justify-between items-center container mx-auto">
        <div className="text-4xl font-semibold">U-Bay</div>
        <div className="hidden md:inline-block w-[50%] self-center">
          <input
            type="text"
            className="h-10 w-full rounded-sm px-2 text-lg "
            placeholder="search any item"
          />
        </div>
        <div>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>

      {isWeb3Enabled && (
        <div className="mx-auto bg-sky-800 w-full">
          <div className="flex justify-center gap-x-4 md:gap-x-12 container mx-auto">
            {arr.map((item, index) => (
              <button key={index} className="capitalize">
                <Link href={item.link} passHref>{item.name}</Link>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
