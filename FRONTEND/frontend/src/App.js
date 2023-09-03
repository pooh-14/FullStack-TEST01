import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AddProduct from './Components/SELLER/AddProduct';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/addproduct" element={<AddProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
