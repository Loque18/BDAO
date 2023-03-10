/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	purge: {
		enabled: true,
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Mono', 'monospace'],
			},
			colors: {
				primary: {
					DEFAULT: '#FFFFFF',
					50: '#F7FAFC',
					100: '#EDF2F7',
					200: '#E2E8F0',
					300: '#CBD5E0',
					400: '#A0AEC0',
					500: '#718096',
					600: '#4A5568',
					700: '#2D3748',
					800: '#1A202C',
					900: '#171923',
				},
				secondary: {
					DEFAULT: '#1D1B1B',
					50: '#F0F0F0',
					100: '#D9D9D9',
					200: '#BFBFBF',
					300: '#A6A6A6',
					400: '#8C8C8C',
					500: '#737373',
					600: '#595959',
					700: '#404040',
					800: '#262626',
					900: '#0D0D0D',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				},
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			textColor: ['active'],
			borderColor: ['active'],
			ringColor: ['hover', 'active'],
		},
	},
	plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
};
