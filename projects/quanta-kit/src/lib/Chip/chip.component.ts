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
      [attr.aria-label]="getAriaLabel()"
      [attr.aria-checked]="role === 'checkbox' && variant === 'filter' ? selected : null"
      [attr.aria-disabled]="disabled"
      [attr.data-testid]="testId"
      (click)="handleClick($event)"
      (keydown)="handleKeydown($event)"
      (focus)="handleFocus($event)"
      (blur)="handleBlur($event)"
      [tabindex]="getTabIndex()"
    >
      <!-- Leading Icon -->
      <span [style.display]="hasLeadingIcon ? 'inline' : 'none'" class="qk-chip__icon qk-chip__icon--leading" aria-hidden="true">
        <ng-content select="[slot=leading-icon]"></ng-content>
      </span>

      <!-- Avatar -->
      <span [style.display]="hasAvatar ? 'inline' : 'none'" class="qk-chip__avatar" aria-hidden="true">
        <ng-content select="[slot=avatar]"></ng-content>
      </span>

      <!-- Label -->
      <span class="qk-chip__label">
        <ng-content></ng-content>
      </span>

      <!-- Trailing Icon -->
      <span [style.display]="hasTrailingIcon ? 'inline' : 'none'" class="qk-chip__icon qk-chip__icon--trailing" aria-hidden="true">
        <ng-content select="[slot=trailing-icon]"></ng-content>
      </span>

      <!-- Remove Button -->
      <button
        [style.display]="removable ? 'inline-flex' : 'none'"
        type="button"
        class="qk-chip__remove-button"
        [attr.aria-label]="getRemoveAriaLabel()"
        [disabled]="disabled"
        [tabindex]="disabled ? -1 : 0"
        (click)="handleRemove($event)"
        (keydown)="handleRemoveKeydown($event)"
        (focus)="$event.stopPropagation()"
      >
        <span class="qk-chip__remove-icon" aria-hidden="true">
          <ng-content select="[slot=remove-icon]">×</ng-content>
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  @Input() variant: ChipVariant = 'assist';
  @Input() size: ChipSize = 'md';
  @Input() elevation: ChipElevation = 'flat';
  @Input() disabled = false;
  @Input() selected = false;
  @Input() clickable = true;
  @Input() removable = false;
  @Input() hasLeadingIcon = false;
  @Input() hasTrailingIcon = false;
  @Input() hasAvatar = false;
  @Input() customClass = '';
  @Input() ariaLabel = '';
  @Input() ariaPressed: boolean | null = null;
  @Input() removeAriaLabel = '';
  @Input() testId = '';
  @Input() inList = false;

  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() removed = new EventEmitter<MouseEvent>();
  @Output() focused = new EventEmitter<FocusEvent>();
  @Output() blurred = new EventEmitter<FocusEvent>();
  @Output() selectionChange = new EventEmitter<boolean>();

  get role(): string {
    // Avoid nested interactive elements - if removable, don't set interactive roles on container
    if (this.removable) return '';
    if (this.variant === 'filter') return 'checkbox';
    // Only make the chip interactive if it's clickable AND not removable (to avoid nested interactive elements)
    return this.clickable && !this.disabled ? 'button' : '';
  }

  getTabIndex(): number {
    if (this.disabled) return -1;
    // Avoid nested interactive elements - if removable, don't make container focusable
    if (this.removable) return -1;
    // Make clickable chips focusable
    if (this.clickable) return 0;
    // Filter chips should be focusable for selection
    if (this.variant === 'filter') return 0;
    return -1;
  }

  getAriaLabel(): string {
    return this.ariaLabel || '';
  }

  getRemoveAriaLabel(): string {
    return this.removeAriaLabel || 'Remove chip';
  }

  get chipClasses(): string {
    const classes = [
      'qk-chip',
      `qk-chip--${this.variant}`,
      `qk-chip--${this.size}`,
      `qk-chip--${this.elevation}`
    ];

    if (this.disabled) classes.push('qk-chip--disabled');
    if (this.selected) classes.push('qk-chip--selected');
    if (this.clickable && !this.disabled) classes.push('qk-chip--clickable');
    if (this.removable) classes.push('qk-chip--removable');
    if (this.hasLeadingIcon) classes.push('qk-chip--has-leading-icon');
    if (this.hasTrailingIcon) classes.push('qk-chip--has-trailing-icon');
    if (this.hasAvatar) classes.push('qk-chip--has-avatar');
    if (this.customClass) classes.push(this.customClass);

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled || !this.clickable) return;
    
    // If this is a removable chip, only handle click if it's not on the remove button
    if (this.removable) {
      const target = event.target as HTMLElement;
      const removeButton = target.closest('.qk-chip__remove-button');
      if (removeButton) return; // Let the remove button handle its own click
    }

    this.clicked.emit(event);
    
    if (this.variant === 'filter') {
      this.selected = !this.selected;
      this.selectionChange.emit(this.selected);
    }
  }

  handleRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.removed.emit(event);
    }
  }

  handleRemoveKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.removed.emit(event as any);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled || !this.clickable) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event as any);
    }
  }

  handleFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }
}
