

# Fix: Sidebar Text Visibility + Optional Enhancements

## Problem
The sidebar has a **dark background** (`220 20% 14%` = near-black) but the **text color** (`--sidebar-foreground: 265 4% 12.9%`) is also near-black. This makes all non-active sidebar labels invisible. Only the active item ("Dashboard") is readable because it uses a different color class.

## Fix

### File: `src/index.css`
Update the light-theme sidebar CSS variables so the foreground (text) color is light enough to be readable on the dark sidebar background:

```
--sidebar-foreground: 220 10% 90%;
```

Also ensure related variables are consistent:
- `--sidebar-primary-foreground` stays light (it already is)
- `--sidebar-accent-foreground` should be dark (since the accent background is light)

The dark-mode variables (lines 151-158) already look correct — dark bg with light text.

### Specific variable changes (light theme, around line 60-67):

| Variable | Current (broken) | Fixed |
|----------|-----------------|-------|
| `--sidebar-foreground` | `265 4% 12.9%` (dark) | `220 10% 90%` (light) |
| `--sidebar-primary` | `266 4% 20.8%` (dark) | Keep or lighten slightly |
| `--sidebar-accent-foreground` | `266 4% 20.8%` (dark) | Keep (accent bg is light) |

This single CSS variable fix will make all sidebar labels (module names, group headers, admin links) visible on the dark sidebar.

## Technical Details

### File to modify:
- `src/index.css` — Fix `--sidebar-foreground` HSL value in the `:root` block (light theme)

### What stays the same:
- All component code unchanged
- All IDs and naming conventions preserved
- Dark mode sidebar variables already correct
- No structural changes

