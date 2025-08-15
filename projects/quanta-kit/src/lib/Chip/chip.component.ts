import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';
export type ChipSize = 'sm' | 'md';
export type ChipElevation = 'flat' | 'elevated';

@Component({
  selector: 'qk-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="chipClasses"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-pressed]="variant === 'filter' ? selected : null"
      [attr.aria-selected]="variant === 'filter' ? selected : null"
      [attr.aria-disabled]="disabled"
      [attr.data-testid]="testId"
      (click)="handleClick($event)"
      (keydown)="handleKeydown($event)"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
      [tabindex]="disabled ? -1 : (clickable ? 0 : -1)"
    >
      <!-- Leading Icon -->
      <span *ngIf="hasLeadingIcon" class="qk-chip__icon qk-chip__icon--leading" aria-hidden="true">
        <ng-content select="[slot=leading-icon]"></ng-content>
      </span>

      <!-- Avatar (for input chips) -->
      <span *ngIf="hasAvatar" class="qk-chip__avatar" aria-hidden="true">
        <ng-content select="[slot=avatar]"></ng-content>
      </span>

      <!-- Label -->
      <span class="qk-chip__label">
        <ng-content></ng-content>
      </span>

      <!-- Trailing Icon -->
      <span *ngIf="hasTrailingIcon" class="qk-chip__icon qk-chip__icon--trailing" aria-hidden="true">
        <ng-content select="[slot=trailing-icon]"></ng-content>
      </span>

      <!-- Remove Button (for input chips) -->
      <button
        *ngIf="removable"
        type="button"
        class="qk-chip__remove-button"
        [attr.aria-label]="getRemoveAriaLabel()"
        [disabled]="disabled"
        [tabindex]="disabled ? -1 : 0"
        (click)="handleRemove($event)"
        (focus)="$event.stopPropagation()"
      >
        <span class="qk-chip__remove-icon" aria-hidden="true">
          <ng-content select="[slot=remove-icon]">
            <!-- Default remove icon -->
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </ng-content>
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  /** Chip variant following Material UI 3 design */
  @Input() variant: ChipVariant = 'assist';
  
  /** Chip size */
  @Input() size: ChipSize = 'md';
  
  /** Chip elevation style */
  @Input() elevation: ChipElevation = 'flat';
  
  /** Whether the chip is disabled */
  @Input() disabled = false;
  
  /** Whether the chip is selected (for filter chips) */
  @Input() selected = false;
  
  /** Whether the chip is clickable */
  @Input() clickable = true;
  
  /** Whether the chip can be removed (for input chips) */
  @Input() removable = false;
  
  /** Whether the chip has a leading icon */
  @Input() hasLeadingIcon = false;
  
  /** Whether the chip has a trailing icon */
  @Input() hasTrailingIcon = false;
  
  /** Whether the chip has an avatar (for input chips) */
  @Input() hasAvatar = false;
  
  /** Custom CSS classes to apply */
  @Input() customClass = '';
  
  /** ARIA label for accessibility */
  @Input() ariaLabel = '';
  
  /** ARIA pressed state for toggle chips */
  @Input() ariaPressed: boolean | null = null;
  
  /** ARIA label for remove button */
  @Input() removeAriaLabel = '';
  
  /** Test ID for testing purposes */
  @Input() testId = '';

  /** Click event emitter */
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  /** Remove event emitter */
  @Output() removed = new EventEmitter<MouseEvent>();
  
  /** Focus event emitter */
  @Output() focused = new EventEmitter<FocusEvent>();
  
  /** Blur event emitter */
  @Output() blurred = new EventEmitter<FocusEvent>();
  
  /** Selection change event emitter */
  @Output() selectionChange = new EventEmitter<boolean>();

  get role(): string {
    if (this.variant === 'filter') {
      return 'checkbox';
    }
    if (this.clickable) {
      return 'button';
    }
    return 'listitem';
  }

  getAriaLabel(): string {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }
    
    // If no explicit aria-label, return null to let the content be used
    return '';
  }

  getRemoveAriaLabel(): string {
    if (this.removeAriaLabel) {
      return this.removeAriaLabel;
    }
    
    // Provide a meaningful default for the remove button
    return 'Remove chip';
  }

  get chipClasses(): string {
    const classes = [
      'qk-chip',
      `qk-chip--${this.variant}`,
      `qk-chip--${this.size}`,
      `qk-chip--${this.elevation}`,
    ];

    if (this.disabled) {
      classes.push('qk-chip--disabled');
    }

    if (this.selected) {
      classes.push('qk-chip--selected');
    }

    if (this.clickable && !this.disabled) {
      classes.push('qk-chip--clickable');
    }

    if (this.removable) {
      classes.push('qk-chip--removable');
    }

    if (this.hasLeadingIcon) {
      classes.push('qk-chip--has-leading-icon');
    }

    if (this.hasTrailingIcon) {
      classes.push('qk-chip--has-trailing-icon');
    }

    if (this.hasAvatar) {
      classes.push('qk-chip--has-avatar');
    }

    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled || !this.clickable) {
      return;
    }

    this.clicked.emit(event);
    
    // Toggle selection for filter chips
    if (this.variant === 'filter') {
      this.selected = !this.selected;
      this.selectionChange.emit(this.selected);
    }
  }

  handleRemove(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    event.stopPropagation();
    this.removed.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    // Handle Enter and Space for clickable chips
    if ((event.key === 'Enter' || event.key === ' ') && this.clickable) {
      event.preventDefault();
      this.handleClick(event as any);
    }

    // Handle Delete/Backspace for removable chips
    if ((event.key === 'Delete' || event.key === 'Backspace') && this.removable) {
      event.preventDefault();
      this.handleRemove(event as any);
    }
  }

  handleFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }
}
