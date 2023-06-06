import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import AllOrders from './components/AllOrders';
import SearchOrder from './components/SearchOrder';
import Order from './components/Order/Order';
import GetLast from './components/GetLast/GetLast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home/>} />
            <Route path='/addorder' element={<AddProduct />} />
            <Route path='/allorders' element={<AllOrders />} />
            <Route path='/searchorder' element={<SearchOrder/>} />
            <Route path='/order/:orderNumber' element={<Order/>} />
            <Route path='/getlast' element={<GetLast/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
      );
}

      export default App;
