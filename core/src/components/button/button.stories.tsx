import type { Meta, StoryObj } from '@storybook/html-vite';
import '../../../dist/index.mjs';

type ButtonArgs = { label: string; variant: 'primary' | 'secondary'; disabled: boolean; loading: boolean; glass: boolean };

const meta = {
  title: 'Core/Button',
  args: { label: 'Continuar', variant: 'primary', disabled: false, loading: false, glass: false },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    glass: { control: 'boolean' },
  },
  render: ({ label, variant, disabled, loading, glass }) => {
    const button = document.createElement('dgarz-button');
    button.textContent = label;
    button.variant = variant;
    button.disabled = disabled;
    button.loading = loading;
    button.glass = glass;
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
export const Glass: Story = {
  args: { glass: true },
  decorators: [(story) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;gap:1rem;padding:3rem 2rem;background:radial-gradient(circle at 20% 30%,#ff7a1a,transparent 40%),radial-gradient(circle at 80% 20%,#8e7dff,transparent 40%),linear-gradient(135deg,#0f1a2e,#247cff)';
    const secondary = story() as HTMLDgarzButtonElement;
    wrapper.append(story() as Node);
    secondary.variant = 'secondary';
    wrapper.append(secondary);
    return wrapper;
  }],
};
