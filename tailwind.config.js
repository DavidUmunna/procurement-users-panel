const isProduction = process.env.NODE_ENV === 'production';

module.exports= {
  content: isProduction ? ["./src/**/*.{js,jsx,ts,tsx}"] : [],
  theme: {
    extend: {},
  },
  plugins: [],
  purge:false
};
