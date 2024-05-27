"use client";

import React, { useEffect, useState } from "react";
import MaxWithWrapper from "./MaxWithWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

const Navbar: React.FC = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    setUpProviders();
  }, []);

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWithWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>quill.</span>
          </Link>

          {/* TODO add navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/pricing"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}>
              Pricing
            </Link>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}>
                  Sign In
                </Button>
              ))}
            <RegisterLink
              className={buttonVariants({
                size: "sm",
              })}>
              Get Started
            </RegisterLink>
          </div>
        </div>
      </MaxWithWrapper>
    </nav>
  );
};

export default Navbar;
