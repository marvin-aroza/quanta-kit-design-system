import { Component, Input, Output, EventEmitter, input, output, computed } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'qk-button',
  standalone: true,
  template: `
    <button 
      [class]="buttonClasses()" 
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      [type]="type()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  // Using new Angular 20 signal-based inputs
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  
  // Using new Angular 20 signal-based outputs
  onClick = output<Event>();

  // Computed signal for button classes
  buttonClasses = computed(() => {
    const classes = [
      'qk-button',
      `qk-button--${this.variant()}`,
      `qk-button--${this.size()}`
    ];
    
    if (this.disabled()) {
      classes.push('qk-button--disabled');
    }
    
    return classes.join(' ');
  });
}