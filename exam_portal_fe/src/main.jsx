import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import 'react-toastify/dist/ReactToastify.css';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route index element={<App />} />
//       <Route path="admin/login" element={<AdminLogin />} />
//       <Route path="admin/users" element={<Users />} />
//       <Route path="user/login" element={<UserLogin />} />
//     </Route>
//   )
// )

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
