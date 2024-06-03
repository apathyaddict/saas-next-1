"use client";
import React from "react";
import { CirclePlus } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface UpgradeButtonProps {
  className: string;
  buttonText: string;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  className,
  buttonText,
}) => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Upgrade or payment not enabled.",
          description: "This is for looks only.",
        });
      }}
      className={buttonVariants({
        className: "w-full",
        // @ts-ignore
        variant: `${className}`,
      })}>
      {buttonText} <CirclePlus className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
