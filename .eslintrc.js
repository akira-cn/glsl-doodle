module.exports = {
  globals: {
    Doodle: true,
    glDoodle: true,
  },
  extends:  "eslint-config-sprite",
  plugins: ['html'],
  rules: {
    "complexity": ["warn", 25],
    'import/prefer-default-export': 'off',
    "no-unused-vars": 'warn',
  },
}
