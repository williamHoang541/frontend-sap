// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

const App = () => {
// const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      {/* <Navbar setSidebar={setSidebar}/> */}
      <Routes>
        {/* <Route path='/' element={<Home sidebar={sidebar}/>} /> */}
        <Route path='/' element={<Login/>} />
        
      </Routes>
    </div>
  )
}

export default App
