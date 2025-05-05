"use client";

import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import {
  sendPasswordResetEmail
} from "firebase/auth";
import Link from "next/link";
import {  useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({  email: ""});

  const handleData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data?.email);
      toast.success("Reset Link has been sent to your email!");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <img className="h-12" src="https://firebasestorage.googleapis.com/v0/b/sundergarments-a564f.firebasestorage.app/o/SG_logo.png?alt=media&token=c7a9b97b-4f5d-4be4-bb5f-c0f1def10c21" alt="Logo" />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl text-red-500">Forgot Password</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={data?.email}
              onChange={(e) => {
                handleData("email", e.target.value);
              }}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />

            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              color="primary"
              className="bg-red-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg"
            >
              Send Reset Link
            </Button>
          </form>
          <div className="flex justify-between">
            <Link href={`/login`}>
              <button className="font-semibold text-sm text-red-500">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
