"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const UpgradeButton = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Upgrade or payment not enabled. ",
          description: "This is for looks only.",
        });
      }}
      className="w-full">
      Upgrade now <CirclePlus className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
