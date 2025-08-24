import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.type).toBe('button');
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(false);
    expect(component.fullWidth).toBe(false);
    expect(component.rounded).toBe(false);
    expect(component.square).toBe(false);
  });

  it('should set input properties correctly', () => {
    component.variant = 'secondary';
    component.size = 'lg';
    component.type = 'submit';
    component.disabled = true;
    component.loading = true;
    component.fullWidth = true;
    component.rounded = true;

    expect(component.variant).toBe('secondary');
    expect(component.size).toBe('lg');
    expect(component.type).toBe('submit');
    expect(component.disabled).toBe(true);
    expect(component.loading).toBe(true);
    expect(component.fullWidth).toBe(true);
    expect(component.rounded).toBe(true);
  });

  it('should generate correct button classes', () => {
    component.variant = 'danger';
    component.size = 'lg';
    component.fullWidth = true;
    component.rounded = true;
    component.square = true;
    component.loading = true;
    component.disabled = true;
    component.customClass = 'test-class';
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn');
    expect(classes).toContain('qk-btn--danger');
    expect(classes).toContain('qk-btn--lg');
    expect(classes).toContain('qk-btn--full-width');
    expect(classes).toContain('qk-btn--rounded');
    expect(classes).toContain('qk-btn--square');
    expect(classes).toContain('qk-btn--loading');
    expect(classes).toContain('qk-btn--disabled');
    expect(classes).toContain('test-class');
  });

  it('should handle disabled state correctly', () => {
    component.disabled = true;
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn--disabled');
  });

  it('should handle loading state correctly', () => {
    component.loading = true;
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn--loading');
  });

  it('should handle fullWidth state correctly', () => {
    component.fullWidth = true;
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn--full-width');
  });

  it('should handle rounded state correctly', () => {
    component.rounded = true;
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn--rounded');
  });

  it('should handle square state correctly', () => {
    component.square = true;
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn--square');
  });

  it('should handle custom class correctly', () => {
    component.customClass = 'my-custom-class';
    
    const classes = component.buttonClasses;
    expect(classes).toContain('my-custom-class');
  });

  it('should handle empty custom class correctly', () => {
    component.customClass = '';
    
    const classes = component.buttonClasses;
    expect(classes).not.toMatch(/undefined|null/);
  });

  it('should emit click event through handleClick', () => {
    const mockEvent = new MouseEvent('click');
    let eventEmitted = false;
    let capturedEvent: MouseEvent | null = null;
    component.clicked.subscribe((event) => {
      eventEmitted = true;
      capturedEvent = event;
    });
    
    component.handleClick(mockEvent);
    expect(eventEmitted).toBe(true);
    expect(capturedEvent).toBe(mockEvent);
  });

  it('should not emit click when disabled in handleClick', () => {
    component.disabled = true;
    const mockEvent = new MouseEvent('click');
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    component.handleClick(mockEvent);
    expect(eventEmitted).toBe(false);
  });

  it('should not emit click when loading in handleClick', () => {
    component.loading = true;
    const mockEvent = new MouseEvent('click');
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    component.handleClick(mockEvent);
    expect(eventEmitted).toBe(false);
  });

  it('should not emit click when both disabled and loading', () => {
    component.disabled = true;
    component.loading = true;
    const mockEvent = new MouseEvent('click');
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    component.handleClick(mockEvent);
    expect(eventEmitted).toBe(false);
  });

  it('should emit focus event through handleFocus', () => {
    const mockEvent = new FocusEvent('focus');
    let eventEmitted = false;
    let capturedEvent: FocusEvent | null = null;
    component.focused.subscribe((event) => {
      eventEmitted = true;
      capturedEvent = event;
    });
    
    component.handleFocus(mockEvent);
    expect(eventEmitted).toBe(true);
    expect(capturedEvent).toBe(mockEvent);
  });

  it('should emit blur event through handleBlur', () => {
    const mockEvent = new FocusEvent('blur');
    let eventEmitted = false;
    let capturedEvent: FocusEvent | null = null;
    component.blurred.subscribe((event) => {
      eventEmitted = true;
      capturedEvent = event;
    });
    
    component.handleBlur(mockEvent);
    expect(eventEmitted).toBe(true);
    expect(capturedEvent).toBe(mockEvent);
  });

  it('should test all button variants', () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    
    variants.forEach(variant => {
      component.variant = variant as any;
      const classes = component.buttonClasses;
      expect(classes).toContain(`qk-btn--${variant}`);
    });
  });

  it('should test outline button variants', () => {
    const outlineVariants = ['outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-light', 'outline-dark'];
    
    outlineVariants.forEach(variant => {
      component.variant = variant as any;
      const classes = component.buttonClasses;
      expect(classes).toContain(`qk-btn--${variant}`);
    });
  });

  it('should test all button sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    sizes.forEach(size => {
      component.size = size as any;
      const classes = component.buttonClasses;
      expect(classes).toContain(`qk-btn--${size}`);
    });
  });

  it('should handle multiple combined states', () => {
    component.variant = 'outline-danger';
    component.size = 'xl';
    component.disabled = true;
    component.loading = true;
    component.fullWidth = true;
    component.rounded = true;
    component.square = true;
    component.customClass = 'custom-class another-class';
    
    const classes = component.buttonClasses;
    expect(classes).toContain('qk-btn');
    expect(classes).toContain('qk-btn--outline-danger');
    expect(classes).toContain('qk-btn--xl');
    expect(classes).toContain('qk-btn--disabled');
    expect(classes).toContain('qk-btn--loading');
    expect(classes).toContain('qk-btn--full-width');
    expect(classes).toContain('qk-btn--rounded');
    expect(classes).toContain('qk-btn--square');
    expect(classes).toContain('custom-class another-class');
  });

  it('should handle all event scenarios', () => {
    let clickCount = 0;
    let focusCount = 0;
    let blurCount = 0;

    component.clicked.subscribe(() => clickCount++);
    component.focused.subscribe(() => focusCount++);
    component.blurred.subscribe(() => blurCount++);

    // Normal events
    component.handleClick(new MouseEvent('click'));
    component.handleFocus(new FocusEvent('focus'));
    component.handleBlur(new FocusEvent('blur'));

    expect(clickCount).toBe(1);
    expect(focusCount).toBe(1);
    expect(blurCount).toBe(1);

    // Disabled state should block click but not focus/blur
    component.disabled = true;
    component.handleClick(new MouseEvent('click'));
    component.handleFocus(new FocusEvent('focus'));
    component.handleBlur(new FocusEvent('blur'));

    expect(clickCount).toBe(1); // Should not increment
    expect(focusCount).toBe(2); // Should increment
    expect(blurCount).toBe(2); // Should increment

    // Loading state should block click but not focus/blur
    component.disabled = false;
    component.loading = true;
    component.handleClick(new MouseEvent('click'));
    component.handleFocus(new FocusEvent('focus'));
    component.handleBlur(new FocusEvent('blur'));

    expect(clickCount).toBe(1); // Should not increment
    expect(focusCount).toBe(3); // Should increment
    expect(blurCount).toBe(3); // Should increment
  });
});
