import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryPurpleHex: '#532B88',
        primaryPinkHex: '#f20089',
        primaryBlackHex: '#2F184B',
        primaryDarkGreyHex: '#1D1421',
        secondaryDarkGreyHex: '#2A212E',
        primaryGreyHex: '#252A32',
        secondaryGreyHex: '#2D2532',
        primaryLightGreyHex: '#52555A',
        secondaryLightGreyHex: '#AEAEAE',
        primaryWhiteHex: '#FFFFFF',
      }
    }
  },
  presets: [baseConfig],
} satisfies Config;
