import React,{useContext}from 'react'
import useForm from '../hooks/useForm'
import ENVIROMENT from '../utils/constans/enviroment'
import { AuthContext } from '../context/authContext'
import { Link , useNavigate} from 'react-router-dom'
const LoginScreen = () => {
   const {login,isAuthenticatedState}=useContext(AuthContext)
   console.log(isAuthenticatedState)
   const navigate=useNavigate()
    const {form_state, handleChangeInput}=useForm({email:'',password:''})
    const url= new URLSearchParams(window.location.search)
    if(url.get('verified')){
      alert('cuenta verificada')
    }
    
    const handleSubmitForm= async (event)=>{
      
      try{
        event.preventDefault()
        const response=await fetch(ENVIROMENT.API_URL+"/api/auth/login",
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(form_state)
          }
        )
        
        const data= await response.json()
        console.log(data)
        login(data.data.acces_token)
        navigate('/home')
      }
      catch(error){
        console.error("error al loguear",error)
      }
        
    }
    const errorres = {
        email:[],
        password:[]
    }
    form_state.email && form_state.email.length > 30 && errorres.email.push('El email debe tener menos de 30 caracteres')
    form_state.email && form_state.email.length <5 && errorres.email.push('El email debe tener mas de 5 caracteres')
    form_state.password && form_state.email.length <5 && errorres.password.push('El email debe tener mas de 5 caracteres')
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmitForm}>
            <div>
                <label htmlFor="email">Ingrese su email</label>
                <br />
                <input name='email' id='email' placeholder='joedoe@email.com' value={form_state.email} onChange={handleChangeInput} />
                {errorres.email.map((error, index)=>(<p key={index} style={{color:'red'}} >{error}</p>))}
            </div>
            <div>
                <label htmlFor="password">Ingrese su contraseña</label>
                <br />
                <input name='password' id='password' value={form_state.password} onChange={handleChangeInput} />
                {errorres.password.map((error, index)=>(<p key={index} style={{color:'red'}} >{error}</p>))}
            </div>
            <button type='submit'
            disabled={
                errorres.email.length ||
                errorres.password.length ||
                !form_state.email||
                !form_state.password}>Inicia tu sesion</button>
                <span>No tienes una cuenta? <a href="/register">Registrate</a></span>
        </form>
    </div>
  )
}

export default LoginScreen