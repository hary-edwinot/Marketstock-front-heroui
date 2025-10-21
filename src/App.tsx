import { Route, Routes } from "react-router-dom";
import { Provider } from "./provider";
import { routes } from "@/config/routes";
function App() {
  return (
    <Provider>
      <Routes>
        {routes.map(route => (
          <Route key={route.path} element={<route.element />} path={route.path} />
        ))}
      </Routes>
    </Provider>
  );
}

export default App;
