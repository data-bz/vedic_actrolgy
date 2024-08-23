import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import StatisticPage from "./pages/StatisticPage/StatisticPage";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import FindPage from "./pages/FindPage/FindPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/statistic" element={<StatisticPage/>}></Route>
        <Route path="/archive" element={<ArchivePage/>}></Route>
        <Route path="/find" element={<FindPage/>}></Route>
        <Route path="/messages" element={<MessagesPage/>}></Route>
        <Route path="/user/:id" element={<UserPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
