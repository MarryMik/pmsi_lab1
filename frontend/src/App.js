import './App.css';
import {createBrowserRouter, Outlet, Navigate} from "react-router-dom"
import { useContext } from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import { AuthContext } from './context/authContext';
import Home from './view/home/Home';
import Header from './components/header/header1';
import Header2 from './components/header/header2';
import Header3 from './components/header/header3';
import Login from './view/login/Login';
import Register from './view/register/Register';
import Dashboard from './view/dashboard/Dashboard';
import PasswordChange from './view/passwordChange/PasswordChange';
import Account from './view/account/Account'
import AddUser from './view/addUser/addUser';
import { RouterProvider } from 'react-router-dom';
import RegisterLog from './view/registerLog/RegisterLog';
import LoggingLog from './view/loggingLog/LoggingLog';
import FileBoard from './view/fileboard/FileBoard';
import FileView from './view/fileview/FileView';

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
        <Header3/>
        <Outlet/>
      </QueryClientProvider>
    )
}

const UserFilter =({children})=>{
  if(!currentUser ){
    return <Navigate to="/" />;
  }else{
    if (currentUser.type==='user'){
      return <Layout2 />
    }else if (currentUser.type==='admin'){
      return <Layout3 />
    }
  }
}
const router = createBrowserRouter([
  {
    path:"/",
    element:( <Layout />),
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
    element: <UserFilter/>,
    children:[
      {        
        path:"/account",
        element: <Account />
      },
      {
        path:"/passwordChange",
        element: <PasswordChange />
      },
      {
        path: "/fileboard",
        element: <FileBoard/>
      },
      {
        path: "/fileview",
        element: <FileView/>
      }

    ]
  },
  {
    path:"/",
    element: <UserFilter/>,
    children:[
      {        
        path:"/account",
        element: <Account />
      },
      {
        path:"/passwordChange",
        element: <PasswordChange />
      },
      {
        path:"/dachboard",
        element: <Dashboard />
      },
      {
        path:"/newuser",
        element: <AddUser/>
      },
      {
        path:"/registerlog",
        element: <RegisterLog/>
      },
      {
        path:"/logginglog",
        element: <LoggingLog/>
      }
    ]
  },
]);
return (
  <div>
    <RouterProvider router={router}/>
  </div>
);
}

export default App;
