import { Route, Routes } from 'react-router-dom'
import Register from '../Main/Register'
import Login from '../Main/Login'
import Homescreen from '../Homescreen/Homescreen'

const AppRoute = () => {
  return (
   <Routes>
    <Route path='/' element={<Homescreen/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>} />
   </Routes>
  )
}

export default AppRoute
