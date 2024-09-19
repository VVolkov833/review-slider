module.exports = {
  content: [
    './**/*.php',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  options: {
    safelist: ['wp-block-vv-review-slider'],
  },
  purge: {
    content: [
      './**/*.php',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
    ],
  },
  theme: {
    colors: {
      review: {
        Google: '#FFC220',
        Jameda: '#8ad223',
      }
    },
    extend: {
      fontSize: {
        'inherit': 'inherit',
      }
    },
  },
  plugins: [],
}

