

# Visual Enhancement Plan -- Bold & Color-Coded Modules

## The Problem
The current UI is functional but visually monotonous: all pages look the same with white/gray cards, small muted icons, and no visual distinction between modules. Nothing draws the eye or makes the experience feel lively.

## The Solution
Assign each module a bold, distinct color identity and apply it consistently across dashboard cards, page headers, stat cards, sidebar icons, table accents, and buttons. Add subtle animations, colored gradients, and better visual hierarchy throughout.

## Color Assignments

| Module        | Color Theme               | Used For                        |
|---------------|---------------------------|---------------------------------|
| Events        | Blue (info)               | Icons, borders, badge accents   |
| Clubs          | Green (success)           | Icons, borders, badge accents   |
| Merit          | Amber/Orange (warning)    | Icons, borders, badge accents   |
| Achievements   | Purple (new custom color) | Icons, borders, badge accents   |
| Admin          | Slate/Primary             | Keeps the neutral admin feel    |

## Changes by Area

### 1. New CSS custom color: Purple for Achievements
Add a `--purple` HSL variable to the design system for Achievements, since the existing palette lacks a distinct purple.

### 2. Dashboard Page (`Dashboard.tsx`)
- Each stat card gets a **colored left border** (4px) matching its module color
- Icon backgrounds become **colored** (not just gray `bg-muted`) -- e.g., blue tint for Events icon, green tint for Clubs
- Add a **welcome banner** at the top with a subtle gradient background and greeting text
- Recent Activity items get colored left-accent strips matching their module

### 3. Module Pages (Event, Club, Merit, Achievement)
- **Page header** gets a subtle colored accent bar or gradient stripe at the top matching the module color
- The **"Add" button** uses the module's color instead of the default dark primary
- The **records card header** gets a thin colored top-border
- Table **row hover** gets a faint tint of the module color
- The **stat/summary cards** (like Merit Total Hours) get a colored gradient background instead of plain white

### 4. Sidebar (`AppSidebar.tsx`)
- Module nav icons get their **assigned color** (blue calendar, green users, amber star, purple award)
- Active nav item gets a **colored left border accent** matching the module, not just a gray highlight

### 5. DataTable Component (`DataTable.tsx`)
- Add a subtle **zebra-striping** with alternating row backgrounds for readability
- "Export CSV" button gets a light accent style

### 6. Admin Dashboard (`AdminDashboard.tsx`)
- Each summary card gets a **gradient background** using its module color (e.g., blue-to-transparent for Events)
- "Top Active Users" table gets subtle column-header coloring

### 7. Login & Register Pages
- Add a **colored gradient sidebar/banner** on the left (for desktop) to make the auth pages feel more branded and less plain

### 8. Animations & Transitions
- Add **fade-in animation** on page load for cards (staggered)
- Stat cards get a **hover lift effect** (scale + shadow increase)
- Sidebar items get smooth color transitions on hover

## Technical Details

### Files to modify:
- `src/index.css` -- Add purple color variable, module-specific utility classes, gradient backgrounds, zebra-striping
- `tailwind.config.ts` -- Add purple color, fade-in/scale keyframes and animations
- `src/pages/Dashboard.tsx` -- Colored card borders, tinted icon backgrounds, welcome banner
- `src/pages/modules/EventPage.tsx` -- Blue-themed accents on header, button, card
- `src/pages/modules/ClubPage.tsx` -- Green-themed accents
- `src/pages/modules/MeritPage.tsx` -- Amber-themed accents, gradient summary card
- `src/pages/modules/AchievementPage.tsx` -- Purple-themed accents
- `src/components/layout/AppSidebar.tsx` -- Colored module icons, active item accent
- `src/components/DataTable.tsx` -- Zebra-striping on table rows
- `src/pages/admin/AdminDashboard.tsx` -- Gradient stat cards, colored table headers
- `src/pages/Login.tsx` -- Gradient brand panel
- `src/pages/Register.tsx` -- Gradient brand panel

### What stays the same:
- All IDs, name attributes, and form structures remain untouched
- Comment block formatting stays identical
- No functional/logic changes -- purely visual enhancement
- All existing component structure preserved

