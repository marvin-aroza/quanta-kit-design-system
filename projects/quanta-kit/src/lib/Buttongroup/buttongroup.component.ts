import { CommonModule } from '@angular/common';// Import CommonModule for Angular directives
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';// Import necessary Angular core features

export type ButtonVariant = 'primary' | 'delete' | 'edit' | 'loading' |'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'qk-button',
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
      <span *ngIf="loading" class="qk-btn-spinner" aria-hidden="true"></span>
      <ng-content select="[slot=icon-left]"></ng-content>
      <span class="qk-btn-content" [class.qk-btn-content--hidden]="loading && hideTextOnLoading">
        <ng-content></ng-content>
      </span>
      <ng-content select="[slot=icon-right]"></ng-content>
    </button>
  `,
  styleUrls: ['./buttongroup.component.scss'], // ✅ now SCSS, not CSS
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ButtonComponent {
  /** Button variant/style */
  @Input() variant: ButtonVariant = 'primary' ;

  /** Button size */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

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


