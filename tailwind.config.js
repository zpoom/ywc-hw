module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai', 'sans-serif'],
      serif: ['IBM Plex Sans Thai', 'serif'],
    },
    extend: {
      colors: {
        gray: {
          900: '#747474',
          800: '#919191',
          700: '#AEAEAE',
          600: '#CBCBCB',
          500: '#E8E8E8',
          400: '#EDEDED',
          300: '#F1F1F1',
          200: '#F6F6F6',
          100: '#FAFAFA',
        },
        'accent-1': '#333',
        primary: '#1AA6B7',
        'primary-dark': ' #007280',
        ternary: '#002D40',
        secondary: '#FCAF38',
        danger: '#FF7C7C',
        red: '#D82424',
        'orange-dark': '#B56E00',
        'orange-light2': '#FFD99D',
        'orange-light': '#F5D7A9',
      },
      inset: {
        xs: '0.5rem',
      },
      spacing: {
        3.5: '0.875rem',
      },
      margin: {
        7: '1.75rem',
        14: '3.5rem',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      opacity: {
        80: '.8',
      },
      minWidth: {
        md: '6rem',
        lg: '9rem',
      },
      minHeight: {
        md: '6rem',
        lg: '9rem',
        '2xl': '56rem',
      },
      lineHeight: {
        7.5: '1.875rem',
      },
      fontSize: {
        '2base': '2rem',
      },
      borderRadius: {
        xl: '0.75rem',
        xxl: '1rem',
      },
      height: {
        '1px': '1px',
      },
    },
  },
  variants: {
    borderStyle: ['hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    outline: ['focus'],
  },
  plugins: [],
}
