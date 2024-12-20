import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
//importing pvt component
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct.js';
import ProductList from './components/productList.js';
import UpdateProduct from './components/UpdateProduct.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
    <Routes>
      <Route element={<PrivateComponent  />}>

      <Route path="/" element={< ProductList/>}  /> 
      <Route path="/add" element={<AddProduct/>}  />
      <Route path="/update/:id" element={<UpdateProduct />}  />
      <Route path="/logout" element={<h1>Logout Component</h1>}  />
      <Route path="/profile" element={<h1>Profile Component</h1>}  />

      </Route>

      <Route path="/Register" element={<SignUp />}  />
      <Route path="/login" element={<Login />}   />
      
    </Routes>
     </BrowserRouter>
     <Footer />
    </div>
  );
}

export default App;
