INSTALL
    npm install
    npx tailwindcss init
    npm install typescript @wordpress/scripts @types/wordpress__blocks --save-dev
    npm run start
    npm run build


TODOS
    editor inside wide group on Lanuwa moves to the left
    asks to recover the block on first save
	translations
		check how it works on other plugins
	console error
	fix issues & volnurabilities on install
	fix the environment and underlined mistakes
	optimize scripts & styles delivery with webpack
		clean readme
	improve the editor interface (date input)
	make the correct width on the preview in the editor
	make the editor half-transparent?
	add the icon


WEBPACK PAGESPEED
To ensure that your tiny-slider.ts is bundled into frontend.js during the build process, you need to configure the webpack setup through @wordpress/scripts. Since @wordpress/scripts uses webpack under the hood, we can adjust the configuration to make sure the TypeScript file is compiled and bundled correctly.

Here’s how you can achieve this:

Steps to Include tiny-slider.ts in the Build Process
Create a separate entry point for frontend.js: You can configure an additional entry point in your package.json for the frontend.js file.

Update the Webpack Configuration: You can extend the default @wordpress/scripts webpack configuration to handle multiple entry points, including one for tiny-slider.ts.

Step-by-Step Guide:
1. Install necessary dependencies
If you haven't already, make sure you have the necessary TypeScript and loaders installed:

bash
Copy code
npm install --save-dev typescript ts-loader
2. Create webpack.config.js
To add custom configuration, create a webpack.config.js file in the root of your project.

Here’s an example of how to extend the default configuration provided by @wordpress/scripts:

javascript
Copy code
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'index': path.resolve(__dirname, 'src/index.ts'), // Editor-only script
        'frontend': path.resolve(__dirname, 'src/tiny-slider.ts') // Frontend script with TinySlider
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js', // Output file: index.js for editor, frontend.js for frontend
    },
    resolve: {
        extensions: ['.ts', '.js'], // Add TypeScript file support
    },
    module: {
        rules: [
            // Add TypeScript loader
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
3. Update package.json build script
Next, modify your package.json to use the custom webpack.config.js by adding the --config flag to the build command:

json
Copy code
{
  "scripts": {
    "build": "wp-scripts build --config webpack.config.js",
    "start": "wp-scripts start --config webpack.config.js",
    "plugin-zip": "wp-scripts plugin-zip"
  }
}
This ensures that when you run the build command, both index.js (for the editor) and frontend.js (for the frontend with tiny-slider.ts) will be bundled and placed in the build/ directory.

4. Run the build
Now run the build command to bundle everything:

bash
Copy code
npm run build
After running the command, you should see frontend.js in the build/ folder, which will contain the compiled code from tiny-slider.ts.

5. Ensure frontend.js is referenced in block.json
As previously mentioned, make sure your block.json references the correct file for the frontend script:

json
Copy code
{
	"script": "file:./frontend.js"
}
Summary
By creating a custom webpack.config.js, you can control multiple entry points for your TypeScript files and ensure that your tiny-slider.ts is compiled into a separate frontend.js file. This file will then be enqueued on the frontend as part of your block's block.json configuration.


Handling Styles in webpack.config.js
If you need to customize how styles are built or bundled, you can adjust the webpack.config.js:

javascript
Copy code
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'index': path.resolve(__dirname, 'src/index.ts'), // Editor script
        'frontend': path.resolve(__dirname, 'src/frontend.ts') // Frontend script
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'], // Add TypeScript support
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
};