// filepath: c:\Users\HP\Desktop\dev\procurement_app\procurement-users-panel\postcss.config.js
module.exports = {
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        stage: 3,
        features: {
          'custom-properties': false
        }
      }),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };