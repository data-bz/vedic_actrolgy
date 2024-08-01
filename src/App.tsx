import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/user/:id" element={<UserPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
