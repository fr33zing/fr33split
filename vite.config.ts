import solid from "solid-start/vite";
import { defineConfig } from "vite";
//import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    solid(),
    // basicSsl()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/global-scss/global.scss";\n`,
      },
    },
  },
});
