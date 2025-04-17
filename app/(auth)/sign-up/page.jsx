"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  

  const handleData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      await updateProfile(credential.user, {
        displayName: data?.name,
      });
      const user = credential.user;
      await createUser({
        uid: user?.uid,
        displayName: data?.name,
        photoURL: user?.photoURL,
      });
      toast.success("Successfully Sign Up");
      router.push("/account");
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
          <h1 className="font-bold text-xl">Sign Up With Email</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Name"
              type="text"
              name="user-name"
              id="user-name"
              value={data?.name}
              onChange={(e) => {
                handleData("name", e.target.value);
              }}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
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
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              value={data?.password}
              onChange={(e) => {
                handleData("password", e.target.value);
              }}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              color="primary"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex justify-between">
            <Link href={`/login`}>
              <button className="font-semibold text-sm text-blue-700">
                Already user? Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
