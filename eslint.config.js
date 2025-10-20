import sanityConfig from '@sanity/eslint-config-studio'

export default [
  ...sanityConfig,
  {
    ignores: ['node_modules/**', 'dist/**', '.sanity/**'],
  },
]
