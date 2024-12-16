"use client";

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react';

const Registerpage = () => {
    const router = useRouter();

    const [info, setInfo] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [, setPending] = useState(false);

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement; // Type assertion
        setInfo((prev) => ({ ...prev, [target.name]: target.value }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // console.log({ info });
        if (!info.username || !info.email || !info.password) {
            setError("Must provide all credentials");
        } else {
            try {
                setPending(true);

                const res = await fetch("api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });
                if (res.ok) {
                    setPending(false);
                    // const form = e.target;
                    // form.reset();
                    router.push("/login");
                    console.log("User registered successfully");
                }
                else {
                    setPending(false);
                    const errorData = await res.json();
                    setError(errorData.message);
                }
            } catch (err) {
                setPending(false);
                console.log("Error while registering user in page.jsx", err);
                setError("error in register page in catch block");
            }
        }
    }
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
            <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-8 rounded-xl bg-gray-800">
                <div className="flex flex-col gap-2 justify-center items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        Register
                    </h1>
                    <h6>Enter details below to register</h6>
                </div>

                <input type="text" placeholder="username*" name="username" className="border-[1px] border-gray-500 rounded-xl py-2 pl-4" onChange={(e) => {
                    handleInput(e);
                    setError("");
                }} />

                <input name="email" type="email" placeholder="email*" className="border-[1px] border-gray-500 rounded-xl py-2 pl-4" onChange={(e) => {
                    handleInput(e);
                    setError("");
                }} />

                <input name="password" type="text" placeholder="password*" className="border-[1px] border-gray-500 rounded-xl py-2 pl-4" onChange={(e) => {
                    handleInput(e);
                    setError("");
                }} />

                {error && <span className="error-message w-full text-center text-red-600">{error}</span>}

                <button type="submit" className="py-2 px-4 rounded-xl bg-blue-500 text-white mt-4">Register</button>
                <Link href="/login" >Already have an Account? <span className="text-blue-500 hover:text-blue-400 hover:underline">Login</span></Link>

            </form>

        </div>
    )
}

export default Registerpage