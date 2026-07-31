
import { createRoot } from 'react-dom/client'
// import the function that tells the react where to render our application inside the browser
// like react only create components and virtual dom we need reactDom toupadte real dom 
import { BrowserRouter } from 'react-router-dom'
//Browser URL Changes ->BrowserRouter detects it->React Router matches Route->Correct Component renders
//React needs something to watch the browser URL.

//BrowserRouter does exactly that.

//It uses the browser's History API.
import './index.css'
import App from './App.jsx'
// app is route component 
import AppContextProvider from './context/AppContext.jsx'
//It shares global data like user information, authentication token, and credits with all components, avoiding prop drilling.

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  
  <AppContextProvider>
      <App />
  </AppContextProvider>
   
  </BrowserRouter>
    
 
)
