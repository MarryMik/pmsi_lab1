import './App.css';
import {createBrowserRouter, Outlet, Navigate} from "react-router-dom"
import { useContext } from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import { AuthContext } from './context/authContext';
import Home from './view/home/Home';
import Header from './components/header/header1';
import Header2 from './components/header/header2';
import Login from './view/login/Login';
import Register from './view/register/Register';
import Dashboard from './view/dashboard/Dashboard';
import PasswordChange from './view/passwordChange/PasswordChange';
import Account from './view/account/Account'
import { RouterProvider } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  const {currentUser} = useContext(AuthContext);
  const Layout =()=>{
    return(
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Outlet/>
      </QueryClientProvider>
    )
  }
  const Layout2 =()=>{
      return(
        <QueryClientProvider client={queryClient}>
          <Header2/>
          <Outlet/>
        </QueryClientProvider>
      )
  }
  const Layout3 =()=>{
    return(
      <QueryClientProvider client={queryClient}>
        <Header2/>
        <Outlet/>
      </QueryClientProvider>
    )
}
const UserFilter =({children})=>{
  if(!currentUser){
    return <Navigate to="/" />;
  }else{
    if (currentUser.type=="admin"){
      return <Layout2/>
    }else if (currentUser.type=="user"){
      return <Layout3/>
    }else{
      return <Layout/>
    }
  }
}
const router = createBrowserRouter([
  {
    path:"/",
    element:( <Layout/>),
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/login",
        element: <Login/>
      }
    ]
  },
  {
    path:"/",
    element: (<UserFilter/>),
    children:[
      {        
        path:"/account",
        element: <Dashboard/>
      },
      {
        path:"/passwordChange",
        element: <PasswordChange/>
      }
    ]
  },
  {
    path:"/",
    element: (<UserFilter/>),
    children:[
      {        
        path:"/account",
        element: <Account/>
      },
      {
        path:"/passwordChange",
        element: <PasswordChange/>
      }
    ]
  },
]);
return (
  <div>
    <RouterProvider router={router}/>
  </div>
)
}

export default App;
