import { useContext } from "react"
import AppContext from "../contexts/appContext"
import Link from "next/link"

export default function Cart({title="Cart", hideOrder}) {
    const { cart, removeItem, addItem, cartTotal } = useContext(AppContext)
    return <div className="cart">
        <h1>{title}</h1>
        <h2>Your Order</h2>
        <div className="cart-items">
            <h3>Items:</h3>
            {Object.values(cart).map(({ item, quantity }) => {
                return <div key={item._id} className="cart-card">
                    <h1>
                        <span>{item.name}</span>
                        <span className="price">${item.price}.00</span>
                    </h1>
                    <div>
                        <button onClick={() => { removeItem(item) }}>-</button>
                        <button onClick={() => { addItem(item) }}>+</button>
                        <span>x{quantity}</span>
                    </div>
                </div>
            })}
        </div>
        <div className="review">
            {!hideOrder && <Link className="order-nav" href="/checkout">Order</Link>}
            <div className="total">Total: ${cartTotal}.00</div>
        </div>
    </div>
}