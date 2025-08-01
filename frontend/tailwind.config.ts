import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: { "auth": "url('/grafico.svg')" },       //Crea un className bg-auth que contiene la imagen grafico.svg
      backgroundSize: { "30": "30rem" },
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
} satisfies Config;
