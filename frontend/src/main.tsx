import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/authContext.tsx";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster
        visibleToasts={3}
        position="top-right"
        richColors={true}
        closeButton={true}
        dir="rtl"
      />
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
