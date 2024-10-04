"use client"

import { useContext, useState } from "react";
import Cart from "../components/Cart";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AppContext from "../contexts/appContext";
import Cookies from "js-cookie";

export default function Checkout() {
    const [data, setData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        stripe_id: "",
    });
    const [status, setStatus] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { cart, cartTotal } = useContext(AppContext);

    function onChange(e) {

        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function submitOrder(event) {
        event.preventDefault();

        // // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);

        // // Pass the Element directly to other Stripe.js methods:
        // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
        // get token back from stripe to process credit card
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get("token");
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            // headers: userToken && { Authorization: `Bearer ${userToken}` },
            body: JSON.stringify({
                amount: Number(Math.round(cartTotal + "e2") + "e-2"),
                dishes: Object.values(cart).map((dish) => {
                    return {
                        ...dish,
                        item:dish.item._id
                    }
                }),
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                token: token.token.id,
            }),
        });

        if (!response.ok) {
            setStatus(response.statusText);
        } else {
            setStatus("Order Confirmed")
        }

        // OTHER stripe methods you can use depending on app
        // // or createPaymentMethod - https://stripe.com/docs/js/payment_intents/create_payment_method
        // stripe.createPaymentMethod({
        //   type: "card",
        //   card: cardElement,
        // });

        // // or confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
        // stripe.confirmCardPayment(paymentIntentClientSecret, {
        //   payment_method: {
        //     card: cardElement,
        //   },
        // });
    }

    return <div className="checkout">
        <Cart title="Review Your Order" hideOrder />
        <form className="checkout-form" onSubmit={submitOrder}>
            <h1>Checkout</h1>
            <div className="content">
                <label>
                    Name
                    <input value={data.name} onChange={onChange} name="name" required/>
                </label>
                <label>
                    Address
                    <input value={data.address} onChange={onChange} name="address" required/>
                </label>
                <label>
                    City
                    <input value={data.city} onChange={onChange} name="city" required/>
                </label>
                <label>
                    State
                    <input value={data.state} onChange={onChange} name="state" required/>
                </label>
                <label>
                    Zip Code
                    <input value={data.zipCode} onChange={onChange} name="zipCode" required/>
                </label>
                {/* <CardNumberElement/>
                <CardExpiryElement/>
                <CardCvcElement/> */}
                <label>
                    <div className="card-label">Credit or debit card</div>
                    <CardElement />
                </label>
                {status && <div>{status}</div>}
            </div>
            <button>Confirm Order</button>
        </form>
    </div>
}