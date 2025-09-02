import { CommonModule } from '@angular/common'; // Import CommonModule for Angular directives
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'; // Import necessary Angular core features

export type ButtonVariant =
  | 'primary'
  | 'delete'
  | 'edit'
  | 'info'
  | 'Default'
  | 'loading'
  | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'qk-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="handleClick($event)"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
      [attr.aria-label]="ariaLabel"
      [attr.aria-pressed]="ariaPressed"
      [attr.data-testid]="testId"
    >
      <ng-container *ngIf="loading">
        <span
          *ngIf="loaderType === 'dots'"
          class="qk-btn-dots"
          aria-hidden="true"
        >
          <span></span><span></span><span></span>
        </span>

        <span
          *ngIf="loaderType === 'bar'"
          class="qk-btn-bar"
          aria-hidden="true"
        >
          <span></span><span></span><span></span>
        </span>

        <span
          *ngIf="loaderType === 'spinner'"
          class="qk-btn-spinner"
          aria-hidden="true"
        ></span>
      </ng-container>

      <ng-content select="[slot=icon-left]"></ng-content>

      <span
        class="qk-btn-content"
        [class.qk-btn-content--hidden]="loading && hideTextOnLoading"
      >
        <ng-content></ng-content>
      </span>

      <ng-content select="[slot=icon-right]"></ng-content>
    </button>
  `,
  styleUrls: ['./button-group.component.scss'], // ✅ now SCSS, not CSS
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
  /** Button variant/style */
  @Input() variant: ButtonVariant = 'primary';

  /** Button size */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() loaderType: 'spinner' | 'dots' | 'bar' | 'Loading' = 'spinner';

  /** Whether the button is disabled */
  @Input() disabled = false;

  /** Whether the button is in loading state */
  @Input() loading = false;

  /** Whether to hide text content when loading */
  @Input() hideTextOnLoading = false;

  /** Custom CSS classes to apply */
  @Input() customClass = '';

  /** ARIA label for accessibility */
  @Input() ariaLabel = '';

  /** ARIA pressed state for toggle buttons */
  @Input() ariaPressed: boolean | null = null;

  /** Test ID for testing purposes */
  @Input() testId = '';

  /** Whether the button should take full width */
  @Input() fullWidth = false;

  /** Whether the button has rounded corners */
  @Input() rounded = false;

  /** Whether the button has no border radius (square) */
  @Input() square = false;

  /** Click event emitter */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /** Focus event emitter */
  @Output() focused = new EventEmitter<FocusEvent>();

  /** Blur event emitter */
  @Output() blurred = new EventEmitter<FocusEvent>();

  get buttonClasses(): string {
    const classes = [
      'qk-btn',
      `qk-btn--${this.variant}`,
      `qk-btn--${this.size}`,
    ];

    if (this.loading) classes.push('qk-btn--loading');
    if (this.disabled) classes.push('qk-btn--disabled');
    if (this.customClass) classes.push(this.customClass);

    if (this.fullWidth) classes.push('qk-btn--full-width');
    if (this.rounded) classes.push('qk-btn--rounded');
    if (this.square) classes.push('qk-btn--square');

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  handleFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }
}
