import { useContext } from "react"
import AppContext from "../contexts/appContext"

export default function ProductCard({ product, type }) {
    const { addItem } = useContext(AppContext)
    return <div className={"card " + type}>
        <div className="img-container" style={{ backgroundImage: `url("${product.image}")` }}>
        </div>
        <h1>{product.name}</h1>
        <div className="p-container">
            <p>{product.description}</p>
            <div>${product.price}.00</div>
        </div>
        <div className="button-container">
            <button onClick={() => { addItem(product) }}>+ Add to Cart 🛒</button>
        </div>
    </div>
}