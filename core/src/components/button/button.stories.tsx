import type { Meta, StoryObj } from '@storybook/html-vite';
import '../../../dist/index.mjs';

type ButtonArgs = { label: string; variant: 'primary' | 'secondary'; disabled: boolean; loading: boolean };

const meta = {
  title: 'Core/Button',
  args: { label: 'Continuar', variant: 'primary', disabled: false, loading: false },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render: ({ label, variant, disabled, loading }) => {
    const button = document.createElement('dgarz-button');
    button.textContent = label;
    button.variant = variant;
    button.disabled = disabled;
    button.loading = loading;
    return button;
  },
} satisfies Meta<ButtonArgs>;
export default meta;
type Story = StoryObj<ButtonArgs>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, label: 'Guardando' } };
export const Dark: Story = {
  decorators: [(story) => {
    const wrapper = document.createElement('div');
    wrapper.dataset.theme = 'dark';
    wrapper.style.cssText = 'padding: 2rem; background: var(--dgarz-color-surface)';
    wrapper.append(story() as Node);
    return wrapper;
  }],
};
