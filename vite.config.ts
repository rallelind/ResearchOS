import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 8080,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
