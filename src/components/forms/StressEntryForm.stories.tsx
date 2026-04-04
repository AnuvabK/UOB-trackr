import type { Meta, StoryObj } from "@storybook/react";
import StressEntryForm from "./StressEntryForm";

const meta: Meta<typeof StressEntryForm> = {
  title: "forms/StressEntryForm",
  component: StressEntryForm,
  argTypes: {
    onSubmit: { action: "submitted" },
  },
};

export default meta;

type Story = StoryObj<typeof StressEntryForm>;

export const Default: Story = {
  args: {},
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      date: new Date().toISOString().split("T")[0],
      level: 8,
      source: "Project Deadline",
      notes: "Feeling the pressure of the upcoming delivery.",
    },
  },
};

export const LowStress: Story = {
  args: {
    initialData: {
      date: new Date().toISOString().split("T")[0],
      level: 2,
      source: "Weekend Vibes",
      notes: "Relaxing day at the park.",
    },
  },
};
