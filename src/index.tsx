import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/rootReducer";
import App from "./App";

import { GlobalStyle } from "./styledComponentsGlobals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
