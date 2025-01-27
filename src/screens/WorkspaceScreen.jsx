import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import ENVIROMENT from '../utils/constans/enviroment'
import { getAuthenticatedHeaders } from '../fetching/customHeaders'
import useForm from '../hooks/useForm'

const WorkspaceScreen = () => {
    const {workspace_id,channel_id}=useParams()
   
    
  
    const {data:channels_data,error:channels_error,loading:channels_loading} =useFetch(ENVIROMENT.API_URL+`/api/channel/${workspace_id}`,{
        method:"GET",
        headers: getAuthenticatedHeaders()
    })
    /* console.log(channels_data) */
  return (
    <div>
        {
            channels_loading
            ?<h2>cargando</h2>
            :<ChannelList channel_list={channels_data.data} workspace_id={workspace_id}/>
        }
        <div>
            {
                channel_id
                ?<Channel workspace_id={workspace_id} channel_id={channel_id}/>
                : <h2>Aun no has selecionado un canal</h2>
            }
        </div>

    </div>
  )
}


const ChannelList=({channel_list,workspace_id})=>{
    return(
        <div>hola
                {channel_list.channels.map(channel=>{
                        return(
                            <div  key={channel._id}>
                                <br />
                                <Link to={`/workspace/${workspace_id}/${channel._id}`}>#{channel.name} </Link>
                            </div>
                        
                        )
                    }) 
                }
        </div>
    )
}

const Channel=({workspace_id,channel_id})=>{
    const {
        data:channel_data,
        error:channel_error,
        loading:channel_loading
    } =useFetch(ENVIROMENT.API_URL+`/api/channel/${workspace_id}/${channel_id}`,{
        method:"GET",
        headers: getAuthenticatedHeaders()
        
    })
    console.log(channel_data)
    const {form_state,handleChangeInput}=useForm({content:""})
    const handleSubmitNewMessage=async(event)=>{
        event.preventDefault()
        try{
            const response=await fetch(ENVIROMENT.API_URL+`/api/channel/${workspace_id}/${channel_id}/send-message`,{
                method:"POST",
                headers: getAuthenticatedHeaders(),
                body:JSON.stringify(form_state),//form_state
            })
            const responseData=await response.json()
            console.log(responseData)
        }
        catch(error){
            console.error("error al enviar el mensaje",error)
        }

        
    }
    return(
        <div>
              {
                channel_loading
                ?<h2>cargando</h2>
                : channel_data.data.messages.map(message=>{
                    return(
                        <div key={message._id}>
                            <h4>Author:{message.sender.userName}</h4>
                            <p>{message.content}</p>
                        </div>
                    )
                })
            }  
            <form onSubmit={handleSubmitNewMessage}>
                <input type="text" placeholder='enviar mensaje' name='content' onChange={handleChangeInput} value={form_state.content} />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )

}






export default WorkspaceScreen