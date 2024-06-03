"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const authCallback = () => {
  const router = useRouter;

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
};

export default authCallback;
