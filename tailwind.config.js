module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C3D5A',
        secondary: '#2E7A8C',
        accent: '#E8742A',
        darkGreen: '#21C465',
        red: '#CC3333',
        offWhite: '#F5F0E8',
      },
      fontFamily: {
        sfProRoundedBold: ['SF Pro Rounded Bold', 'sans-serif'],
        sfProRoundedMedium: ['SF Pro Rounded Medium', 'sans-serif'],
        sfProRoundedRegular: ['SF Pro Rounded Regular', 'sans-serif'],
        sfProRoundedSemibold: ['SF Pro Rounded Semibold', 'sans-serif'],
        sfProRounded: ['SF Pro Rounded Regular', 'sans-serif'],
        sfProTextBold: ['SF Pro Text Bold', 'sans-serif'],
        sfProTextMedium: ['SF Pro Text Medium', 'sans-serif'],
        sfProTextRegular: ['SF Pro Text Regular', 'sans-serif'],
        sfProTextSemibold: ['SF Pro Text Semibold', 'sans-serif'],
        sfProText: ['SF Pro Text Regular', 'sans-serif'],
      },
      fontSize: {
        heading: '30px',
      },
    },
  },
  plugins: [],
};