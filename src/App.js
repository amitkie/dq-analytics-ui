import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/fonts/DroidSans-Bold-webfont.ttf";
import "./assets/fonts/DroidSans-Bold-webfont.woff";
import "./assets/fonts/DroidSans-webfont.ttf";
import "./assets/fonts/DroidSans-webfont.woff";
import { Provider } from 'react-redux';
import store from './store/store';
// import DynamicAlert from "./components/DynamicAlert/DynamicAlert"

import "./App.scss";

function App() {
  // return <RouterProvider router={router} />;

  return (
    <Provider store={store}>
        {/* <DynamicAlert/> */}
      <RouterProvider router={router} />
    </Provider>
  );


}

export default App;
