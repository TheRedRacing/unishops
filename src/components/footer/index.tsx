export default function Footer() {
    return (
        <footer>
            <div className="container mx-auto flex items-center justify-center px-6 py-4 lg:px-8">
                <p className="text-center text-xs leading-5 text-zinc-800 dark:text-zinc-200">&copy; Copyright {new Date().getFullYear()} UniShops. All rights reserved.</p>
            </div>
        </footer>
    );
}
