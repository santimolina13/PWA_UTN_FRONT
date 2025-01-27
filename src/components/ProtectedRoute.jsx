import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

const Protectedroute=()=>{
    const {isAuthenticatedState}=useContext(AuthContext)
    return isAuthenticatedState? <Outlet/>:<Navigate to={"/login"} />
}
export default Protectedroute
