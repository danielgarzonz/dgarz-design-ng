import type { Meta, StoryObj } from '@storybook/html-vite';
import '../../../dist/index.mjs';

type InputArgs = {
  label: string;
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  value: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
};

const meta = {
  title: 'Core/Input',
  args: {
    label: 'Correo',
    type: 'email',
    value: '',
    placeholder: 'nombre@empresa.com',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
  },
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'] },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  render: (args) => {
    const field = document.createElement('dgarz-input');
    field.label = args.label;
    field.type = args.type;
    field.value = args.value;
    field.placeholder = args.placeholder;
    field.disabled = args.disabled;
    field.readonly = args.readonly;
    field.required = args.required;
    field.invalid = args.invalid;
    field.style.width = 'min(100%, 22rem)';
    return field;
  },
} satisfies Meta<InputArgs>;

export default meta;
type Story = StoryObj<InputArgs>;
export const Email: Story = {};
export const Password: Story = { args: { label: 'Contraseña', type: 'password', placeholder: '' } };
export const Disabled: Story = { args: { disabled: true, value: 'no-editable@dgarz.dev' } };
export const Invalid: Story = { args: { invalid: true, value: 'malo' } };
export const Dark: Story = {
  decorators: [(story) => {
    const wrapper = document.createElement('div');
    wrapper.dataset.theme = 'dark';
    wrapper.style.cssText = 'padding: 2rem; background: var(--dgarz-color-surface)';
    wrapper.append(story() as Node);
    return wrapper;
  }],
};
