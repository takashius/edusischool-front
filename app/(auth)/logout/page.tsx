"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/api/auth";
import Cookies from "js-cookie";
import Loader from "@/components/common/Loader";

export default function Page() {
  const router = useRouter();
  const { isSuccess, isError, isFetched } = useLogout();

  useEffect(() => {
    if (isSuccess || isError || isFetched) {
      Cookies.remove("authToken", { path: '/' });
      router.push("/login");
    }
  }, [isSuccess, isError, isFetched, router]);

  return <Loader />;
}