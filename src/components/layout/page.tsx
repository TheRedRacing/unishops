interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return <section className="mx-auto w-full max-w-2xl py-12 lg:max-w-5xl">{children}</section>;
};
