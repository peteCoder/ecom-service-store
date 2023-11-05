import React, { MouseEventHandler } from "react";
import Button from "../Button";
import { cn } from "@/libs/utils";

interface IconButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  Icon: React.ReactElement;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  onClick,
  Icon,
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        `
          rounded-full flex items-center justify-center bg-white border shadow-md
          p-2 hover:scale-110 transition
          `,
        className
      )}
    >
      {Icon}
    </Button>
  );
};

export default IconButton;
