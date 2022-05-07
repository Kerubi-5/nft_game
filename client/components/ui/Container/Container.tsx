import { ElementType, FC, HTMLAttributes } from "react";
import s from "./Container.module.css";

interface IContainer {
  children: React.ReactNode;
  el?: ElementType<HTMLAttributes<HTMLElement>>;
}

const Container: FC<IContainer> = ({ children, el: Component = "div" }) => {
  return <Component className={s.root}>{children}</Component>;
};

export default Container;
