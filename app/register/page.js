"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const router = useRouter()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    })
    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (data.password !== data.confirm) {
            alert("Passwords do not match")
            return
        }
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            alert(errorData?.message || "Error creating account")
        } else {
            router.push("/")
        }
    }
    return <form className="register-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
            Name
            <input name="name" onChange={onChange} required value={data.name} />
        </label>
        <label>
            Email
            <input name="email" onChange={onChange} required value={data.email} type="email"/>
        </label>
        <label>
            Password
            <input name="password" onChange={onChange} required value={data.password} type="password" />
        </label>
        <label>
            Confirm Password
            <input name="confirm" onChange={onChange} required value={data.confirm} type="password" />
        </label>
        <button>Create Account</button>
    </form>
}