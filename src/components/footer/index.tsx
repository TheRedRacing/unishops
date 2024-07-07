export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="container mx-auto flex items-center justify-center px-6 py-4 lg:px-8">
                <p className="text-center text-xs leading-5 text-zinc-800 dark:text-zinc-200">
                    &copy;{year} UniShop, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}