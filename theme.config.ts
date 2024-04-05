import { ThemeConfig } from "types/ThemeConfig";
import { lightTheme } from "theme/default";
import merge from "lodash.merge";

export const theme: ThemeConfig = merge(lightTheme, {
  styles: {
    fonts: {
      heading: "Londrina Solid",
      nouns: "Londrina Solid"
    },
    colors: {
      muted: `115, 210, 222`,
      backdrop: `33, 131, 128`,
      fill: `216, 17, 89`,
      stroke: `143, 45, 86`,
      "text-base": `255, 255, 255`,
      "text-muted": `14, 24, 39`,
      "text-inverted": `143, 45, 86`,
      "text-highlighted": `216, 17, 89`,
    }
  },
  nav: {
    primary: [
      { label: "Ponziverso", href: "https://ponziverso.com" },
      /*{ label: "About", href: "/about" },*/
    ],
    secondary: [],
  },
  brand: {
    title: "NAJINHAS"
  },
  
} as Partial<ThemeConfig>);
