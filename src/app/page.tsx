import MaxWithWrapper from "@/components/MaxWithWrapper";
import { buttonVariants } from "@/components/ui/button";
//npm lucide-react
import { ArrowRight } from "lucide-react";
//npx shadcn-ui@latest init

import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWithWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-centers space-x-2 overflow-hidden rounded-full border boder-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            The voyage of life
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold lg:text-7xl">
          Abandon <span className="text-blue-600">all hope</span> ye who enter
          here.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          The afterlife awaits. You can consult, question and ponder the texts
          of the ancients and find the help you know not to seek.
        </p>
        <Link
          className={buttonVariants({ size: "lg", className: "mt-5" })}
          href="/dashboard"
          target="blank">
          Enter Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWithWrapper>
    </>
  );
}
