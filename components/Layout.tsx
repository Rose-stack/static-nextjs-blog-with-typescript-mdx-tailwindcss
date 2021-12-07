import Header from './Header';

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}: Props) => {
    return (
        <>
        <div className="max-w-prose mx-auto px-4">
        <Header />
        <main className="pt-4 pb-12">{children}</main>
        </div>
        </>
    )
}

export default Layout;