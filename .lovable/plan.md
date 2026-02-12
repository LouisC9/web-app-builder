

# Student Co-curricular Management System — Frontend Plan

## Overview
A professional admin-panel style web app for managing student co-curricular activities. Built as frontend-only with mock data, designed for future PHP/MySQL backend integration. All specified IDs and naming conventions will be strictly followed.

---

## Layout
- **Topbar**: App title, logged-in user placeholder, logout button
- **Sidebar**: Navigation links to Dashboard, Modules (Events, Clubs, Merit, Achievements), and Admin section (conditionally visible)
- **Main content area**: Page title, breadcrumbs, action buttons, content cards
- Clean, professional, consistent styling throughout

## Role Simulation
- A `currentRole` variable (`"student"` | `"admin"`) toggleable in the UI
- Student: sees only their own records across all modules
- Admin: sees all users, usage summaries, and admin-only pages
- Admin sidebar links hidden when role is "student"

---

## Pages & Routes

### Auth Pages (no sidebar/topbar)
1. **Login** (`/`) — Login form with email, password, remember me, error container. All specified IDs preserved.
2. **Register** (`/register`) — Registration form with full name, student ID, email, password, confirm password. All specified IDs preserved.

### Student Pages (with sidebar/topbar)
3. **Dashboard** (`/dashboard`) — Overview cards showing personal totals for events, clubs, merit hours, achievements

### Module Pages (CRUD UI)
Each module page includes: breadcrumb header, "Add Record" form card, "Records List" table card, edit modal, delete confirmation modal, search input, sort dropdown, filter dropdown, pagination, and CSV export button — all with the exact specified IDs.

4. **Events** (`/modules/event`) — Manage events with fields: name, type (dropdown), date, location, organizer, description
5. **Clubs** (`/modules/club`) — Manage club memberships with fields: club name, role, join date, end date, description
6. **Merit** (`/modules/merit`) — Manage merit/community service with fields: activity name, category, hours, date, description. Includes total hours summary card.
7. **Achievements** (`/modules/achievement`) — Manage achievements with fields: title, level, date, awarding body, certificate upload (UI only), description

### Admin Pages (visible only when role = admin)
8. **Admin Dashboard** (`/admin/dashboard`) — Summary cards (total users, events, clubs, merits, achievements) + "Top Active Users" table
9. **Users List** (`/admin/users`) — Users table with student ID, name, email, per-user totals, and "View Details" action
10. **User Details** (`/admin/user-details/:id`) — User profile card + tabbed view of that user's Events/Clubs/Merit/Achievements tables

---

## Utilities & Data

### Demo Data
- Mock arrays for events, clubs, merits, achievements, and users with per-user counts
- Used to populate all tables and dashboard cards

### Table Utilities
- Search/filter by keyword
- Sort by column
- Client-side pagination
- Export table to CSV

### Form Validation
- Required field checks
- Email format validation
- Password match validation
- Error messages shown in designated error containers

---

## Code Standards
- Consistent React comment blocks (`{/* ===== Section Name ===== */}`) in all components
- All form inputs retain specified `id` and `name` attributes for future backend integration
- Clean, readable component structure with TypeScript types

