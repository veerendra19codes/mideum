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
    const [, setError] = useState("");
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
            Login Page
            <form action="" className="w-full flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="email" className="border-[1px] border-gray-500 rounded-xl py-1 pl-4" onChange={(e) => handleInput(e)} />
                <input name="password" type="text" placeholder="password" className="border-[1px] border-gray-500 rounded-xl py-1 pl-4" onChange={(e) => handleInput(e)} />
                <button type="submit" className="py-2 px-4 rounded-xl bg-blue-500 text-white" disabled={pending ? true : false}>{pending ? "Logging in" : "Login"}</button>
            </form>
            <Link href="/register" >Don&apos;t have an Account? <span className="text-blue-500 hover:text-blue-400 hover:underline">Register</span></Link>
        </div>
    )
}

export default Loginpage