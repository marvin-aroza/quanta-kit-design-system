import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    buttonElement = debugElement.query(By.css('button')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Properties', () => {
    it('should have default properties', () => {
      expect(component.variant).toBe('primary');
      expect(component.size).toBe('md');
      expect(component.type).toBe('button');
      expect(component.disabled).toBe(false);
      expect(component.loading).toBe(false);
      expect(component.hideTextOnLoading).toBe(false);
      expect(component.fullWidth).toBe(false);
      expect(component.rounded).toBe(false);
      expect(component.square).toBe(false);
      expect(component.customClass).toBe('');
      expect(component.ariaLabel).toBe('');
      expect(component.ariaPressed).toBe(null);
      expect(component.testId).toBe('');
    });

    it('should render with default classes', () => {
      expect(buttonElement.className).toContain('qk-btn');
      expect(buttonElement.className).toContain('qk-btn--primary');
      expect(buttonElement.className).toContain('qk-btn--md');
    });

    it('should have correct default attributes', () => {
      expect(buttonElement.type).toBe('button');
      expect(buttonElement.disabled).toBe(false);
    });
  });

  describe('Variant Property', () => {
    it('should apply variant classes correctly', () => {
      const variants = [
        'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
        'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger',
        'outline-warning', 'outline-info', 'outline-light', 'outline-dark'
      ];

      variants.forEach(variant => {
        component.variant = variant as any;
        fixture.detectChanges();
        expect(buttonElement.className).toContain(`qk-btn--${variant}`);
      });
    });
  });

  describe('Size Property', () => {
    it('should apply size classes correctly', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

      sizes.forEach(size => {
        component.size = size as any;
        fixture.detectChanges();
        expect(buttonElement.className).toContain(`qk-btn--${size}`);
      });
    });
  });

  describe('Type Property', () => {
    it('should set button type attribute correctly', () => {
      const types = ['button', 'submit', 'reset'];

      types.forEach(type => {
        component.type = type as any;
        fixture.detectChanges();
        expect(buttonElement.type).toBe(type);
      });
    });
  });

  describe('Disabled State', () => {
    it('should disable button when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.className).toContain('qk-btn--disabled');
    });

    it('should not emit click event when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.clicked, 'emit');
      buttonElement.click();

      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show loading state correctly', () => {
      component.loading = true;
      fixture.detectChanges();

      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.className).toContain('qk-btn--loading');
      
      const spinner = fixture.debugElement.query(By.css('.qk-btn-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should hide text when hideTextOnLoading is true', () => {
      component.loading = true;
      component.hideTextOnLoading = true;
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.qk-btn-content'));
      expect(content.nativeElement.className).toContain('qk-btn-content--hidden');
    });

    it('should not emit click event when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      spyOn(component.clicked, 'emit');
      buttonElement.click();

      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Layout Modifiers', () => {
    it('should apply full width class', () => {
      component.fullWidth = true;
      fixture.detectChanges();

      expect(buttonElement.className).toContain('qk-btn--full-width');
    });

    it('should apply rounded class', () => {
      component.rounded = true;
      fixture.detectChanges();

      expect(buttonElement.className).toContain('qk-btn--rounded');
    });

    it('should apply square class', () => {
      component.square = true;
      fixture.detectChanges();

      expect(buttonElement.className).toContain('qk-btn--square');
    });

    it('should apply custom classes', () => {
      component.customClass = 'my-custom-class another-class';
      fixture.detectChanges();

      expect(buttonElement.className).toContain('my-custom-class');
      expect(buttonElement.className).toContain('another-class');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-label when provided', () => {
      component.ariaLabel = 'Test button';
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-label')).toBe('Test button');
    });

    it('should set aria-pressed when provided', () => {
      component.ariaPressed = true;
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-pressed')).toBe('true');
    });

    it('should set test id when provided', () => {
      component.testId = 'test-button';
      fixture.detectChanges();

      expect(buttonElement.getAttribute('data-testid')).toBe('test-button');
    });
  });

  describe('Event Emissions', () => {
    it('should emit clicked event on click', () => {
      spyOn(component.clicked, 'emit');
      
      buttonElement.click();

      expect(component.clicked.emit).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    });

    it('should emit focused event on focus', () => {
      spyOn(component.focused, 'emit');
      
      buttonElement.focus();

      expect(component.focused.emit).toHaveBeenCalledWith(jasmine.any(FocusEvent));
    });

    it('should emit blurred event on blur', () => {
      spyOn(component.blurred, 'emit');
      
      buttonElement.focus();
      buttonElement.blur();

      expect(component.blurred.emit).toHaveBeenCalledWith(jasmine.any(FocusEvent));
    });

    it('should not emit events when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      spyOn(component.clicked, 'emit');
      spyOn(component.focused, 'emit');
      spyOn(component.blurred, 'emit');

      // Click event should not be emitted
      component.handleClick(new MouseEvent('click'));
      expect(component.clicked.emit).not.toHaveBeenCalled();

      // Focus and blur should still work for accessibility
      component.handleFocus(new FocusEvent('focus'));
      component.handleBlur(new FocusEvent('blur'));
      expect(component.focused.emit).toHaveBeenCalled();
      expect(component.blurred.emit).toHaveBeenCalled();
    });

    it('should not emit click event when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      spyOn(component.clicked, 'emit');
      
      component.handleClick(new MouseEvent('click'));

      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Content Projection', () => {
    it('should project content correctly', () => {
      const contentEl = fixture.debugElement.query(By.css('.qk-btn-content'));
      expect(contentEl).toBeTruthy();
    });
  });

  describe('Button Classes Getter', () => {
    it('should generate correct classes combination', () => {
      component.variant = 'success';
      component.size = 'lg';
      component.fullWidth = true;
      component.rounded = true;
      component.loading = true;
      component.disabled = true;
      component.customClass = 'my-class';

      const expectedClasses = [
        'qk-btn',
        'qk-btn--success',
        'qk-btn--lg',
        'qk-btn--full-width',
        'qk-btn--rounded',
        'qk-btn--loading',
        'qk-btn--disabled',
        'my-class'
      ];

      const actualClasses = component.buttonClasses;
      
      expectedClasses.forEach(className => {
        expect(actualClasses).toContain(className);
      });
    });

    it('should handle empty custom class', () => {
      component.customClass = '';
      const classes = component.buttonClasses;
      
      expect(classes).toContain('qk-btn');
      expect(classes).not.toContain('');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable when not disabled', () => {
      expect(buttonElement.tabIndex).not.toBe(-1);
    });

    it('should handle Enter key press', () => {
      spyOn(component.clicked, 'emit');
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      buttonElement.dispatchEvent(enterEvent);
      
      // Note: The actual click behavior on Enter is handled by the browser
      // We're just ensuring the button is properly focusable
      expect(buttonElement.tabIndex).not.toBe(-1);
    });

    it('should handle Space key press', () => {
      spyOn(component.clicked, 'emit');
      
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      buttonElement.dispatchEvent(spaceEvent);
      
      // Note: The actual click behavior on Space is handled by the browser
      // We're just ensuring the button is properly focusable
      expect(buttonElement.tabIndex).not.toBe(-1);
    });
  });
});
