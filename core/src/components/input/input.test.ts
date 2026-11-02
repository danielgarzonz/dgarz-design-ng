import { afterEach, describe, expect, it, vi } from 'vitest';
import { getByLabelText, getByRole, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '../../../dist/index.mjs';

afterEach(() => document.body.replaceChildren());

async function fixture(attributes = 'label="Correo"') {
  document.body.innerHTML = `<dgarz-input ${attributes}></dgarz-input>`;
  const element = document.querySelector('dgarz-input') as HTMLDgarzInputElement;
  await waitFor(() => expect(element.shadowRoot?.querySelector('input')).toBeTruthy());
  const input = element.shadowRoot!.querySelector('input') as HTMLInputElement;
  return { element, input };
}

describe('dgarz-input', () => {
  it('renders a labelled native text field in Shadow DOM', async () => {
    const { element, input } = await fixture();
    expect(input.type).toBe('text');
    expect(getByLabelText(element.shadowRoot! as unknown as HTMLElement, 'Correo')).toBe(input);
    expect(input.disabled).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it('updates value and emits composed input/change events', async () => {
    const { element, input } = await fixture();
    const onInput = vi.fn();
    const onChange = vi.fn();
    element.addEventListener('dgarz-input', onInput);
    element.addEventListener('dgarz-change', onChange);

    await userEvent.type(input, 'hola');
    expect(element.value).toBe('hola');
    expect(onInput).toHaveBeenCalled();
    expect(onInput.mock.calls.at(-1)?.[0].detail).toBe('hola');
    expect(onInput.mock.calls.at(-1)?.[0].composed).toBe(true);

    await userEvent.tab();
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange.mock.calls.at(-1)?.[0].detail).toBe('hola');
    expect(onChange.mock.calls.at(-1)?.[0].composed).toBe(true);
  });

  it('reflects type, disabled and invalid states', async () => {
    const { element, input } = await fixture('label="Correo" type="email"');
    expect(input.type).toBe('email');
    element.disabled = true;
    element.invalid = true;
    await waitFor(() => {
      expect(element.hasAttribute('disabled')).toBe(true);
      expect(element.hasAttribute('invalid')).toBe(true);
      expect(input.disabled).toBe(true);
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('blocks editing when disabled', async () => {
    const { element, input } = await fixture('label="Nombre" disabled');
    const onInput = vi.fn();
    element.addEventListener('dgarz-input', onInput);
    expect(input.disabled).toBe(true);
    await userEvent.type(input, 'x');
    expect(element.value).toBe('');
    expect(onInput).not.toHaveBeenCalled();
  });

  it('exposes a textbox role for assistive technology', async () => {
    const { element } = await fixture('label="Buscar" type="search"');
    expect(getByRole(element.shadowRoot! as unknown as HTMLElement, 'searchbox')).toBeTruthy();
  });
});
