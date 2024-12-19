"use client";

import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"

const Loginpage = () => {
    const router = useRouter();

    const session = useSession();

    useEffect(() => {
        if (session.data?.user) {
            router.push("/")
        }
    }, [session.data, router])

    const [info, setInfo] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // console.log({ info });
        if (!info.email || !info.password) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);
                // console.log({ info })
                const res = await signIn("credentials",
                    {
                        email: info.email,
                        password: info.password,
                        redirect: false,
                        callbackUrl: process.env.NEXTAUTH_URL,
                    })
                if (res?.error) {
                    setError("Invalid Credentials.")
                    setPending(false);
                    return;
                }
                setPending(false);
                router.push("/");
            } catch (err) {
                setPending(false);
                console.log("Error while logging user in page.jsx", err);
                setError("Something went wrong");
            }
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4">

            <form action="" className="flex flex-col justify-center items-center gap-4 p-8 bg-gray-200 dark:bg-gray-800 rounded-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 justify-center items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        Login
                    </h1>
                    <h6>Enter details below to login</h6>
                </div>
                <input name="email" type="email" placeholder="email*" className="border-[1px] border-gray-500 rounded-xl py-2 pl-4" onChange={(e) => {
                    handleInput(e);
                    setError("");
                }} />

                <input name="password" type="text" placeholder="password*" className="border-[1px] border-gray-500 rounded-xl py-2 pl-4" onChange={(e) => {
                    handleInput(e);
                    setError("");
                }} />

                {error && <span className="error-message w-full text-center text-red-600">{error}</span>}

                <button type="submit" className="py-2 px-4 rounded-xl bg-blue-500 text-white mt-4" disabled={pending ? true : false}>{pending ? "Logging in" : "Login"}</button>
                <Link href="/register" >Don&apos;t have an Account? <span className="text-blue-500 hover:text-blue-400 hover:underline">Register</span></Link>
            </form>
        </div>
    )
}

export default Loginpage