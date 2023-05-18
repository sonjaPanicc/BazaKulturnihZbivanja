import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Members from "./pages/Members";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Event from "./pages/Event";
import Vote from "./pages/Vote";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";


function App() {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);


  return (


    <BrowserRouter>
      <div>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path={"/"} element={<Home></Home>}></Route>
          <Route path={"/login"} element={<Login></Login>}></Route>
          <Route path={"/register"} element={<Register></Register>}></Route>
          <Route path={"/members"} element={<Members></Members>}></Route>
          <Route path={"/event/:id"} element={<Event></Event>}></Route>
          <Route path={"/vote"} element={<Vote></Vote>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>

  );
};

export default App;
