import Image from "next/image";
import Header from "./Components/header";
import Main from "./Components/main";

export default function Home() {
  return (
    <main className="bg-white overflow-y-scroll relative w-full min-h-screen">
      <div className="">
        <Header/>
        <Main/>
      </div>
      
    </main>
  );
}
