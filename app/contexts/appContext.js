import { createContext } from "react";

const AppContext = createContext(
    {isAuthenticated:true, 
        cart: [],
        addItem:()=>{},
        removeItem:()=>{},
        user:false, 
        setUser:()=>{},
        cartTotal:0
    });
export default AppContext;