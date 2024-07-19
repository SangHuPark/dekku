import Image from "next/image";
import Link from "next/link";
import Banner from "./components/Home/Banner";
import Notice from "./components/Home/Notice";
import Viewer from "./components/Home/Viewer";
import Footer from "./components/Home/Footer";

export default function Home() {
  return (
    <>
      <section className="mx-auto mt-20 max-w-screen-xl">
        <Banner />
        <Notice />
        <Viewer />
      </section>
      <Footer />
    </>
  );
}
