import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
console.log("API URL:", apiUrl);
console.log("App Name:", appName);
createRoot(document.getElementById("root")!).render(<App apiUrl={apiUrl}/>);
