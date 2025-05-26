
import './App.css'
import { DemoHeroGeometric } from './components/bg-demo'
import { Toaster } from 'sonner'
import Admin from './pages/Admin';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';



function App() {

  return (
    <>
     <Toaster position="top-center" richColors/>
   <BrowserRouter>
      <Routes>
        
        <Route path="/" element={ <DemoHeroGeometric/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/*" element={<Admin/>} />
        <Route path="*" element={<Navigate to="/login" />} />
       
        </Routes>
        </BrowserRouter>
  
    </>
  )
}

export default App
