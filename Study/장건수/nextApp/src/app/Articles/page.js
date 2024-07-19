import Image from "next/image";
import Link from "next/link";
import Recommand from "../components/Articles/Recommand";
import Article from "../components/Articles/Article";

export default function Articles() {
  
  
  return (
    <>
      <main className="mx-auto mt-20 max-w-screen-xl">
        <Recommand/>
        <Article/>
      </main>
    </>
  );
}
