# One Gym Frontend

Frontend client for One Gym, built with React + TypeScript + Vite.

## Browser compatibility

This app is configured for cross-browser compatibility using:

- `browserslist` targets in `package.json`
- `@vitejs/plugin-legacy` to generate legacy bundles and polyfills
- a conservative build target (`es2018`)

Production targets are:

- `>0.2%`
- `not dead`
- `not op_mini all`

## Scripts

- `npm run dev` - start local development server
- `npm run build` - type-check and build production assets
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
