module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/*/.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#1C3D5A',
          secondary: '#2E7A8C ',
          accent: '#E8742A ',
          green: '#2BC7A5CC',
          darkGreen: '#21C465',
          red: '#FF686D',
          gray100: '#E8ECF4',
          gray200: '#8391A1',
          gray300: '#808080',
          gray400: '#EFEFEF',
          gray500: '#F1F1F1',
          disabledgray: '#747272',
          black100: '#484C52',
          black: '#333333',
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