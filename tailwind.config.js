/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Bhutanese Colors
        saffron: {
          DEFAULT: "#FF9933",
          light: "#FFB366",
          dark: "#E67E00",
        },
        "deep-orange": "#FF6B35",
        "bhutan-gold": "#D4AF37",
        "bhutan-yellow": "#FFD700",
        maroon: "#8B0000",
        "deep-red": "#C41E3A",
        cream: "#FFF8E7",
        "warm-white": "#FFFAF0",
        "dark-bg": "#1A0F0A",
        "dark-card": "#2D1F16",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        '2xl': "1.25rem",
        '3xl': "1.5rem",
        xl: "var(--radius)",
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'bhutan': "0 20px 50px rgba(255, 107, 53, 0.15), 0 10px 20px rgba(0, 0, 0, 0.05)",
        'bhutan-dark': "0 20px 50px rgba(255, 107, 53, 0.2), 0 10px 20px rgba(0, 0, 0, 0.3)",
        'glow-saffron': "0 0 30px rgba(255, 153, 51, 0.4)",
        'glow-gold': "0 0 30px rgba(212, 175, 55, 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 153, 51, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 153, 51, 0.6)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #FF9933 0%, #FF6B35 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FF9933 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
