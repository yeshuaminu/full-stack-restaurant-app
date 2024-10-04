"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Cart from "./components/Cart";

export default function Restaurants() {
  const [restaurantData, setRestaurantData] = useState(null)
  const [search, setSearch] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/restaurants")
      const data = await response.json()
      setRestaurantData(data)
    }
    fetchData()
  }, [])
  function submitSearch() {
    setSubmittedSearch(search)
  }
  const filteredList = restaurantData
    ?.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(submittedSearch.toLowerCase())
    })
  return (
    <div className="content">
      <div className="search">
        <input value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <button onClick={submitSearch}>Search</button>
      </div>
      <div className="card-grid">
        {restaurantData ? (filteredList.length ? filteredList
          .map((restaurant) => {
            return <div className="card" key={restaurant._id}>
              <div className="img-container" style={{backgroundImage: `url("${restaurant.image}")`}}>
                {/* <img src={restaurant.image} /> */}
              </div>
              <h1>
                <Link href={"/restaurants/" + restaurant._id + "/dishes"}>{restaurant.name}</Link>
              </h1>
              <div className="p-container">
                <p>{restaurant.description}</p>
              </div>
            </div>
          }) : <div>No Results Found</div>) : <div>Loading</div>}
      </div>
      <Cart/>
    </div>
  );
}
