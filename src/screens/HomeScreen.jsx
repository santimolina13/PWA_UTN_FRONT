import React from 'react'
import ENVIROMENT from '../utils/constans/enviroment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'





const HomeScreen = () => {
     const {data:workspace_response, error:workspace_error, loading:workspace_loading}= useFetch(ENVIROMENT.API_URL+"/api/workspace",{
    method:"GET",
    headers:getAuthenticatedHeaders()
       
    })
    
   /* const getWorkspaces=async()=>{
    const response=await fetch(ENVIROMENT.API_URL+"/api/workspace",{
    method:"GET",
    headers:getAuthenticatedHeaders()})
    const responsedata=await response.json()
    console.log(responsedata) 
   
    }
    getWorkspaces()  */
  return (
    <div>
        <h1>Bienvenido a la app </h1>
        <div>
            <h2>Tus espacios de trabajo</h2>
            <div>
              {
                workspace_loading
                ?<h2>cargando</h2>
                :(
                  workspace_response.data.workspaces.length?
                  workspace_response.data.workspaces.map(workspace=>{
                    return(
                      <div key={workspace._id}>
                        <h3>{workspace.name}</h3>
                        <button><Link to={`/workspace/${workspace._id}`}>Ir al warkspace</Link></button>
                      </div>
                    )
                })
                :<h3>No tienes espacios de trabajo</h3>
              )
              }
            </div>
        </div>
        <div>
          <span>Aun no tienes espacios de trabajo?</span>
          <Link to="/workspace/new">Crear espacio de trabajo</Link>
        </div>
    </div>
  )
}

export default HomeScreen


