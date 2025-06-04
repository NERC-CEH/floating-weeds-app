// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flumensTailwind = require('@flumens/tailwind/tailwind.config.js');

const primary = {
  // https://www.tailwindshades.com/#color=76.8%2C49.5049504950495%2C39.6078431372549&step-up=10&step-down=11&hue-shift=0&name=sushi&base-stop=6&v=1&overrides=e30%3D
  DEFAULT: '#7B9733',
  50: '#F4F8EA',
  100: '#EAF2D7',
  200: '#D6E5B1',
  300: '#C2D88B',
  400: '#AECB65',
  500: '#9ABD40',
  600: '#7B9733',
  700: '#596D25',
  800: '#374317',
  900: '#151909',
  950: '#030401',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@flumens/ionic/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/@flumens/tailwind/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...flumensTailwind.theme?.extend,

      colors: {
        primary,

        secondary: {
          // https://www.tailwindshades.com/#color=37.02127659574467%2C100%2C53.92156862745098&step-up=9&step-down=11&hue-shift=0&name=sun&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#FFA514',
          50: '#FFFEFC',
          100: '#FFF7EA',
          200: '#FFEAC6',
          300: '#FFDDA3',
          400: '#FFCF7F',
          500: '#FFC15B',
          600: '#FFB338',
          700: '#FFA514',
          800: '#B26D00',
          900: '#513200',
          950: '#211400',
        },

        tertiary: {
          // https://www.tailwindshades.com/#color=203.89830508474577%2C100%2C46.27450980392157&step-up=9&step-down=12&hue-shift=0&name=azure-radiance&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#008EEC',
          50: '#E9F6FF',
          100: '#D3EDFF',
          200: '#A5DBFF',
          300: '#77C9FF',
          400: '#49B6FF',
          500: '#1BA4FF',
          600: '#008EEC',
          700: '#0069AF',
          800: '#004472',
          900: '#002034',
          950: '#000D16',
        },

        success: primary,

        warning: {
          // https://www.tailwindshades.com/#color=39.01345291479821%2C100%2C43.72549019607843&step-up=10&step-down=12&hue-shift=0&name=tangerine&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#DF9100',
          50: '#FFF7E9',
          100: '#FFF0D5',
          200: '#FFE2AC',
          300: '#FFD483',
          400: '#FFC55A',
          500: '#FFB732',
          600: '#FFA909',
          700: '#DF9100',
          800: '#8D5C00',
          900: '#3C2700',
          950: '#130C00',
        },

        danger: {
          // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=8&step-down=11&hue-shift=0&name=flamingo&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#F04141',
          50: '#FDEBEB',
          100: '#FCD8D8',
          200: '#F9B2B2',
          300: '#F68D8D',
          400: '#F36767',
          500: '#F04141',
          600: '#E71212',
          700: '#B30E0E',
          800: '#7F0A0A',
          900: '#4B0606',
          950: '#310404',
        },
      },
    },
  },
  plugins: flumensTailwind.plugins,
};
