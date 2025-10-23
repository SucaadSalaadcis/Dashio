import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

import { Routes, Route, useNavigate } from "react-router-dom"

import Agents from "./pages/agents/Agents"
import Sidenav from "./components/Sidenav"
import Dashboard from "./components/Dashboard"

import Orders from "./pages/orders/Orders"
import OrderView from "./pages/orders/OrderView"
import Products from "./pages/products/Products"

import { useEffect } from "react"
import { Toaster } from 'react-hot-toast';

import Cookies from 'js-cookie';
import SignOut from "./components/SignOut"
import AgentView from "./pages/agents/AgentView"
import Customer from "./pages/customers/Customer"
import CustomerView from "./pages/customers/CustomerView"
import ProductView from "./pages/products/ProductView"
import UserView from "./pages/users/UserView"
import User from "./pages/users/User"
import AgentEdit from "./pages/agents/AgentEdit"
import CustomerEdit from "./pages/customers/CustomerEdit"
import ProductEdit from "./pages/products/ProductEdit"
import UserEdit from "./pages/users/UserEdit"
import OrderEdit from "./pages/orders/OrderEdit"
import Help from "./components/Help"

function App() {

  const navigate = useNavigate()
  const isAuth = Cookies.get('token')

  const handleRefresh = () => {
    if (!isAuth) {
      navigate("/")
    }

  }
  useEffect(() => {
    handleRefresh()
  }, []);

  return (
    <>

      {isAuth ?
        <Sidenav>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/help" element={<Help />}/>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/agents" element={<Agents />} />
            <Route path='/agent_view/:id' element={<AgentView />} />
            <Route path='/agent/:id' element={<AgentEdit />} />

            <Route path="/customers" element={<Customer />} />
            <Route path='/customer_view/:id' element={<CustomerView />} />
            <Route path='/customer/:id' element={<CustomerEdit />} />

            <Route path="/orders" element={<Orders />} />
            <Route path="/order_view/:id" element={<OrderView />} />
            <Route path='/order/:id' element={<OrderEdit />} />

            <Route path="/products" element={<Products />} />
            <Route path='/product_view/:id' element={<ProductView />} />
            <Route path='/product/:id' element={<ProductEdit />} />


            <Route path="/users" element={<User />} />
            <Route path='/users_view/:id' element={<UserView />} />
            <Route path='/user/:id' element={<UserEdit />} />

            <Route path="/signout" element={<SignOut />} />
          </Routes>

        </Sidenav>

        :
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/signin" element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} /> */}
        </Routes>

      }


      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            // background: 'blue',

          },
        }} />
    </>
  )
}


export default App



