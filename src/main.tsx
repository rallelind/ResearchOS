import { OsdkProvider } from "@osdk/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import createClientAndAuth from "./foundry/createClientAndAuth";
import "./index.css";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { client: foundryClient, auth } = createClientAndAuth();
export { auth, foundryClient };

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OsdkProvider client={foundryClient}>
      <RouterProvider router={router} />
    </OsdkProvider>
  </QueryClientProvider>
);
