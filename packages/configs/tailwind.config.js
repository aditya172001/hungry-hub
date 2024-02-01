module.exports = {
  content: [
    "../../packages/ui/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1400px",
      },
    },
  },
};
