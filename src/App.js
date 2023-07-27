// import './App.css';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from './components/Login';
// import Home from './components/Home';
// import AddProduct from './components/AddProduct';
// import AllOrders from './components/AllOrders';
// import SearchOrder from './components/SearchOrder';
// import Order from './components/Order/Order';
// import GetLast from './components/GetLast/GetLast';
// import ItemInput from './components/ItemInput';
// import { useState } from 'react';

// function App() {
//   const [isLogin, setIsLogin] = useState(false);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Public Route for Login page */}
//           <Route path="/" element={isLogin ? <Navigate to="/home" replace /> : <Login setIsLogin={setIsLogin} />} />

//           {/* Protected Routes */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/addorder" element={<AddProduct />} />
//           <Route path="/allorders" element={<AllOrders />} />
//           <Route path="/searchorder" element={<SearchOrder />} />
//           <Route path="/order/:orderNumber" element={<Order />} />
//           <Route path="/getlast" element={<GetLast />} />
//           <Route path="/items" element={<ItemInput />} />


//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import AllOrders from './components/AllOrders';
import SearchOrder from './components/SearchOrder';
import Order from './components/Order/Order';
import GetLast from './components/GetLast/GetLast';
import { useState } from 'react';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  // Helper function to render the protected route or redirect to login
  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return isLogin ? <Component {...rest} /> : <Navigate to="/" replace />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Route for Login page */}
          <Route path="/" element={<Login setIsLogin={setIsLogin} />} isLogin={isLogin} // Pass isLogin as a prop to the Login component
          />
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute element={Home} />} />
          <Route path="/addorder" element={<ProtectedRoute element={AddProduct} />} />
          <Route path="/allorders" element={<ProtectedRoute element={AllOrders} />} />
          <Route path="/searchorder" element={<ProtectedRoute element={SearchOrder} />} />
          <Route path="/order/:orderNumber" element={<ProtectedRoute element={Order} />} />
          <Route path="/getlast" element={<ProtectedRoute element={GetLast} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
