import { Header } from "@/components/Header";

export default function Layout({children}: {children: React.ReactNode}): React.JSX.Element {
    return (
        <>
            <Header />
            {children}
        </>
    )

}