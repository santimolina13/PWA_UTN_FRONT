import React from 'react'
import useForm from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import ENVIROMENT from '../utils/constans/enviroment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'

const CreateWorkspacesScreen = () => {
    const navigate=useNavigate()
    const {handleChangeInput,form_state}= useForm({name:''})
     const hadleCreateWorkspace= async(e)=>{
        e.preventDefault()
        const response=await fetch(ENVIROMENT.API_URL+"/api/workspace",{
            method:"POST",
            headers:getAuthenticatedHeaders(),
            body: JSON.stringify(form_state)
        })
        const data=await response.json()
        navigate("/home")
     }
  return (
    <div>
        <h1>Crear nuevo espacio de trabajo</h1>
        <form onSubmit={hadleCreateWorkspace}>
            <div>
                <label htmlFor="name">
                    <input type="text" id='name' name='name' placeholder='Nombre del workspace' onChange={handleChangeInput} value={form_state.name}/>
                </label>
            </div>
            <button type='submit'>Crear</button>
        </form>
    </div>
  )
}

export default CreateWorkspacesScreen