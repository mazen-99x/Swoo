import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ModeProvider } from "./Context/ModeContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./Store/store.js";
import { PersistGate } from "redux-persist/integration/react";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ModeProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </ModeProvider>
        </BrowserRouter>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
