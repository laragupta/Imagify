import React, { useContext } from 'react';
//React is required to create React components and use React Hooks like useContext.
import Home from "./pages/Home";
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
 import { ToastContainer } from 'react-toastify';
 //ToastContainer is responsible for showing notifications.



  import { AppContext } from './context/AppContext';
  //AppContext is used to share global data across the entire React application
  //  without passing props through multiple components (prop drilling). It stores common data like the login 
  // state, user information, authentication token, and credits, so any component 
  // can access or update this data using useContext.
const App = () => {
  const {showLogin}=useContext(AppContext)
  //useContext(AppContext) accesses the global data stored in AppContext.
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-linear-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      //Renders the navigation bar at the top of every page.
     {showLogin &&  <Login/>}
     //If showLogin is true, the Login component is rendered; otherwise, nothing is displayed.
      <Routes> //Routes is a React Router component that checks the current browser URL.
       <Route path='/' element={<Home/>}/>
       <Route path='/result' element={<Result/>}/>
       //When the URL becomes /result, React renders the Result component.
       <Route path='/buyCredit' element={<BuyCredit/>}/>
       
    </Routes>
    <Footer/>
    </div>
          

  
  );
}

export default App;
//Exports the App component as the default export of this file.
//This allows main.jsx to import it using import App from './App';.
//React starts rendering the application from this root component.
