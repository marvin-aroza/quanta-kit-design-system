import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Supported button visual variants */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark';

/** Supported button sizes */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Supported button types for form submission */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * A customizable button component with multiple variants, sizes, and states.
 *
 * @example
 * ```html
 * <qk-button variant="primary" size="lg" (clicked)="handleClick()">
 *   Click me
 * </qk-button>
 * ```
 */
@Component({
  selector: 'qk-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** Button variant/style */
  @Input() variant: ButtonVariant = 'primary';

  /** Button size */
  @Input() size: ButtonSize = 'md';

  /** Button type attribute */
  @Input() type: ButtonType = 'button';

  /** Whether the button is disabled */
  @Input() disabled = false;

  /** Whether the button is in loading state */
  @Input() loading = false;

  /** Whether to hide text content when loading */
  @Input() hideTextOnLoading = false;

  /** Whether the button should take full width */
  @Input() fullWidth = false;

  /** Whether the button has rounded corners */
  @Input() rounded = false;

  /** Whether the button has no border radius */
  @Input() square = false;

  /** Custom CSS classes to apply */
  @Input() customClass = '';

  /** ARIA label for accessibility */
  @Input() ariaLabel = '';

  /** ARIA pressed state for toggle buttons */
  @Input() ariaPressed: boolean | null = null;

  /** Test ID for testing purposes */
  @Input() testId = '';

  /** Click event emitter */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Focus event emitter */
  @Output() focused = new EventEmitter<FocusEvent>();

  /** Blur event emitter */
  @Output() blurred = new EventEmitter<FocusEvent>();

  /**
   * Computes the CSS classes for the button based on current state and properties.
   * @returns A space-separated string of CSS classes
   */
  get buttonClasses(): string {
    const classes = [
      'qk-btn',
      `qk-btn--${this.variant}`,
      `qk-btn--${this.size}`,
    ];

    if (this.fullWidth) {
      classes.push('qk-btn--full-width');
    }

    if (this.rounded) {
      classes.push('qk-btn--rounded');
    }

    if (this.square) {
      classes.push('qk-btn--square');
    }

    if (this.loading) {
      classes.push('qk-btn--loading');
    }

    if (this.disabled) {
      classes.push('qk-btn--disabled');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }

  /**
   * Handles button click events.
   * Prevents action if button is disabled or loading.
   * @param event The mouse click event
   */
  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  /**
   * Handles button focus events.
   * @param event The focus event
   */
  handleFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  /**
   * Handles button blur events.
   * @param event The blur event
   */
  handleBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }
}
