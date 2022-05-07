import { ButtonHTMLAttributes, FC } from "react";
import s from "./Button.module.css";
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<IButton> = ({ children, ...props }) => {
  return (
    <button className={s.root} {...props}>
      {children}
    </button>
  );
};

export default Button;
