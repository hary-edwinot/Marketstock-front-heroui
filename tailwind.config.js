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
              DEFAULT: "#705CF2", // Jaune
              foreground: "#FFFFFF", // Texte NOIR
            },
            background: "#F4F4F5", // Blanc pour le mode light
            foreground: "#000000", // Texte noir sur fond blanc
            content1: "#ffffff", // Cards blanches
            content2: "#F4F4F5", // Cards légèrement grises
            content3: "#E4E4E7", // Plus foncé
            content4: "#D4D4D8", // Encore plus foncé
            badge1: {
              DEFAULT: "#05ff7e25",
              foreground: "#085e31"
            }
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#705CF2", // Même jaune en mode dark
              foreground: "#FFFFFF", // Texte NOIR aussi en mode dark
            },
            background: "#131521", // Votre couleur sombre pour le mode dark #0D0E17
            foreground: "#FFFFFF", // Texte blanc sur fond sombre
            content1: "#222640", // Cards sombres
            content2: "#151826", // Légèrement plus claires #151826
            content3: "#3A3A3A", // Plus claires
            content4: "#4A4A4A", // Encore plus claires
            badge1: {
              DEFAULT: "#077025",
              foreground: "#05822825"
            }
          }
        }
      },
    }),
  ],
}
