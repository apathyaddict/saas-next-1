import MaxWithWrapper from "@/components/MaxWithWrapper";
import { buttonVariants } from "@/components/ui/button";
//npm lucide-react
import { ArrowRight, SquareCode } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWithWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center cursor-default justify-centers space-x-2 overflow-hidden rounded-full border boder-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-md font-semibold text-gray-700">
            inferno<span className="text-primary">.</span>
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold lg:text-7xl">
          Abandon <span className="text-primary">all hope</span> ye who enter
          here.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          The afterlife awaits. You can consult, question and ponder the texts
          of the ancients and find the help you know not to seek.
        </p>
        <Link
          className={buttonVariants({ size: "lg", className: "mt-5" })}
          href="/pricing"
        >
          Enter Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWithWrapper>

      {/* deco */}
      <div>
        <div className="relative isolate">
          <div
            //to let the users  know this is purely decorative
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ed2f4c] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24 ">
                <div className="-m-2 rounded-xl bg-gray-900/10 p-2 ring-1 ring-inset  ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/dashboard-preview.png"
                    alt="product preview"
                    width={2645}
                    height={1459}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* feature section */}

      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto  max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Dive into your PDFs in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Consult and interact with your files
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-6 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300  pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Featuring a free account or our{" "}
                <Link href="/pricing" className="text-primary ">
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your pdf file
              </span>
              <span className="mt-2 text-zinc-700">
                We'll process your file to enable rotating, zooming and
                commenting
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-primary">Step 3</span>
              <span className="text-xl font-semibold">Start Leaving Notes</span>
              <span className="mt-2 text-zinc-700">
                It's that simple. Try it out today.
              </span>
            </div>
          </li>
        </ol>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24 ">
            <div className="-m-2 rounded-xl bg-gray-900/10 p-2 ring-1 ring-inset  ring-gray-900/10 lg:-m-2 lg:rounded-2xl lg:p-4">
              <Image
                src="/file-upload-preview.png"
                alt="uploading preview"
                width={2607}
                height={1205}
                quality={75}
                className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer */}

      <div className="mx-auto mb-6 md:mb-20 mt-10 max-w-5xl sm:mt-56 ">
        <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
          <div className="flex flex-col md:flex-row justify-around items-center md:gap-10 gap-1">
            <h3 className="text-xl font-semibold">
              {" "}
              inferno
              <span className="text-primary">.</span>
            </h3>
            <span className="mt-2 text-xs md:text-base text-zinc-700">
              NextJs/React
            </span>
            <span className="mt-2 text-xs md:text-base text-zinc-700">
              MongoDB
            </span>

            <span className="mt-2 text-xs md:text-base text-zinc-700">
              PDF functionality
            </span>

            <a
              href="http://www.eveseni.com"
              target="_blank"
              className="cursor-pointer"
            >
              <span className="text-sm md:font-medium text-zinc-700">
                <SquareCode className="g-6 w- inline-block mr-2" />
                Eve Aimée <span className="text-primary">Seni</span>
              </span>
            </a>

            <span className="mt-2 text-xs text-zinc-700">©2024</span>
          </div>
        </div>
      </div>
    </>
  );
}
