import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div>
        <Routes>
            <Route index element={<MainLayout><Home /></MainLayout>}/>
            <Route path='/details/:id' element={<MainLayout><Details /></MainLayout>} />
        </Routes>
    </div>
  )
}

export default App;