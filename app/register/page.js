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
    const [status, setStatus] = useState(null)
    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (data.password !== data.confirm) {
            alert("Passwords do not match")
            return
        }

        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            setStatus(errorData?.message || "Error creating account")
        } else {
            setStatus("Successfully Created Account!")
        }
    }
    return <form className="simple-form" onSubmit={handleSubmit}>
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
        {status && <div>{status}</div>}
    </form>
}