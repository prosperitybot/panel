const colors = require('tailwindcss/colors');

const brandColor = colors.blue;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
		extend: {
			colors: {
				gray: colors.gray,
				brand: brandColor,
			},
			ringColor: {
				DEFAULT: brandColor['500'],
			},
		},
	},
  plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require("daisyui"),
	],
}
