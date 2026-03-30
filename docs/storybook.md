# Storybook Component Guide

## Getting Started

### Prerequisites

Make sure you have dependencies installed:

```bash
npm install
```

### Running Storybook

```bash
npm run storybook
```

This opens Storybook at `http://localhost:6006`. You'll see all existing components in the sidebar.

---

## Project Structure

```
src/components/
├── layout/        # Page structure — StatCard, EntryCard, NavSidebar, Header
├── forms/         # Data entry forms — SleepEntryForm, StressEntryForm, ScreentimeEntryForm
├── charts/        # Data visualisation — SleepChart, StressChart, CorrelationBar
└── pages/         # Full page compositions — DashboardPage, SleepPage, etc.
```

Every component has two files side by side:

```
ComponentName.tsx            # The component itself
ComponentName.stories.tsx    # Storybook stories showing all visual states
```

---

## How to Build a Component

Follow this pattern for every component. Use `StatCard` and `EntryCard` in `src/components/layout/` as references.

### 1. Define your props

At the top of your `.tsx` file, define a TypeScript type for your props. This describes what data the component accepts.

```tsx
type StatCardProps = {
  title: string;
  value: string;
  trend?: TrendData; // ? means optional
};
```

If your component works with metric data (sleep, stress, screentime), import the type from validators instead of defining it yourself:

```tsx
import type { SleepEntry } from "@/lib/validators";

type EntryCardProps = {
  entry: SleepEntry;
  onEdit?: () => void;
  onDelete?: () => void;
};
```

The types in `@/lib/validators` are the source of truth for all data shapes in the app.

### 2. Write the component function

```tsx
export default function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
```

**Rules:**
- Components are **dumb** — they receive all data via props. No API calls inside components.
- Callbacks like `onEdit`, `onSubmit`, `onDelete` are passed as props too.
- Use **Tailwind classes** for all styling. No CSS modules, no inline style objects.
- Use a UI library (e.g. Radix) for primitives like buttons, inputs, selects, modals.

### 3. Write the stories file

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./StatCard";

const meta: Meta<typeof StatCard> = {
  title: "layout/StatCard",
  component: StatCard,
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const TrendingUp: Story = {
  args: {
    title: "Avg Sleep",
    value: "7.2h",
    trend: { direction: "up", percentage: 12 },
  },
};

export const NoTrend: Story = {
  args: {
    title: "Total Entries",
    value: "42",
  },
};
```

Each named export is a separate story. Use `args` to pass different props and show different states.

**Every component should have stories for:**
- Default / happy path
- Empty state (no data)
- Loading state (if applicable)
- Error state (if applicable)
- Edge cases (long text, zero values, missing optional fields)

---

## Available Types

These are defined in `src/lib/validators.ts`. Import them with:

```tsx
import type { SleepEntry, StressEntry, ScreentimeEntry } from "@/lib/validators";
```

### SleepEntry

| Field | Type | Required |
|----------|------------------------|----------|
| date | string (YYYY-MM-DD) | yes |
| bedtime | string (ISO datetime) | yes |
| wakeTime | string (ISO datetime) | yes |
| quality | number (1-10) | yes |
| notes | string | no |
| cycles | SleepCycle[] | no |

### SleepCycle

| Field | Type | Required |
|-------|--------------------------------------|----------|
| start | string (ISO datetime) | yes |
| end | string (ISO datetime) | yes |
| depth | "light" \| "deep" \| "rem" \| "awake" | yes |

### StressEntry

| Field | Type | Required |
|--------|----------------------|----------|
| date | string (YYYY-MM-DD) | yes |
| level | number (1-10) | yes |
| source | string | no |
| notes | string | no |

### ScreentimeEntry

| Field | Type | Required |
|-----------|-------------------------------------------------------------------------|----------|
| date | string (YYYY-MM-DD) | yes |
| totalMins | number | yes |
| category | "social" \| "entertainment" \| "productivity" \| "education" \| "other" | yes |
| appName | string | no |
| notes | string | no |

---

## Component Assignments

### layout/

| Component | Description |
|------------|-------------------------------------------------------------|
| StatCard | Displays a single metric summary (value + trend) |
| EntryCard | Displays a single logged entry with edit/delete actions |
| NavSidebar | Fixed left sidebar with navigation links |
| Header | Page title bar with date range filter |

### forms/

| Component | Description |
|---------------------|---------------------------------------------------|
| SleepEntryForm | Form to log a sleep entry. Uses `SleepEntry` type. |
| StressEntryForm | Form to log a stress entry. Uses `StressEntry` type. |
| ScreentimeEntryForm | Form to log screentime. Uses `ScreentimeEntry` type. |

### charts/

| Component | Description |
|-------------------|---------------------------------------------------------------|
| SleepChart | Line/bar chart showing sleep duration + quality over time |
| StressChart | Line chart showing stress levels over time |
| ScreentimeChart | Stacked bar chart showing screentime by category |
| WeeklyTrendsChart | Combined overview chart for the dashboard |
| CorrelationBar | Horizontal bar showing correlation strength between metrics |

### pages/

| Component | Description |
|----------------|-------------------------------------------------------|
| DashboardPage | StatCards + WeeklyTrendsChart + CorrelationBar |
| SleepPage | List of EntryCards + SleepChart + add entry form |
| StressPage | List of EntryCards + StressChart + add entry form |
| ScreentimePage | List of EntryCards + ScreentimeChart + add entry form |
| SettingsPage | User profile info + logout |

---

## Tips

- Run `npm run storybook` and keep it open while you work — it hot-reloads
- Look at `StatCard.tsx` and `EntryCard.tsx` if you're unsure about the pattern
- All data is fake in stories — just hardcode realistic values in `args`
- Use `@/lib/validators` for any type import (the `@/` alias points to `src/`)
