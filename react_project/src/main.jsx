import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import "./main.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "normalize.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    // <RouterProvider router={router} />

);
