"use client"

import Cart from "@/app/components/Cart";
import AppContext from "@/app/contexts/appContext";
import { useContext, useEffect, useState } from "react";

export default function Dishes({ params: { restaurantId } }) {
  const {addItem, cart} = useContext(AppContext)
  const [dishData, setDishData] = useState(null)
  const [search, setSearch] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}/dishes`)
      const data = await response.json()
      setDishData(data)
    }
    fetchData()
  }, [])
  function submitSearch() {
    setSubmittedSearch(search)
  }
  const filteredList = dishData
    ?.filter((dish) => {
      return dish.name.toLowerCase().includes(submittedSearch.toLowerCase())
    })
  return (
    <>
      <div className="search">
        <input value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <button onClick={submitSearch}>Search</button>
      </div>
      <div className="card-grid">
        {dishData ? (filteredList.length ? filteredList.map((dish) => {
          return <div className="card dish" key={dish._id}>
            <div className="img-container" style={{backgroundImage: `url("${dish.image}")`}}>
              {/* <img src={dish.image} /> */}
            </div>
            <h1>{dish.name}</h1>
            <div className="p-container">
              <p>{dish.description}</p>
              <div>${dish.price}.00</div>
            </div>
            <div className="button-container">
              <button onClick={() => {addItem(dish)}}>+ Add to Cart 🛒</button>
            </div>
          </div>
        }) : <div>No Results Found</div>) : <div>Loading</div>}
      </div>
      <Cart/>
    </>
  );
}
