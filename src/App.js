import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/fonts/DroidSans-Bold-webfont.ttf";
import "./assets/fonts/DroidSans-Bold-webfont.woff";
import "./assets/fonts/DroidSans-webfont.ttf";
import "./assets/fonts/DroidSans-webfont.woff";

import "./App.scss";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
