import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

export default async function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-1 justify-center py-40"></main>
            <Footer />
        </>
    );
}
