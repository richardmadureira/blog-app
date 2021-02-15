import NavBar from "./NavBar";

const Layout = props => (
    <>
        <NavBar />
        <main className="container-fluid">
            {props.children}
        </main>
    </>
);

export default Layout;