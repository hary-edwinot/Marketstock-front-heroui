import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Vous pouvez garder des couleurs custom ici si besoin
      colors: {
        // primary: "#F2E205", // Pas besoin, défini dans les thèmes
        // background: "#14140F", // Pas besoin, défini dans les thèmes  
        // content2: "#1E1E1E", // Pas besoin, défini dans les thèmes
      }
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#F2E205", // Jaune
              foreground: "#000000", // Texte NOIR
            },
            background: "#FFFFFF", // Blanc pour le mode light
            foreground: "#000000", // Texte noir sur fond blanc
            content1: "#FFFFFF", // Cards blanches
            content2: "#F4F4F5", // Cards légèrement grises
            content3: "#E4E4E7", // Plus foncé
            content4: "#D4D4D8", // Encore plus foncé
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#F2E205", // Même jaune en mode dark
              foreground: "#000000", // Texte NOIR aussi en mode dark
            },
            background: "#14140F", // Votre couleur sombre pour le mode dark
            foreground: "#FFFFFF", // Texte blanc sur fond sombre
            content1: "#1E1E1E", // Cards sombres
            content2: "#2A2A2A", // Légèrement plus claires
            content3: "#3A3A3A", // Plus claires
            content4: "#4A4A4A", // Encore plus claires
          }
        }
      },
    }),
  ],
}
