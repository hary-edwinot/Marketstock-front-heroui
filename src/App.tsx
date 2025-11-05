import { Route, Routes } from "react-router-dom";
import { routes } from "@/config/routes";
import {Provider} from "react-redux";
import store from "@/app/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} element={<route.element />} path={route.path} />
        ))}
      </Routes>
    </Provider>
  );
}

export default App;
