import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.variant).toBe('assist');
    expect(component.size).toBe('md');
    expect(component.elevation).toBe('flat');
    expect(component.disabled).toBe(false);
    expect(component.selected).toBe(false);
    expect(component.clickable).toBe(true);
    expect(component.removable).toBe(false);
  });

  it('should set input properties correctly', () => {
    component.variant = 'filter';
    component.size = 'sm';
    component.elevation = 'elevated';
    component.disabled = true;
    component.selected = true;
    component.removable = true;

    expect(component.variant).toBe('filter');
    expect(component.size).toBe('sm');
    expect(component.elevation).toBe('elevated');
    expect(component.disabled).toBe(true);
    expect(component.selected).toBe(true);
    expect(component.removable).toBe(true);
  });

  it('should generate correct chip classes', () => {
    component.variant = 'input';
    component.size = 'sm';
    component.elevation = 'elevated';
    component.selected = true;

    const classes = component.chipClasses;
    expect(classes).toContain('qk-chip');
    expect(classes).toContain('qk-chip--input');
    expect(classes).toContain('qk-chip--sm');
    expect(classes).toContain('qk-chip--elevated');
    expect(classes).toContain('qk-chip--selected');
  });

  it('should generate classes for disabled state', () => {
    component.disabled = true;
    
    const classes = component.chipClasses;
    expect(classes).toContain('qk-chip--disabled');
  });

  it('should generate classes for clickable state', () => {
    component.clickable = true;
    component.disabled = false;
    
    const classes = component.chipClasses;
    expect(classes).toContain('qk-chip--clickable');
  });

  it('should not add clickable class when disabled', () => {
    component.clickable = true;
    component.disabled = true;
    
    const classes = component.chipClasses;
    expect(classes).not.toContain('qk-chip--clickable');
  });

  it('should generate classes for removable state', () => {
    component.removable = true;
    
    const classes = component.chipClasses;
    expect(classes).toContain('qk-chip--removable');
  });

  it('should generate classes for icons and avatar', () => {
    component.hasLeadingIcon = true;
    component.hasTrailingIcon = true;
    component.hasAvatar = true;
    
    const classes = component.chipClasses;
    expect(classes).toContain('qk-chip--has-leading-icon');
    expect(classes).toContain('qk-chip--has-trailing-icon');
    expect(classes).toContain('qk-chip--has-avatar');
  });

  it('should add custom class', () => {
    component.customClass = 'my-custom-class';
    
    const classes = component.chipClasses;
    expect(classes).toContain('my-custom-class');
  });

  it('should return correct role for filter variant', () => {
    component.variant = 'filter';
    component.removable = false;
    
    expect(component.role).toBe('checkbox');
  });

  it('should return button role for clickable non-removable chips', () => {
    component.clickable = true;
    component.disabled = false;
    component.removable = false;
    component.variant = 'assist';
    
    expect(component.role).toBe('button');
  });

  it('should return empty role for removable chips', () => {
    component.removable = true;
    
    expect(component.role).toBe('');
  });

  it('should return empty role for disabled chips', () => {
    component.clickable = true;
    component.disabled = true;
    component.removable = false;
    component.variant = 'assist';
    
    expect(component.role).toBe('');
  });

  it('should return correct tab index for disabled chips', () => {
    component.disabled = true;
    
    expect(component.getTabIndex()).toBe(-1);
  });

  it('should return correct tab index for removable chips', () => {
    component.removable = true;
    component.disabled = false;
    
    expect(component.getTabIndex()).toBe(-1);
  });

  it('should return correct tab index for clickable chips', () => {
    component.clickable = true;
    component.disabled = false;
    component.removable = false;
    
    expect(component.getTabIndex()).toBe(0);
  });

  it('should return correct tab index for filter chips', () => {
    component.variant = 'filter';
    component.disabled = false;
    component.removable = false;
    component.clickable = false;
    
    expect(component.getTabIndex()).toBe(0);
  });

  it('should return aria label when set', () => {
    component.ariaLabel = 'Test chip';
    
    expect(component.getAriaLabel()).toBe('Test chip');
  });

  it('should return empty aria label when not set', () => {
    component.ariaLabel = '';
    
    expect(component.getAriaLabel()).toBe('');
  });

  it('should return custom remove aria label when set', () => {
    component.removeAriaLabel = 'Custom remove';
    
    expect(component.getRemoveAriaLabel()).toBe('Custom remove');
  });

  it('should return default remove aria label with chip label', () => {
    component.ariaLabel = 'My chip';
    component.removeAriaLabel = '';
    
    expect(component.getRemoveAriaLabel()).toBe('Remove My chip');
  });

  it('should return default remove aria label without chip label', () => {
    component.ariaLabel = '';
    component.removeAriaLabel = '';
    
    expect(component.getRemoveAriaLabel()).toBe('Remove chip');
  });

  it('should emit click event when clicked', () => {
    component.disabled = false;
    component.clickable = true;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new MouseEvent('click');
    component.handleClick(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should not emit click when disabled', () => {
    component.disabled = true;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new MouseEvent('click');
    component.handleClick(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should not emit click when not clickable', () => {
    component.clickable = false;
    component.disabled = false;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new MouseEvent('click');
    component.handleClick(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should toggle selection for filter variant', () => {
    component.variant = 'filter';
    component.selected = false;
    component.clickable = true;
    component.disabled = false;
    let selectionEmitted = false;
    component.selectionChange.subscribe((selected) => {
      selectionEmitted = true;
      expect(selected).toBe(true);
    });
    
    const mockEvent = new MouseEvent('click');
    component.handleClick(mockEvent);
    
    expect(component.selected).toBe(true);
    expect(selectionEmitted).toBe(true);
  });

  it('should emit remove event when removed', () => {
    component.disabled = false;
    let eventEmitted = false;
    component.removed.subscribe(() => eventEmitted = true);
    
    const mockEvent = new MouseEvent('click');
    component.handleRemove(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should not emit remove when disabled', () => {
    component.disabled = true;
    let eventEmitted = false;
    component.removed.subscribe(() => eventEmitted = true);
    
    const mockEvent = new MouseEvent('click');
    component.handleRemove(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should handle remove keydown for Enter', () => {
    component.disabled = false;
    let eventEmitted = false;
    component.removed.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(mockEvent, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(mockEvent, 'stopPropagation', { value: jest.fn() });
    
    component.handleRemoveKeydown(mockEvent);
    
    expect(eventEmitted).toBe(true);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should handle remove keydown for Space', () => {
    component.disabled = false;
    let eventEmitted = false;
    component.removed.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
    Object.defineProperty(mockEvent, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(mockEvent, 'stopPropagation', { value: jest.fn() });
    
    component.handleRemoveKeydown(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should not handle remove keydown when disabled', () => {
    component.disabled = true;
    let eventEmitted = false;
    component.removed.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleRemoveKeydown(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should handle keydown for Enter', () => {
    component.disabled = false;
    component.clickable = true;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    Object.defineProperty(mockEvent, 'preventDefault', { value: jest.fn() });
    
    component.handleKeydown(mockEvent);
    
    expect(eventEmitted).toBe(true);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should handle keydown for Space', () => {
    component.disabled = false;
    component.clickable = true;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
    Object.defineProperty(mockEvent, 'preventDefault', { value: jest.fn() });
    
    component.handleKeydown(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should not handle keydown when disabled', () => {
    component.disabled = true;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should not handle keydown when not clickable', () => {
    component.clickable = false;
    component.disabled = false;
    let eventEmitted = false;
    component.clicked.subscribe(() => eventEmitted = true);
    
    const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(mockEvent);
    
    expect(eventEmitted).toBe(false);
  });

  it('should emit focus event', () => {
    let eventEmitted = false;
    component.focused.subscribe(() => eventEmitted = true);
    
    const mockEvent = new FocusEvent('focus');
    component.handleFocus(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should emit blur event', () => {
    let eventEmitted = false;
    component.blurred.subscribe(() => eventEmitted = true);
    
    const mockEvent = new FocusEvent('blur');
    component.handleBlur(mockEvent);
    
    expect(eventEmitted).toBe(true);
  });

  it('should return empty string for aria label when not set', () => {
    component.ariaLabel = '';
    expect(component.getAriaLabel()).toBe('');
  });

  it('should handle click when removable and clicking on remove button', () => {
    component.removable = true;
    component.clickable = true;
    let clickEmitted = false;
    component.clicked.subscribe(() => clickEmitted = true);

    // Create a mock event with target being the remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('qk-chip__remove-button');
    const mockEvent = {
      target: removeButton,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    } as any;

    component.handleClick(mockEvent);
    
    // Click should not be emitted when clicking on remove button
    expect(clickEmitted).toBe(false);
  });

  it('should handle click when removable but not clicking on remove button', () => {
    component.removable = true;
    component.clickable = true;
    let clickEmitted = false;
    component.clicked.subscribe(() => clickEmitted = true);

    // Create a mock event with target NOT being the remove button
    const chipElement = document.createElement('div');
    const mockEvent = {
      target: chipElement,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    } as any;

    // Mock closest to return null (not a remove button)
    chipElement.closest = jest.fn().mockReturnValue(null);

    component.handleClick(mockEvent);
    
    // Click should be emitted when not clicking on remove button
    expect(clickEmitted).toBe(true);
  });

  it('should toggle filter chip selection on click', () => {
    component.variant = 'filter';
    component.selected = false;
    
    const mockEvent = {
      target: document.createElement('div'),
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    } as any;

    component.handleClick(mockEvent);
    
    expect(component.selected).toBe(true);
    
    // Click again to toggle back
    component.handleClick(mockEvent);
    
    expect(component.selected).toBe(false);
  });

  it('should return 0 tab index for filter variant when not removable', () => {
    component.variant = 'filter';
    component.removable = false;
    component.clickable = false;
    component.disabled = false;
    
    expect(component.getTabIndex()).toBe(0);
  });

  it('should specifically test filter variant tab index logic', () => {
    // Reset all properties to ensure clean state
    component.disabled = false;
    component.removable = false; 
    component.clickable = false;
    component.variant = 'filter';
    
    // This should hit line 56 exactly
    const result = component.getTabIndex();
    expect(result).toBe(0);
  });

  it('should test filter variant with sequential property setting', () => {
    // Create a new component fixture to avoid any side effects
    const newFixture = TestBed.createComponent(ChipComponent);
    const newComponent = newFixture.componentInstance;
    
    // Explicitly set each property
    newComponent.disabled = false;
    newComponent.removable = false;
    newComponent.clickable = false;
    newComponent.variant = 'filter';
    
    // Trigger change detection
    newFixture.detectChanges();
    
    // Test the specific logic path
    expect(newComponent.getTabIndex()).toBe(0);
  });
});
