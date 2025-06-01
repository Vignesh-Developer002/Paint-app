import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StoreContext from "./StoreContext/StoreContext.jsx";
import { Tooltip } from 'react-tooltip'

createRoot(document.getElementById("root")).render(
  <StoreContext>
    <App />
    <Tooltip id="color"/>
  </StoreContext>
);
