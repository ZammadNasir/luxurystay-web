import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"en-US"}>
      <Provider store={store}>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  </StrictMode>
);
