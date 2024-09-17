module.exports = {
  content: [
    './**/*.php',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  options: {
    safelist: ['wp-block-block-development-examples-settings-sidebar-82c525'],
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

