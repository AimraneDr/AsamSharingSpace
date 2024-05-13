import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "selector",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
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
                oxford_blue: {
                    DEFAULT: "#0a2239",
                    100: "#02070b",
                    200: "#040e17",
                    300: "#061422",
                    400: "#081b2d",
                    500: "#0a2239",
                    600: "#174f84",
                    700: "#257dcf",
                    800: "#68a8e4",
                    900: "#b4d4f2",
                },
                moonstone: {
                    DEFAULT: "#53a2be",
                    100: "#0f2128",
                    200: "#1e4350",
                    300: "#2d6478",
                    400: "#3d85a0",
                    500: "#53a2be",
                    600: "#77b5cb",
                    700: "#99c7d8",
                    800: "#bbdae5",
                    900: "#ddecf2",
                },
                "blue_(ncs)": {
                    DEFAULT: "#1d84b5",
                    100: "#061a24",
                    200: "#0c3548",
                    300: "#124f6c",
                    400: "#176a90",
                    500: "#1d84b5",
                    600: "#30a6dd",
                    700: "#64bde6",
                    800: "#97d3ee",
                    900: "#cbe9f7",
                },
                gunmetal: {
                    DEFAULT: "#132e32",
                    100: "#04090a",
                    200: "#081315",
                    300: "#0c1c1f",
                    400: "#102629",
                    500: "#132e32",
                    600: "#2c6a73",
                    700: "#44a4b3",
                    800: "#80c4cf",
                    900: "#bfe2e7",
                },
                lapis_lazuli: {
                    DEFAULT: "#176087",
                    100: "#05131b",
                    200: "#092636",
                    300: "#0e3a51",
                    400: "#124d6c",
                    500: "#176087",
                    600: "#218bc3",
                    700: "#4aace0",
                    800: "#87c8eb",
                    900: "#c3e3f5",
                },
            },
            // borderRadius: {
            //     lg: `var(--radius)`,
            //     md: `calc(var(--radius) - 2px)`,
            //     sm: "calc(var(--radius) - 4px)",
            // },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        screens: {
            xs: "420px",
            sm: "680px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "3xl": "1920px",
        },
    },

    plugins: [forms, require("tailwindcss-animate"), require("daisyui")],

    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: true, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
