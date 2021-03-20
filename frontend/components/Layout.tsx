import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
