"use client"

import Cart from "@/app/components/Cart";
import ProductCard from "@/app/components/ProductCard";
import { useEffect, useState } from "react";

export default function Dishes({ params: { restaurantId } }) {
  const [dishData, setDishData] = useState(null)
  const [search, setSearch] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/restaurants/${restaurantId}/dishes`)
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
          return <ProductCard type="dish" product={dish} key={dish._id}/>
        }) : <div>No Results Found</div>) : <div>Loading</div>}
      </div>
      <Cart/>
    </>
  );
}
