import { Component, Event, h, Prop } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/** Native action button. The default slot supplies the accessible label. */
@Component({ tag: 'dgarz-button', styleUrl: 'button.css', shadow: true })
export class DgarzButton {
  /** Visual emphasis of the action. */
  @Prop({ reflect: true }) variant: 'primary' | 'secondary' = 'primary';
  /** Prevents activation. */
  @Prop({ reflect: true }) disabled = false;
  /** Shows progress and prevents activation. */
  @Prop({ reflect: true }) loading = false;

  /** Emitted on activation; crosses the shadow boundary. */
  @Event({ eventName: 'dgarz-click', bubbles: true, composed: true, cancelable: false })
  dgarzClick!: EventEmitter<void>;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.dgarzClick.emit();
  };

  render() {
    return (
      <button type="button" disabled={this.disabled || this.loading}
        aria-busy={this.loading ? 'true' : 'false'} onClick={this.handleClick}>
        {this.loading && <span class="spinner" aria-hidden="true" />}
        <slot />
      </button>
    );
  }
}
