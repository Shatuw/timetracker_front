import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'button': {
          padding: theme('spacing.2'),
          fontWeight: theme('fontWeight.bold'),
          borderRadius: theme('borderRadius.md'),
          border: "2px solid gray",
          // Füge hier weitere allgemeine Button-Stile hinzu
        },
        'button:hover':{
          border: "2px solid white",
        },
        
        'a': {
          borderColor: theme('borderColor.border-red-700'),
          padding : "1rem",
          // Füge hier weitere allgemeine Link-Stile hinzu
        },
        'a:hover' : {
          borderColor: theme('borderColor.border-red-600'),
          textDecoration: 'underline'
        },
        'h1':{
          fontWeight : theme('fontWeight.bold'),
          fontSize : theme('fontSize.3xl'),
        }
      });
    },
  ],
})