import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";

import { ButtonSelect } from ".";
import Container from "@mui/material/Container";

const meta = {
  title: "Design System/SelectButton",
  component: ButtonSelect,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    options: [
      {
        label: "50ml",
        price: "$10.00",
      },
      {
        label: "5ml",
        price: "$80.00",
        description: "An optional description",
        tag: "3 x 5ml for $40",
      },
      {
        label: "30ml",
        tag: "Tag",
      },
      {
        label: "100ml",
        description: "Optional description",
      },
    ],
  },
} satisfies Meta<typeof ButtonSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Buy",
  },
  render: (args) => (
    <>
      <Stack direction="row">
        <ButtonSelect {...args} label="Buy" />
      </Stack>
      <Container sx={{ height: 300 }} />
      <Stack direction="row">
        <ButtonSelect {...args} label="Buy" />
      </Stack>
    </>
  ),
};

export const RightAligment: Story = {
  args: {
    label: "Buy",
  },
  render: (args) => (
    <>
      <Stack direction="row-reverse">
        <ButtonSelect {...args} label="Buy" />
      </Stack>
      <Container sx={{ height: 300 }} />
      <Stack direction="row-reverse">
        <ButtonSelect {...args} label="Buy" />
      </Stack>
    </>
  ),
};
