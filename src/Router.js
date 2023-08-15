import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import CreateMatch from './pages/CreateMatch'
import Match from './pages/Match'
import Home from './pages/Home'
import UpdateMatch from './pages/UpdateMatch'
import EndMatch from './pages/EndMatch'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to = "/home"></Navigate>}></Route>
        <Route path='/home' element={<Home/>} ></Route>
        
        <Route path='/endMatch' element={<EndMatch/>}></Route>
        <Route path='/create' element={<CreateMatch/>}></Route>
        <Route path='/match' element={<Match/>}></Route>
        <Route path='/update/:id' element={<UpdateMatch/>}></Route>
    </Routes>
  )
}

export default Routers