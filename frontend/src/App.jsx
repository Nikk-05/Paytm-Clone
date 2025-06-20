
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import SendMoney from './pages/SendMoney.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'
import { ToastContainer, Bounce } from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-right' pauseOnHover transition={Bounce} />
      <Routes>
        <Route path="/" element = {<HomePage/>}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/send' element={<SendMoney />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
