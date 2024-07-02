import Header from "@/components/header"

export default async function Home() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <div className="container mx-auto flex items-center justify-between py-2 sm:px-8 lg:px-12">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Home</h1>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Hello</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}