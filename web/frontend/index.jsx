import { StrictMode} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { initI18n } from "./utils/i18nUtils";

initI18n().then(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});