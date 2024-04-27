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

      // animateConfig is created to store the config for the animation utilities
      const animateConfig = {
        classes: ['animate__animated', 'animate__slideInRight'], // the 'animate__...' class names are from the Animate.css library: 'animate__animated' is required for any element you want to animate and 'animate_slideInRight' defines the specific animation style to slide in from the right.
        settings: {
          animatedSpeed: 1000,
          heartBeatSpeed: 1000,
          hingeSpeed: 2000,
          bounceInSpeed: 750,
          bounceOutSpeed: 750,
          animationDelaySpeed: 1000,
        },
        variants: ['responsive', 'hover', 'reduced-motion'],
      };

      addUtilities({
        // here we are defining the custom utilities
        '@keyframes slideInRight': {
          from: { transform: 'translateX(100%)'}, // This defines that the element starts fully to the right
          to: { transform: 'translateX(0)' }, // This defines that the element ends in it's original position
        },
        '.animate__slideInRight': {
          animation: 'slideInRight', // Sets the slideInRight animation
          animationDuration: `${animateConfig.settings.animatedSpeed}ms`, // Applies the speed at which it transitions
        },
      });
    },
  ],
}

