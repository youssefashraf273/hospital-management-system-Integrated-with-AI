import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const CardContainer = ({ children, className, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={` bg-white rounded-lg p-5 md:p-10 shadow-md ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
