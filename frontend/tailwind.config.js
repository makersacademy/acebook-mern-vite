/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {
      backgroundColor: {
        "box-color": "#C9ACDB", // Define the custom box color - currently light-purple
        "hover-color": "#0E243C", // currently navy
        "correct-color": "#38a169", //equivalent to green-500
        "incorrect-color": "#e53e3e", //equivalent to red-500
        "dark-purple": "#9058C4",
        "light-purple": "#C9ACDB",
        yellow: "#FBF44A",
        turquoise: "#7CD8E0",
        "hot-pink": "#F94E80",
        navy: "#0E243C",
      },
      textColor: {
        "title-color": "#2B2939", // currently navy
        "text-color": "#0E243C", // box text color: currently navy
        "hover-text-color": "#C9ACDB", // currently light-purple
        "question-text-color": "#F8F8F6", // currently cream
        "dark-purple": "#9058C4",
        "light-purple": "#DD94D2",
        yellow: "#FBF44A",
        turquoise: "#7CD8E0",
        "hot-pink": "#F94E80",
      },
      borderColor: {
        "hot-pink": "#F94E80",
        "navy-border": "#0E243C",
        "light-purple": "#DD94D2",
      },
      backgroundImage: {
        "homepage-background-0": 'url("../src/assets/rainbow-vortex.png")',
        "homepage-background-1": 'url("../src/assets/rainbow-vortex-1.png")',
        "homepage-background-2": 'url("../src/assets/rainbow-vortex-2.png")',
        metal:
          "url(https://media.istockphoto.com/id/1468692377/photo/red-hot-scorching-magma-approaching-the-gate-to-the-dark-hell-from-both-sides.jpg?s=612x612&w=0&k=20&c=0uEKtBMNgFj_Atbn2Y463q2Q0BxBP3p6VCWXnrgTm5M=)",
        RnB: "url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        dance:
          "url(https://images.unsplash.com/photo-1578736641330-3155e606cd40?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHBvcCUyMG11c2ljfGVufDB8fDB8fHww)",
        hiphop:
          "url(https://images.unsplash.com/photo-1546528377-9049abbac32f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYWZmaXRpJTIwaGlwJTIwaG9wfGVufDB8fDB8fHww)",
        pop: "url(https://images.unsplash.com/photo-1529245856630-f4853233d2ea?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9wJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D)",
        film: "url(https://images.unsplash.com/photo-1490971588422-52f6262a237a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlsbXMlMjBnYW1lcyUyMGFic3RyYWN0fGVufDB8fDB8fHww)",
      },
      fontFamily: {
        "font-metal": ["Jacquard", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "hip-hop": ["Sedgwick Ave Display", "cursive"],
      },
      fontWeight: {
        "weight-400": "400",
      },
      backgroundSize: {
        full: "100% 100%",
      },
    },
  },

  plugins: [
    // The following plugins provides the sliding transition animation between "components" on the QuizPage
    // Initially being used to transition between the genrepicker component and the question and answer components (that make up the quiz)
    
    // Below we are defining an anonymous function with addUtilities as an object
    // addUtilities is a Tailwind function that is used to register new utility classes
    ({ addUtilities }) => {

      addUtilities({
        // here we are defining the custom utilities
        '@keyframes slideInRight': {
          from: { transform: 'translateX(100%)'}, // This defines that the element starts fully to the right
          to: { transform: 'translateX(0)' }, // This defines that the element ends in it's original position
        },
        '.animate__slideInRight': {
          animation: 'slideInRight', // Sets the slideInRight animation from the Animate.css library
          animationDuration: `1000ms`
        },
      
        '.custom-background': {
          backgroundColor: 'linear-gradient(to bottom right, #FCD34D, #F59E0B)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 1600 800\'%3E%3Cg stroke=\'%23D34128\' stroke-width=\'63.8\' stroke-opacity=\'0.21\' %3E%3Ccircle fill=\'%23C79F7B\' cx=\'0\' cy=\'0\' r=\'1800\'/%3E%3Ccircle fill=\'%23c89d7c\' cx=\'0\' cy=\'0\' r=\'1700\'/%3E%3Ccircle fill=\'%23c89c7d\' cx=\'0\' cy=\'0\' r=\'1600\'/%3E%3Ccircle fill=\'%23c99a7e\' cx=\'0\' cy=\'0\' r=\'1500\'/%3E%3Ccircle fill=\'%23ca987f\' cx=\'0\' cy=\'0\' r=\'1400\'/%3E%3Ccircle fill=\'%23cb9680\' cx=\'0\' cy=\'0\' r=\'1300\'/%3E%3Ccircle fill=\'%23cb9481\' cx=\'0\' cy=\'0\' r=\'1200\'/%3E%3Ccircle fill=\'%23cc9382\' cx=\'0\' cy=\'0\' r=\'1100\'/%3E%3Ccircle fill=\'%23cd9183\' cx=\'0\' cy=\'0\' r=\'1000\'/%3E%3Ccircle fill=\'%23cd8f84\' cx=\'0\' cy=\'0\' r=\'900\'/%3E%3Ccircle fill=\'%23ce8d85\' cx=\'0\' cy=\'0\' r=\'800\'/%3E%3Ccircle fill=\'%23cf8b86\' cx=\'0\' cy=\'0\' r=\'700\'/%3E%3Ccircle fill=\'%23cf8a87\' cx=\'0\' cy=\'0\' r=\'600\'/%3E%3Ccircle fill=\'%23d08888\' cx=\'0\' cy=\'0\' r=\'500\'/%3E%3Ccircle fill=\'%23d08689\' cx=\'0\' cy=\'0\' r=\'400\'/%3E%3Ccircle fill=\'%23d1848a\' cx=\'0\' cy=\'0\' r=\'300\'/%3E%3Ccircle fill=\'%23d1828b\' cx=\'0\' cy=\'0\' r=\'200\'/%3E%3Ccircle fill=\'%23D2808C\' cx=\'0\' cy=\'0\' r=\'100\'/%3E%3C/g%3E%3C/svg%3E")',

        
        },
        //https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/
        //https://heropatterns.com
        
      });
    },
  ],
}

