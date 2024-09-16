module.exports = {
  content: [
    './**/*.php',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  options: {
    safelist: ['tns-outer'],
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
    extend: {},
  },
  plugins: [],
}

