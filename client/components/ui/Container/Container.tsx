import { FC } from "react";
import s from "./Container.module.css";

interface IContainer {
  children: React.ReactNode;
}

const Container: FC<IContainer> = ({ children }) => {
  return <div className={s.root}>{children}</div>;
};

export default Container;
