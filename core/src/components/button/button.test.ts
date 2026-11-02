import { afterEach, describe, expect, it, vi } from 'vitest';
import { getByRole, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '../../../dist/index.mjs';

afterEach(() => document.body.replaceChildren());

async function fixture(attributes = '') {
  document.body.innerHTML = `<dgarz-button ${attributes}>Guardar</dgarz-button>`;
  const element = document.querySelector('dgarz-button') as HTMLDgarzButtonElement;
  await waitFor(() => expect(element.shadowRoot?.querySelector('button')).toBeTruthy());
  const button = getByRole(element.shadowRoot! as unknown as HTMLElement, 'button') as HTMLButtonElement;
  return { element, button };
}

describe('dgarz-button', () => {
  it('renders a native action button in Shadow DOM with its label slot', async () => {
    const { element, button } = await fixture();
    expect(button.type).toBe('button');
    expect(element.shadowRoot!.querySelector('slot')!.assignedNodes()[0].textContent).toBe('Guardar');
    expect(button.disabled).toBe(false);
  });

  it('updates properties and reflects the variant', async () => {
    const { element } = await fixture();
    element.variant = 'secondary';
    await waitFor(() => expect(element.getAttribute('variant')).toBe('secondary'));
  });

  it('emits one bubbling, composed event for activation', async () => {
    const { button } = await fixture();
    const listener = vi.fn();
    document.body.addEventListener('dgarz-click', listener, { once: true });
    await userEvent.click(button);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].composed).toBe(true);
  });

  it('supports keyboard activation through its native button', async () => {
    const { element, button } = await fixture();
    const listener = vi.fn();
    element.addEventListener('dgarz-click', listener);
    button.focus();
    expect(element.shadowRoot!.activeElement).toBe(button);
    await userEvent.keyboard('{Enter}');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it.each(['disabled', 'loading'])('blocks activation when %s', async (state) => {
    const { element, button } = await fixture(state);
    const listener = vi.fn();
    element.addEventListener('dgarz-click', listener);
    await userEvent.click(button);
    expect(button.disabled).toBe(true);
    expect(listener).not.toHaveBeenCalled();
    expect(button.getAttribute('aria-busy')).toBe(state === 'loading' ? 'true' : 'false');
  });

  it('restores interaction after loading completes', async () => {
    const { element, button } = await fixture('loading');
    element.loading = false;
    await waitFor(() => expect(button.disabled).toBe(false));
    expect(element.shadowRoot!.querySelector('.spinner')).toBeNull();
    expect(button.getAttribute('aria-busy')).toBe('false');
  });
});
