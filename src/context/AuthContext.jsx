import { createContext, useEffect, useState } from "react"

export const AuthContext= createContext()

export const AuthContextProvider=({children})=>{

    const [isAuthenticatedState, setIsAuthenticatedState]=useState(Boolean(sessionStorage.getItem("acces_token")))
    const login=(acces_token)=>{
        sessionStorage.setItem("acces_token",acces_token)
        setIsAuthenticatedState(true)
    }
   /*  useEffect(()=>{
        const auth_token=sessionStorage.getItem('acces_token')
        if(auth_token){
            setIsAuthenticatedState(true)
        }
    },[]) */
    
    return(
        <AuthContext.Provider value={{isAuthenticatedState,login}}>
            {children}
        </AuthContext.Provider>
    )
}












































/* const AuthContextProvider=({children})=>{
    let isAuthenticated=Boolean(sessionStorage.getItem("acces_token"))
const [isAuthenticatedState, setIsAuthenticatedState]=useState(isAuthenticated)
    useEffect(()=>{
        const auth_token=sessionStorage.getItem('acces_token')
        if(auth_token){
            setIsAuthenticatedState(true)
        }
    },[])
    
    return(
        <AuthContext.Provider value={{isAuthenticatedState}}>

            {children}
        </AuthContext.Provider>
    )

}
export default AuthContextProvider */