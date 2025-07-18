# Design Prompt & Theme Specification: Cypress Carbon Grid

This document outlines the design system and visual theme for the Cypress Carbon Grid dashboard. It can be used as a detailed prompt for AI image generation, UI/UX design, or frontend development to replicate or extend the existing aesthetic.

## 1. Core Concept & Aesthetic

The design is a sophisticated, data-intensive, futuristic interface with a "glassmorphism" aesthetic. It is built on a dark mode theme, creating a sense of depth and focus on the data visualizations.

**Keywords:** Dark Mode, Glassmorphism, Sci-Fi UI, Futuristic, Data Visualization, Heads-up Display (HUD), Polished, Professional.

## 2. Color Palette

The palette is dominated by dark, cool tones with vibrant, contrasting accent colors for data and highlights.

- **Primary Background:** A subtle, dark gradient from very dark gray through deep blue to a dark green. (`bg-gradient-to-br from-gray-900 via-blue-900 to-green-900`)
- **Component Background (Glass Cards):** Semi-transparent, dark gradient with a frosted glass effect. (`bg-gradient-to-br from-gray-800/50 to-gray-900/50`)
- **Primary Text:** White (`text-white`).
- **Secondary/Subtle Text:** Light grays (`text-gray-300`, `text-gray-400`).
- **Accent & Data Colors:**
    - **Emerald/Green:** Used for positive trends, success states, and highlights. (`#10B981`, `#34D399`)
    - **Blue:** Used for neutral or informational data. (`#3B82F6`)
    - **Red/Orange:** Used for critical alerts, negative trends, or warnings. (`#EF4444`, `#F59E0B`)
    - **Purple/Indigo:** Used for ESG-related metrics and highlights. (`#8B5CF6`, `#6366F1`)
    - **Yellow/Amber:** Used for warnings or secondary highlights. (`#FBBF24`)

## 3. Typography

- **Font Family:** System UI font stack for a clean, modern, and native feel. (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`)
- **Hierarchy:**
    - **Main Titles:** Large and bold (`text-3xl` or `text-4xl`, `font-bold`).
    - **Card/Section Titles:** Medium size and semi-bold (`text-lg`, `font-semibold`).
    - **Metrics & Data:** Large and bold for emphasis (`text-3xl`, `font-bold`), with a smaller unit indicator (`text-lg`, `text-gray-400`).
    - **Body/Description Text:** Small and normal weight (`text-sm`, `text-gray-300`).

## 4. Layout & Structure

- **Main Container:** Centered with a maximum width (`max-w-7xl mx-auto`).
- **Grid System:** A responsive CSS grid is used for the main layout, with consistent spacing (`grid`, `grid-cols-*`, `gap-4`, `gap-6`).
- **Spacing:** Consistent vertical spacing between sections (`space-y-6`).

## 5. Key UI Component: The "Glass Card"

This is the foundational component of the dashboard.

- **Background:** A semi-transparent, blurred background (`backdrop-filter: blur(16px)`).
- **Gradient:** A subtle gradient from a slightly lighter dark gray to a darker one (`from-gray-800/50 to-gray-900/50`).
- **Border:** A very subtle, semi-transparent border to define the edges (`border border-gray-700/50`).
- **Rounded Corners:** Generously rounded corners (`rounded-xl`).
- **Shadow:** A soft shadow to lift the card off the background (`shadow-xl`).
- **Hover Effect:** A smooth transition to a slightly lighter gradient on hover (`transition-all duration-300`).

## 6. Iconography

- **Style:** Simple, recognizable symbols enclosed in colored circular backgrounds. The icons themselves are often single-color (white or a light color).
- **Examples:**
    - A globe icon in a blue circle for "Global Emissions."
    - A leaf icon in a green circle for "ESG/Environmental."
    - A building icon in a purple circle for "Corporate/Municipal."

## 7. Data Visualization (Charts via Recharts)

- **General Style:** Clean, modern, and integrated into the dark theme.
- **Grid Lines:** Dashed and dark gray (`strokeDasharray="3 3" stroke="#374151"`).
- **Axes:** Light gray text (`stroke="#9CA3AF"`).
- **Chart Types & Colors:**
    - **Area Charts:** Used for time-series data, with a gradient fill that is a transparent version of the stroke color (e.g., `stroke="#EF4444" fill="#EF444440"`).
    - **Bar Charts:** Solid, vibrant colors for each bar.
    - **Line Charts:** Clean, vibrant lines with a slightly thicker stroke (`strokeWidth={2}`).
- **Tooltips:** Custom-styled to match the glass card theme: dark background, border, and clear typography.

## 8. Interactivity & UX

- **Hover Effects:** Most interactive elements (cards, list items, buttons) have a subtle background color or gradient change on hover.
- **Tooltips:** Extensive use of tooltips on hover to provide detailed information without cluttering the main UI. Tooltips appear smoothly and are styled consistently with the overall theme.

## Summary Prompt

Create a futuristic, dark-themed UI for a data dashboard called "Cypress Carbon Grid." The design must heavily feature **glassmorphism**, with semi-transparent, blurred, and rounded-corner cards on top of a dark, cool-toned gradient background (dark gray to blue to green). The color palette should be dark, with vibrant accent colors like emerald green, electric blue, and warning red for data visualization. Typography should be a clean, modern system font. The layout is a responsive grid. All data visualizations (area, bar, line charts) should be clean, with dark grid lines and bright data colors. The overall feel should be professional, polished, and reminiscent of a sci-fi heads-up display (HUD).
