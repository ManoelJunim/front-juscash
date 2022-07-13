import { globalCss } from '@nextui-org/react';

const globalStyles = globalCss({
  body: {
    margin: 0,
    padding: 0,
  },

  html: {
    margin: 0,
    padding: 0,
  },

  '*': {
    fontFamily: 'Poppins, sans-serif',
  },
});

export { globalStyles };
