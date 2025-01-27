import React from 'react'
import ENVIROMENT from './utils/constans/enviroment'
import { Route, Routes } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import Protectedroute from './components/ProtectedRoute'
import HomeScreen from './screens/HomeScreen'
import CreateWorkspacesScreen from './screens/CreateWorkspacesScreen'
import WorkspaceScreen from './screens/WorkspaceScreen'




const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        
        <Route element={<Protectedroute/>}>
          <Route path='/home' element={<HomeScreen/>}/>
          <Route path='/workspace/new' element={<CreateWorkspacesScreen/>}/>
          <Route path='/workspace/:workspace_id' element={<WorkspaceScreen/>}/>
          <Route path='workspace/:workspace_id/:channel_id' element={<WorkspaceScreen/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App


/* <Route element={<Protectedroute/>}>
<Route path='/register' element={<RegisterScreen/>}/>
</Route> */