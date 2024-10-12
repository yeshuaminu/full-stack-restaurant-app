"use client"

import { useState } from "react";

export default function Support(){
    const [data, setData] = useState({
        name:"",
        email:"",
        subject:"",
        message:""
    })
    const [status, setStatus] = useState(null)
    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            setStatus(errorData?.message || "Error creating ticket")
        } else {
            const responseData = await response.json()
            setStatus("Support Ticket Created")
            setData({
                name:"",
                email:"",
                subject:"",
                message:""
            })
        }
    }
return <form className="simple-form" onSubmit={handleSubmit}>
    <h2>Contact Us</h2>
    <label>
        Name
        <input name="name" onChange={onChange} required value={data.name}/>
    </label>
    <label>
        Email
        <input name="email" onChange={onChange} required value={data.email} type="email"/>
    </label>
    <label>
        Subject
        <input name="subject" onChange={onChange} required value={data.subject}/>
    </label>
    <label>
        Message
        <textarea name="message" onChange={onChange} required value={data.message}/>
    </label>
    <button>Submit</button>
    {status && <div>{status}</div>}
</form>
}