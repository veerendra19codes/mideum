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
            Register Page
            <form action="" onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">

                <input type="text" placeholder="username" name="username" className="border-[1px] border-gray-500 rounded-xl py-1 pl-4" onChange={(e) => handleInput(e)} />

                <input name="email" type="email" placeholder="email" className="border-[1px] border-gray-500 rounded-xl py-1 pl-4" onChange={(e) => handleInput(e)} />

                <input name="password" type="text" placeholder="password" className="border-[1px] border-gray-500 rounded-xl py-1 pl-4" onChange={(e) => handleInput(e)} />

                {error && <span className="error-message w-full text-center text-red-600">{error}</span>}

                <button type="submit" className="py-2 px-4 rounded-xl bg-blue-500 text-white">Register</button>

            </form>

            <Link href="/login" >Already have an Account? <span className="text-blue-500 hover:text-blue-400 hover:underline">Login</span></Link>
        </div>
    )
}

export default Registerpage