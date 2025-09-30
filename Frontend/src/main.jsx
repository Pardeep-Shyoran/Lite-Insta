import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import AuthLoader from "./features/Auth/AuthLoader";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer position="bottom-right" theme="dark" />
      <AuthLoader>
        <App />
      </AuthLoader>
    </BrowserRouter>
  </Provider>
);
