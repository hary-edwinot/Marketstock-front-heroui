import { Route, Routes } from "react-router-dom";
import { routes } from "@/config/routes";
import { Provider } from "react-redux";
import store from "@/app/redux/store";


import TaostProviders from "@/hooks/taostProvier";

function App() {
  return (
    <Provider store={store}>
      <TaostProviders>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} element={<route.element />} path={route.path} />
          ))}
        </Routes>
      </TaostProviders>
    </Provider>
  );
}

export default App;


