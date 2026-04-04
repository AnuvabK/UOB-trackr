import type { Meta, StoryObj } from "@storybook/react";
import ScreenTimeEntryForm from "./ScreenTimeEntryForm";

const meta: Meta<typeof ScreenTimeEntryForm> = {
  title: "forms/ScreenTimeEntryForm",
  component: ScreenTimeEntryForm,
  argTypes: {
    onSubmit: { action: "submitted" },
  },
};

export default meta;

type Story = StoryObj<typeof ScreenTimeEntryForm>;

export const Default: Story = {
  args: {},
};

export const ProductiveWork: Story = {
  args: {
    initialData: {
      date: new Date().toISOString().split("T")[0],
      totalMins: 240, // 4 hours
      category: "productivity",
      appName: "VS Code",
      notes: "Feature implementation for the UOB Trackr.",
    },
  },
};

export const SocialMedia: Story = {
  args: {
    initialData: {
      date: new Date().toISOString().split("T")[0],
      totalMins: 45,
      category: "social",
      appName: "Instagram",
      notes: "Doomscrolling before bed.",
    },
  },
};
