import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';
export type TooltipType = 'plain' | 'rich';

@Component({
  selector: 'qk-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = '';
  @Input() position: TooltipPosition = 'top';
  @Input() trigger: TooltipTrigger = 'hover';
  @Input() type: TooltipType = 'plain';
  @Input() disabled: boolean = false;
  @Input() showDelay: number = 500; // Material 3 spec: 500ms delay
  @Input() hideDelay: number = 0;
  @Input() persistent: boolean = false; // For rich tooltips
  @Input() customClass: string = '';
  @Input() maxWidth: string = '320px'; // Material 3 spec
  @Input() triggerTabIndex: number = 0;
  @Input() offset: number = 8; // Distance from trigger element

  @Output() tooltipShow = new EventEmitter<void>();
  @Output() tooltipHide = new EventEmitter<void>();
  @Output() tooltipToggle = new EventEmitter<boolean>();

  @ViewChild('triggerElement', { static: true })
  triggerElement!: ElementRef<HTMLElement>;
  @ViewChild('tooltipElement') tooltipElement?: ElementRef<HTMLElement>;

  // Signals for reactive state management
  isVisible = signal(false);
  tooltipId = `qk-tooltip-${Date.now()}`;

  // Simple accessibility state
  hasInteractiveChildren = signal(false);

  // Computed class and style strings
  get tooltipClasses(): string {
    const classes = [
      'qk-tooltip',
      `qk-tooltip--${this.position}`,
      `qk-tooltip--${this.type}`,
    ];
    if (this.customClass) classes.push(this.customClass);
    if (this.persistent) classes.push('qk-tooltip--persistent');
    return classes.join(' ');
  }

  get arrowClasses(): string {
    return `qk-tooltip-arrow qk-tooltip-arrow--${this.position}`;
  }

  get tooltipStyles(): object {
    return { 'max-width': this.maxWidth, 'z-index': '1000' };
  }

  private showTimeout?: number;
  private hideTimeout?: number;

  ngOnInit(): void {
    if (!this.text && this.type === 'plain') {
      console.warn('qk-tooltip: text is required for plain tooltips');
    }
  }

  ngAfterViewInit(): void {
    this.detectInteractiveChildren();
  }

  private detectInteractiveChildren(): void {
    if (!this.triggerElement?.nativeElement) {
      this.hasInteractiveChildren.set(false);
      return;
    }

    const interactiveElements =
      this.triggerElement.nativeElement.querySelectorAll(
        'button, a, input, select, textarea',
      );
    this.hasInteractiveChildren.set(interactiveElements.length > 0);
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  // Trigger event handlers
  onTriggerMouseEnter(): void {
    if (this.disabled || this.trigger !== 'hover') return;

    this.clearTimeouts();
    this.scheduleShow();
  }

  onTriggerMouseLeave(): void {
    if (this.disabled || this.trigger !== 'hover') return;

    this.clearTimeouts();
    this.scheduleHide();
  }

  onTriggerFocus(event?: FocusEvent): void {
    if (this.disabled || this.trigger !== 'focus') return;

    this.clearTimeouts();
    this.scheduleShow();
  }

  onTriggerBlur(event?: FocusEvent): void {
    if (this.disabled || this.trigger !== 'focus') return;

    this.clearTimeouts();
    this.scheduleHide();
  }

  onTriggerClick(event?: MouseEvent): void {
    if (this.disabled || this.trigger !== 'click') return;

    this.toggle();
  }

  // Tooltip event handlers - simplified
  onTooltipMouseEnter(): void {
    // Keep tooltip visible when hovering over it
  }

  onTooltipMouseLeave(): void {
    // Hide tooltip when leaving it
    if (this.trigger === 'hover') {
      this.scheduleHide();
    }
  }

  // Public API methods
  show(): void {
    if (this.disabled || this.isVisible()) return;

    this.clearTimeouts();
    this.isVisible.set(true);
    this.tooltipShow.emit();
    this.tooltipToggle.emit(true);
  }

  hide(): void {
    if (!this.isVisible()) return;

    this.clearTimeouts();
    this.isVisible.set(false);
    this.tooltipHide.emit();
    this.tooltipToggle.emit(false);
  }

  toggle(): void {
    this.isVisible() ? this.hide() : this.show();
  }

  // Simplified private methods
  private scheduleShow(): void {
    this.clearTimeouts();
    this.showTimeout = window.setTimeout(() => this.show(), this.showDelay);
  }

  private scheduleHide(): void {
    this.clearTimeouts();
    this.hideTimeout = window.setTimeout(() => this.hide(), this.hideDelay);
  }

  private clearTimeouts(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }
}
