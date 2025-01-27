import ENVIROMENT from "../utils/constans/enviroment"

 export const consultaDePrueba=async()=>{
    try{
      const response=await fetch(ENVIROMENT.API_URL+"/api/status/ping",
        {
          method:"GET"
        }
      )
      //response es la respuesta http
      console.log(response)
      const data= await response.json()
      console.log(data)
    }
    catch(error){
      console.log(error)
    }
  }