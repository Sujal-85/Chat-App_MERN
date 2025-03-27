import Navbar from "./compoenets/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import {useThemeStore} from "./store/useThemeStore" ;
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/useAuthStore" 
import { useEffect } from "react";
import {Loader} from "lucide-react";

// App Component to hold all routes 
const App = () => {

const {authUser, isCheckingAuth , checkAuth, onlineUsers} = useAuthStore()
const {theme} = useThemeStore()
console.log({onlineUsers})
useEffect(() => {
  checkAuth()  // check if user is authenticated and load user data if necessary
},[checkAuth]);
console.log({authUser});

if (isCheckingAuth &&!authUser)   return( 
  <div className="flex items-center justify-center h-screen"> 
  <Loader className="size-10 animate-spin"/>
  </div> 
);

if (isCheckingAuth && !authUser)   
  return(

  <div className="flex items-center justify-center h-screen"> 
  <Loader className="size-10 animate-spin"/>
  </div> 
);
  
return (
    <div data-theme = {theme}>

      <Navbar/>
      <Routes>
        <Route path= "/" element = { authUser ? <HomePage/> : <Navigate to="/login" /> } />
        <Route path= "/signup" element = {!authUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path= "/login" element = {!authUser ? <LoginPage/> : <Navigate to="/" />}/>
        <Route path= "/settings" element = {<SettingsPage/>}/>
        <Route path= "/profile" element = {authUser ? <ProfilePage/> : <Navigate to="/login" /> }/>
      </Routes>

      <Toaster/>
    </div>
  )
};
export default App;


