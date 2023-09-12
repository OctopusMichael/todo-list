/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /*dark */
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        newTaskColor: "hsl(236, 33%, 92%)",
        completedTaskColor: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlue: "hsl(237, 14%, 26%)",
        /* light */
        veryLightGray:' hsl(0, 0%, 98%)',
        veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
        newTaskColorLight: 'hsl(233, 11%, 84%)',
        darkGrayishBlue: 'hsl(236, 9%, 61%)',
        veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',

      },
      fontFamily : {
        josefin : ['Josefin Sans']
      }
    },
  },
  plugins: [],
};
