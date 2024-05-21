import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  //this will merge classes in tailwind when it makes sense
  //it will also merge with other classes when the components are being reused
  return twMerge(clsx(inputs));
}
