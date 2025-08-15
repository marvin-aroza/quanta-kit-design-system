import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChipComponent, ChipVariant, ChipSize, ChipElevation } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.variant).toBe('assist');
      expect(component.size).toBe('md');
      expect(component.elevation).toBe('flat');
      expect(component.disabled).toBeFalse();
      expect(component.selected).toBeFalse();
      expect(component.clickable).toBeTrue();
      expect(component.removable).toBeFalse();
      expect(component.hasLeadingIcon).toBeFalse();
      expect(component.hasTrailingIcon).toBeFalse();
      expect(component.hasAvatar).toBeFalse();
      expect(component.customClass).toBe('');
      expect(component.ariaLabel).toBe('');
      expect(component.removeAriaLabel).toBe('');
      expect(component.testId).toBe('');
    });
  });

  describe('CSS Classes', () => {
    it('should have base class', () => {
      expect(compiled.querySelector('.qk-chip')).toBeTruthy();
    });

    it('should apply variant classes', () => {
      const variants: ChipVariant[] = ['assist', 'filter', 'input', 'suggestion'];
      
      variants.forEach(variant => {
        component.variant = variant;
        fixture.detectChanges();
        expect(compiled.querySelector(`.qk-chip--${variant}`)).toBeTruthy();
      });
    });

    it('should apply size classes', () => {
      const sizes: ChipSize[] = ['sm', 'md'];
      
      sizes.forEach(size => {
        component.size = size;
        fixture.detectChanges();
        expect(compiled.querySelector(`.qk-chip--${size}`)).toBeTruthy();
      });
    });

    it('should apply elevation classes', () => {
      const elevations: ChipElevation[] = ['flat', 'elevated'];
      
      elevations.forEach(elevation => {
        component.elevation = elevation;
        fixture.detectChanges();
        expect(compiled.querySelector(`.qk-chip--${elevation}`)).toBeTruthy();
      });
    });

    it('should apply disabled class when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip--disabled')).toBeTruthy();
    });

    it('should apply selected class when selected', () => {
      component.selected = true;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip--selected')).toBeTruthy();
    });

    it('should apply clickable class when clickable', () => {
      component.clickable = true;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip--clickable')).toBeTruthy();
    });

    it('should apply removable class when removable', () => {
      component.removable = true;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip--removable')).toBeTruthy();
    });

    it('should apply custom class', () => {
      component.customClass = 'custom-chip-class';
      fixture.detectChanges();
      expect(compiled.querySelector('.custom-chip-class')).toBeTruthy();
    });

    it('should apply multiple custom classes', () => {
      component.customClass = 'class1 class2 class3';
      fixture.detectChanges();
      expect(compiled.querySelector('.class1')).toBeTruthy();
      expect(compiled.querySelector('.class2')).toBeTruthy();
      expect(compiled.querySelector('.class3')).toBeTruthy();
    });
  });

  describe('Content Projection', () => {
    it('should project main content', () => {
      const chipText = 'Test Chip Content';
      fixture = TestBed.createComponent(ChipComponent);
      const chipElement = fixture.nativeElement;
      chipElement.textContent = chipText;
      fixture.detectChanges();
      
      expect(chipElement.textContent).toContain(chipText);
    });

    it('should have leading icon slot when hasLeadingIcon is true', () => {
      component.hasLeadingIcon = true;
      fixture.detectChanges();
      
      const iconSlot = compiled.querySelector('.qk-chip__icon--leading ng-content[select="[slot=leading-icon]"]');
      expect(iconSlot).toBeTruthy();
    });

    it('should have trailing icon slot when hasTrailingIcon is true', () => {
      component.hasTrailingIcon = true;
      fixture.detectChanges();
      
      const iconSlot = compiled.querySelector('.qk-chip__icon--trailing ng-content[select="[slot=trailing-icon]"]');
      expect(iconSlot).toBeTruthy();
    });

    it('should have avatar slot when hasAvatar is true', () => {
      component.hasAvatar = true;
      fixture.detectChanges();
      
      const avatarSlot = compiled.querySelector('.qk-chip__avatar ng-content[select="[slot=avatar]"]');
      expect(avatarSlot).toBeTruthy();
    });

    it('should have remove button when removable is true', () => {
      component.removable = true;
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button');
      expect(removeButton).toBeTruthy();
    });

    it('should have custom remove icon slot when removable is true', () => {
      component.removable = true;
      fixture.detectChanges();
      
      const removeIconSlot = compiled.querySelector('.qk-chip__remove-icon ng-content[select="[slot=remove-icon]"]');
      expect(removeIconSlot).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attributes for different variants', () => {
      // Filter chip
      component.variant = 'filter';
      fixture.detectChanges();
      const filterChip = compiled.querySelector('.qk-chip');
      expect(filterChip?.getAttribute('role')).toBe('checkbox');

      // Clickable chip
      component.variant = 'assist';
      component.clickable = true;
      fixture.detectChanges();
      const clickableChip = compiled.querySelector('.qk-chip');
      expect(clickableChip?.getAttribute('role')).toBe('button');

      // Non-clickable chip
      component.clickable = false;
      fixture.detectChanges();
      const nonClickableChip = compiled.querySelector('.qk-chip');
      expect(nonClickableChip?.getAttribute('role')).toBe('listitem');
    });

    it('should have proper tabindex when clickable', () => {
      component.clickable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('tabindex')).toBe('0');
    });

    it('should have proper tabindex when not clickable', () => {
      component.clickable = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('tabindex')).toBe('-1');
    });

    it('should have proper tabindex when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('tabindex')).toBe('-1');
    });

    it('should have aria-selected for filter chips', () => {
      component.variant = 'filter';
      component.selected = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('aria-selected')).toBe('false');
      
      component.selected = true;
      fixture.detectChanges();
      expect(chipElement?.getAttribute('aria-selected')).toBe('true');
    });

    it('should have custom aria-label when provided', () => {
      component.ariaLabel = 'Custom chip label';
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('aria-label')).toBe('Custom chip label');
    });

    it('should have proper aria-label for remove button', () => {
      component.removable = true;
      component.removeAriaLabel = 'Custom remove label';
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button');
      expect(removeButton?.getAttribute('aria-label')).toContain('Custom remove label');
    });

    it('should have default aria-label for remove button', () => {
      component.removable = true;
      component.ariaLabel = 'test chip';
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button');
      expect(removeButton?.getAttribute('aria-label')).toContain('Remove test chip');
    });
  });

  describe('Test ID', () => {
    it('should have test-id attribute when testId is provided', () => {
      component.testId = 'test-chip';
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('data-testid')).toBe('test-chip');
    });

    it('should not have test-id attribute when testId is empty', () => {
      component.testId = '';
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('data-testid')).toBeNull();
    });
  });

  describe('Click Events', () => {
    it('should emit clicked event when chip is clicked and clickable', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      chipElement.click();
      
      expect(component.clicked.emit).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    });

    it('should not emit clicked event when chip is clicked and not clickable', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      chipElement.click();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should not emit clicked event when chip is disabled', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = true;
      component.disabled = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      chipElement.click();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should toggle selection for filter chips on click', () => {
      spyOn(component.selectionChange, 'emit');
      component.variant = 'filter';
      component.clickable = true;
      component.selected = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      chipElement.click();
      
      expect(component.selected).toBeTrue();
      expect(component.selectionChange.emit).toHaveBeenCalledWith(true);
    });

    it('should not toggle selection for non-filter chips on click', () => {
      spyOn(component.selectionChange, 'emit');
      component.variant = 'assist';
      component.clickable = true;
      component.selected = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      chipElement.click();
      
      expect(component.selected).toBeFalse();
      expect(component.selectionChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Remove Events', () => {
    it('should emit removed event when remove button is clicked', () => {
      spyOn(component.removed, 'emit');
      component.removable = true;
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button') as HTMLElement;
      removeButton.click();
      
      expect(component.removed.emit).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    });

    it('should not emit removed event when remove button is clicked and disabled', () => {
      spyOn(component.removed, 'emit');
      component.removable = true;
      component.disabled = true;
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button') as HTMLElement;
      removeButton.click();
      
      expect(component.removed.emit).not.toHaveBeenCalled();
    });

    it('should stop propagation when remove button is clicked', () => {
      spyOn(component.clicked, 'emit');
      spyOn(component.removed, 'emit');
      component.removable = true;
      component.clickable = true;
      fixture.detectChanges();
      
      const removeButton = compiled.querySelector('.qk-chip__remove-button') as HTMLElement;
      removeButton.click();
      
      expect(component.removed.emit).toHaveBeenCalled();
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Events', () => {
    it('should emit clicked event on Enter key when clickable', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      chipElement.dispatchEvent(event);
      
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should emit clicked event on Space key when clickable', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: ' ' });
      chipElement.dispatchEvent(event);
      
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should emit removed event on Delete key when removable', () => {
      spyOn(component.removed, 'emit');
      component.removable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Delete' });
      chipElement.dispatchEvent(event);
      
      expect(component.removed.emit).toHaveBeenCalled();
    });

    it('should emit removed event on Backspace key when removable', () => {
      spyOn(component.removed, 'emit');
      component.removable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });
      chipElement.dispatchEvent(event);
      
      expect(component.removed.emit).toHaveBeenCalled();
    });

    it('should not handle keyboard events when disabled', () => {
      spyOn(component.clicked, 'emit');
      spyOn(component.removed, 'emit');
      component.clickable = true;
      component.removable = true;
      component.disabled = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      
      chipElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      chipElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      chipElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete' }));
      chipElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
      expect(component.removed.emit).not.toHaveBeenCalled();
    });

    it('should not handle unrecognized keyboard events', () => {
      spyOn(component.clicked, 'emit');
      spyOn(component.removed, 'emit');
      component.clickable = true;
      component.removable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      chipElement.dispatchEvent(event);
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
      expect(component.removed.emit).not.toHaveBeenCalled();
    });

    it('should toggle selection for filter chips on keyboard activation', () => {
      spyOn(component.selectionChange, 'emit');
      component.variant = 'filter';
      component.clickable = true;
      component.selected = false;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      chipElement.dispatchEvent(event);
      
      expect(component.selected).toBeTrue();
      expect(component.selectionChange.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('Focus Events', () => {
    it('should emit focused event on focus', () => {
      spyOn(component.focused, 'emit');
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new FocusEvent('focus');
      chipElement.dispatchEvent(event);
      
      expect(component.focused.emit).toHaveBeenCalledWith(event);
    });

    it('should emit blurred event on blur', () => {
      spyOn(component.blurred, 'emit');
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      const event = new FocusEvent('blur');
      chipElement.dispatchEvent(event);
      
      expect(component.blurred.emit).toHaveBeenCalledWith(event);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined/null custom class gracefully', () => {
      component.customClass = null as any;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip')).toBeTruthy();
      
      component.customClass = undefined as any;
      fixture.detectChanges();
      expect(compiled.querySelector('.qk-chip')).toBeTruthy();
    });

    it('should handle all combinations of boolean props', () => {
      const booleanProps = ['disabled', 'selected', 'clickable', 'removable', 'hasLeadingIcon', 'hasTrailingIcon', 'hasAvatar'];
      
      booleanProps.forEach(prop => {
        (component as any)[prop] = true;
      });
      fixture.detectChanges();
      
      expect(component).toBeTruthy();
      expect(compiled.querySelector('.qk-chip')).toBeTruthy();
    });

    it('should maintain accessibility when all features are enabled', () => {
      component.variant = 'filter';
      component.clickable = true;
      component.removable = true;
      component.selected = true;
      component.hasLeadingIcon = true;
      component.hasAvatar = true;
      component.ariaLabel = 'Complex chip';
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip');
      expect(chipElement?.getAttribute('aria-label')).toBe('Complex chip');
      expect(chipElement?.getAttribute('aria-pressed')).toBe('true');
      expect(chipElement?.getAttribute('tabindex')).toBe('0');
    });

    it('should handle rapid successive events', () => {
      spyOn(component.clicked, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      
      const chipElement = compiled.querySelector('.qk-chip') as HTMLElement;
      
      // Simulate rapid clicks
      for (let i = 0; i < 5; i++) {
        chipElement.click();
      }
      
      expect(component.clicked.emit).toHaveBeenCalledTimes(5);
    });
  });

  describe('Component Methods', () => {
    it('should handle click method correctly', () => {
      spyOn(component.clicked, 'emit');
      spyOn(component.selectionChange, 'emit');
      
      const mockEvent = new MouseEvent('click');
      
      // Test clickable chip
      component.clickable = true;
      component.disabled = false;
      component.handleClick(mockEvent);
      expect(component.clicked.emit).toHaveBeenCalledWith(mockEvent);
      
      // Test filter chip selection
      component.variant = 'filter';
      component.selected = false;
      component.handleClick(mockEvent);
      expect(component.selected).toBeTrue();
      expect(component.selectionChange.emit).toHaveBeenCalledWith(true);
    });

    it('should handle remove method correctly', () => {
      spyOn(component.removed, 'emit');
      
      const mockEvent = new MouseEvent('click');
      spyOn(mockEvent, 'stopPropagation');
      
      component.removable = true;
      component.disabled = false;
      component.handleRemove(mockEvent);
      
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(component.removed.emit).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle keyboard method correctly', () => {
      spyOn(component, 'handleClick');
      spyOn(component, 'handleRemove');
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const deleteEvent = new KeyboardEvent('keydown', { key: 'Delete' });
      
      spyOn(enterEvent, 'preventDefault');
      spyOn(deleteEvent, 'preventDefault');
      
      component.clickable = true;
      component.removable = true;
      component.disabled = false;
      
      component.handleKeydown(enterEvent);
      expect(enterEvent.preventDefault).toHaveBeenCalled();
      expect(component.handleClick).toHaveBeenCalled();
      
      component.handleKeydown(deleteEvent);
      expect(deleteEvent.preventDefault).toHaveBeenCalled();
      expect(component.handleRemove).toHaveBeenCalled();
    });

    it('should handle focus methods correctly', () => {
      spyOn(component.focused, 'emit');
      spyOn(component.blurred, 'emit');
      
      const focusEvent = new FocusEvent('focus');
      const blurEvent = new FocusEvent('blur');
      
      component.handleFocus(focusEvent);
      expect(component.focused.emit).toHaveBeenCalledWith(focusEvent);
      
      component.handleBlur(blurEvent);
      expect(component.blurred.emit).toHaveBeenCalledWith(blurEvent);
    });

    it('should compute role correctly', () => {
      // Filter chip
      component.variant = 'filter';
      expect(component.role).toBe('checkbox');

      // Clickable chip
      component.variant = 'assist';
      component.clickable = true;
      expect(component.role).toBe('button');

      // Non-clickable chip
      component.clickable = false;
      expect(component.role).toBe('listitem');
    });

    it('should compute chip classes correctly', () => {
      component.variant = 'filter';
      component.size = 'sm';
      component.elevation = 'elevated';
      component.disabled = true;
      component.selected = true;
      component.clickable = true;
      component.removable = true;
      component.hasLeadingIcon = true;
      component.hasTrailingIcon = true;
      component.hasAvatar = true;
      component.customClass = 'custom-class';

      const classes = component.chipClasses;
      expect(classes).toContain('qk-chip');
      expect(classes).toContain('qk-chip--filter');
      expect(classes).toContain('qk-chip--sm');
      expect(classes).toContain('qk-chip--elevated');
      expect(classes).toContain('qk-chip--disabled');
      expect(classes).toContain('qk-chip--selected');
      expect(classes).toContain('qk-chip--removable');
      expect(classes).toContain('qk-chip--has-leading-icon');
      expect(classes).toContain('qk-chip--has-trailing-icon');
      expect(classes).toContain('qk-chip--has-avatar');
      expect(classes).toContain('custom-class');
      expect(classes).not.toContain('qk-chip--clickable'); // disabled chips shouldn't be clickable
    });
  });
});
