import { FC } from "react";
import { Footer, Navbar } from "@components/common";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
