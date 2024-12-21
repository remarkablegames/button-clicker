import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,mjs,mts,jsx,tsx}',
    './node_modules/tw-elements/js/**/*.js',
  ],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tw-elements/plugin.cjs')],
  theme: {
    fontFamily: {
      sans: '"Lucida Grande", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {},
  },
};

export default config;
