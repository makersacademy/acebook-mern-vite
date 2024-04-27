/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
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
      });
    },
  ],
}

