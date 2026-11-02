import { Component, Event, h, Prop } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

export type DgarzInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';

/** Native text field. Prefer `label` for the accessible name. */
@Component({ tag: 'dgarz-input', styleUrl: 'input.css', shadow: true })
export class DgarzInput {
  /** Native input type subset for text-like fields. */
  @Prop() type: DgarzInputType = 'text';
  /** Current value; mutable for two-way updates from the control. */
  @Prop({ mutable: true, reflect: true }) value = '';
  /** Submitted name when used inside a form that reads light-DOM attributes. */
  @Prop() name?: string;
  /** Visible and accessible label. Prefer this over a placeholder-only name. */
  @Prop() label = '';
  /** Placeholder shown when the value is empty. */
  @Prop() placeholder = '';
  /** Prevents editing. */
  @Prop({ reflect: true }) disabled = false;
  /** Allows focus without editing. */
  @Prop({ reflect: true }) readonly = false;
  /** Marks the field as required. */
  @Prop({ reflect: true }) required = false;
  /** Visual and ARIA invalid state. */
  @Prop({ reflect: true }) invalid = false;
  /** Native autocomplete hint. */
  @Prop() autocomplete?: string;

  /** Emitted on every input with the current value. */
  @Event({ eventName: 'dgarz-input', bubbles: true, composed: true, cancelable: false })
  dgarzInput!: EventEmitter<string>;

  /** Emitted when the control commits a change. */
  @Event({ eventName: 'dgarz-change', bubbles: true, composed: true, cancelable: false })
  dgarzChange!: EventEmitter<string>;

  private handleInput = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.dgarzInput.emit(next);
  };

  private handleChange = (event: Event) => {
    const next = (event.target as HTMLInputElement).value;
    this.value = next;
    this.dgarzChange.emit(next);
  };

  render() {
    const labelled = this.label.trim().length > 0;
    const control = (
      <input
        type={this.type}
        name={this.name}
        value={this.value}
        placeholder={this.placeholder || undefined}
        disabled={this.disabled}
        readOnly={this.readonly}
        required={this.required}
        autocomplete={this.autocomplete}
        aria-invalid={this.invalid ? 'true' : 'false'}
        aria-label={labelled ? undefined : this.placeholder || 'Campo de texto'}
        onInput={this.handleInput}
        onChange={this.handleChange}
      />
    );

    // Wrap with <label> so SSR/hydration never depends on generated ids.
    return labelled ? (
      <label class="field">
        <span class="label-text">{this.label}</span>
        {control}
      </label>
    ) : (
      <div class="field">{control}</div>
    );
  }
}
