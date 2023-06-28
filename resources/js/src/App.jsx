import {useState} from "react";

import { ModalSignIn } from "./pages/ModalSignIn/ModalSignIn";
import { Header } from "./containers/Header/Header";
import { Main } from "./pages/Main/Main";
import { ModalFilter } from "./containers/ModalFilter/ModalFilter";
import { Navigation } from "./containers/Navigation/Navigation";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import style from "./App.module.css";
// import router from "./routes/router";

function App() {


  return (
    <div className={style.App} >

<RouterProvider router={router}/>

    
    </div>
  );
}

export default App;
