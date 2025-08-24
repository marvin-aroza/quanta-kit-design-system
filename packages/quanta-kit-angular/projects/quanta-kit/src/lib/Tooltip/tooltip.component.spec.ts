import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.text).toBe('');
    expect(component.position).toBe('top');
    expect(component.trigger).toBe('hover');
    expect(component.type).toBe('plain');
    expect(component.disabled).toBe(false);
    expect(component.showDelay).toBe(500);
    expect(component.hideDelay).toBe(0);
    expect(component.persistent).toBe(false);
    expect(component.maxWidth).toBe('320px');
    expect(component.offset).toBe(8);
    expect(component.triggerTabIndex).toBe(0);
  });

  it('should set input properties correctly', () => {
    component.text = 'Test tooltip';
    component.position = 'bottom';
    component.trigger = 'click';
    component.type = 'rich';
    component.disabled = true;
    component.showDelay = 100;
    component.hideDelay = 200;
    component.persistent = true;
    component.customClass = 'custom-class';
    component.maxWidth = '400px';
    component.offset = 10;

    expect(component.text).toBe('Test tooltip');
    expect(component.position).toBe('bottom');
    expect(component.trigger).toBe('click');
    expect(component.type).toBe('rich');
    expect(component.disabled).toBe(true);
    expect(component.showDelay).toBe(100);
    expect(component.hideDelay).toBe(200);
    expect(component.persistent).toBe(true);
    expect(component.customClass).toBe('custom-class');
    expect(component.maxWidth).toBe('400px');
    expect(component.offset).toBe(10);
  });

  it('should generate correct tooltip classes', () => {
    component.position = 'bottom';
    component.type = 'rich';
    component.customClass = 'my-class';
    component.persistent = true;

    const classes = component.tooltipClasses;
    expect(classes).toContain('qk-tooltip');
    expect(classes).toContain('qk-tooltip--bottom');
    expect(classes).toContain('qk-tooltip--rich');
    expect(classes).toContain('my-class');
    expect(classes).toContain('qk-tooltip--persistent');
  });

  it('should generate correct arrow classes', () => {
    component.position = 'left';
    const classes = component.arrowClasses;
    expect(classes).toContain('qk-tooltip-arrow');
    expect(classes).toContain('qk-tooltip-arrow--left');
  });

  it('should generate correct tooltip styles', () => {
    component.maxWidth = '500px';
    const styles = component.tooltipStyles;
    expect(styles).toEqual({ 'max-width': '500px', 'z-index': '1000' });
  });

  it('should generate tooltip ID', () => {
    expect(component.tooltipId).toContain('qk-tooltip-');
  });

  it('should warn for plain tooltips without text', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    component.text = '';
    component.type = 'plain';
    
    component.ngOnInit();
    
    expect(consoleSpy).toHaveBeenCalledWith('qk-tooltip: text is required for plain tooltips');
    consoleSpy.mockRestore();
  });

  it('should not warn for rich tooltips without text', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    component.text = '';
    component.type = 'rich';
    
    component.ngOnInit();
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should not warn for plain tooltips with text', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    component.text = 'Some text';
    component.type = 'plain';
    
    component.ngOnInit();
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should show tooltip when show() is called', () => {
    let showEmitted = false;
    let toggleEmitted = false;
    component.tooltipShow.subscribe(() => showEmitted = true);
    component.tooltipToggle.subscribe((visible) => {
      toggleEmitted = true;
      expect(visible).toBe(true);
    });

    component.show();
    
    expect(component.isVisible()).toBe(true);
    expect(showEmitted).toBe(true);
    expect(toggleEmitted).toBe(true);
  });

  it('should not show tooltip when disabled', () => {
    component.disabled = true;
    
    component.show();
    
    expect(component.isVisible()).toBe(false);
  });

  it('should not show tooltip when already visible', () => {
    component.isVisible.set(true);
    let showEmitted = false;
    component.tooltipShow.subscribe(() => showEmitted = true);
    
    component.show();
    
    expect(showEmitted).toBe(false);
  });

  it('should hide tooltip when hide() is called', () => {
    component.isVisible.set(true);
    let hideEmitted = false;
    let toggleEmitted = false;
    component.tooltipHide.subscribe(() => hideEmitted = true);
    component.tooltipToggle.subscribe((visible) => {
      toggleEmitted = true;
      expect(visible).toBe(false);
    });

    component.hide();
    
    expect(component.isVisible()).toBe(false);
    expect(hideEmitted).toBe(true);
    expect(toggleEmitted).toBe(true);
  });

  it('should not hide tooltip when not visible', () => {
    component.isVisible.set(false);
    let hideEmitted = false;
    component.tooltipHide.subscribe(() => hideEmitted = true);
    
    component.hide();
    
    expect(hideEmitted).toBe(false);
  });

  it('should toggle tooltip visibility', () => {
    expect(component.isVisible()).toBe(false);
    
    component.toggle();
    expect(component.isVisible()).toBe(true);
    
    component.toggle();
    expect(component.isVisible()).toBe(false);
  });

  it('should handle trigger mouse enter for hover trigger', fakeAsync(() => {
    component.trigger = 'hover';
    component.disabled = false;
    component.showDelay = 100;
    
    component.onTriggerMouseEnter();
    
    expect(component.isVisible()).toBe(false);
    
    tick(100);
    expect(component.isVisible()).toBe(true);
  }));

  it('should not show tooltip on mouse enter when disabled', () => {
    component.trigger = 'hover';
    component.disabled = true;
    
    component.onTriggerMouseEnter();
    
    expect(component.isVisible()).toBe(false);
  });

  it('should not show tooltip on mouse enter for non-hover trigger', () => {
    component.trigger = 'click';
    component.disabled = false;
    
    component.onTriggerMouseEnter();
    
    expect(component.isVisible()).toBe(false);
  });

  it('should handle trigger mouse leave for hover trigger', fakeAsync(() => {
    component.trigger = 'hover';
    component.disabled = false;
    component.hideDelay = 100;
    component.isVisible.set(true);
    
    component.onTriggerMouseLeave();
    
    expect(component.isVisible()).toBe(true);
    
    tick(100);
    expect(component.isVisible()).toBe(false);
  }));

  it('should handle trigger focus for focus trigger', fakeAsync(() => {
    component.trigger = 'focus';
    component.disabled = false;
    component.showDelay = 100;
    
    component.onTriggerFocus();
    
    expect(component.isVisible()).toBe(false);
    
    tick(100);
    expect(component.isVisible()).toBe(true);
  }));

  it('should handle trigger blur for focus trigger', fakeAsync(() => {
    component.trigger = 'focus';
    component.disabled = false;
    component.hideDelay = 100;
    component.isVisible.set(true);
    
    component.onTriggerBlur();
    
    expect(component.isVisible()).toBe(true);
    
    tick(100);
    expect(component.isVisible()).toBe(false);
  }));

  it('should handle trigger click for click trigger', () => {
    component.trigger = 'click';
    component.disabled = false;
    
    expect(component.isVisible()).toBe(false);
    
    component.onTriggerClick();
    expect(component.isVisible()).toBe(true);
    
    component.onTriggerClick();
    expect(component.isVisible()).toBe(false);
  });

  it('should handle tooltip mouse leave for hover trigger', fakeAsync(() => {
    component.trigger = 'hover';
    component.hideDelay = 100;
    component.isVisible.set(true);
    
    component.onTooltipMouseLeave();
    
    expect(component.isVisible()).toBe(true);
    
    tick(100);
    expect(component.isVisible()).toBe(false);
  }));

  it('should not handle tooltip mouse leave for non-hover trigger', fakeAsync(() => {
    component.trigger = 'click';
    component.hideDelay = 100;
    component.isVisible.set(true);
    
    component.onTooltipMouseLeave();
    
    tick(100);
    expect(component.isVisible()).toBe(true);
  }));

  it('should schedule show with custom delay', fakeAsync(() => {
    component.trigger = 'hover';
    component.showDelay = 200;
    component.disabled = false;
    
    component.onTriggerMouseEnter();
    
    tick(199);
    expect(component.isVisible()).toBe(false);
    
    tick(1);
    expect(component.isVisible()).toBe(true);
  }));

  it('should schedule hide with custom delay', fakeAsync(() => {
    component.trigger = 'hover';
    component.hideDelay = 150;
    component.isVisible.set(true);
    
    component.onTriggerMouseLeave();
    
    tick(149);
    expect(component.isVisible()).toBe(true);
    
    tick(1);
    expect(component.isVisible()).toBe(false);
  }));

  it('should clear timeouts when mouse enter/leave quickly', fakeAsync(() => {
    component.trigger = 'hover';
    component.showDelay = 500;
    component.hideDelay = 500;
    component.disabled = false;
    
    // Start show
    component.onTriggerMouseEnter();
    tick(100);
    
    // Cancel show and start hide
    component.onTriggerMouseLeave();
    tick(600);
    
    expect(component.isVisible()).toBe(false);
  }));

  it('should detect interactive children after view init', () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<button>Test</button>';
    component.triggerElement = { nativeElement: mockElement } as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(true);
  });

  it('should handle ngAfterViewInit with button children', () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<button>Test</button>';
    component.triggerElement = { nativeElement: mockElement } as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(true);
  });

  it('should handle ngAfterViewInit with link children', () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<a href="#">Test</a>';
    component.triggerElement = { nativeElement: mockElement } as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(true);
  });

  it('should handle ngAfterViewInit with input children', () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<input type="text">';
    component.triggerElement = { nativeElement: mockElement } as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(true);
  });

  it('should handle ngAfterViewInit with non-interactive children', () => {
    const mockElement = document.createElement('div');
    mockElement.innerHTML = '<span>Test</span>';
    component.triggerElement = { nativeElement: mockElement } as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(false);
  });

  it('should handle ngAfterViewInit with missing triggerElement', () => {
    component.triggerElement = undefined as any;
    
    component.ngAfterViewInit();
    
    expect(component.hasInteractiveChildren()).toBe(false);
  });

  it('should clean up on destroy', () => {
    component.ngOnDestroy();
    // Test passes if no errors are thrown
  });

  it('should handle tooltip styles with different max width', () => {
    component.maxWidth = '600px';
    
    const styles = component.tooltipStyles;
    
    expect(styles).toEqual({ 'max-width': '600px', 'z-index': '1000' });
  });

  it('should handle tooltip styles with default max width', () => {
    const styles = component.tooltipStyles;
    
    expect(styles).toEqual({ 'max-width': '320px', 'z-index': '1000' });
  });

  it('should handle different positions for tooltip classes', () => {
    const positions = ['top', 'bottom', 'left', 'right'];
    
    positions.forEach(position => {
      component.position = position as any;
      const classes = component.tooltipClasses;
      expect(classes).toContain(`qk-tooltip--${position}`);
    });
  });

  it('should handle different types for tooltip classes', () => {
    const types = ['plain', 'rich'];
    
    types.forEach(type => {
      component.type = type as any;
      const classes = component.tooltipClasses;
      expect(classes).toContain(`qk-tooltip--${type}`);
    });
  });

  it('should handle event emissions for show/hide/toggle', () => {
    let showCount = 0;
    let hideCount = 0;
    let toggleCount = 0;
    
    component.tooltipShow.subscribe(() => showCount++);
    component.tooltipHide.subscribe(() => hideCount++);
    component.tooltipToggle.subscribe(() => toggleCount++);
    
    component.show();
    expect(showCount).toBe(1);
    expect(hideCount).toBe(0);
    expect(toggleCount).toBe(1);
    
    component.hide();
    expect(showCount).toBe(1);
    expect(hideCount).toBe(1);
    expect(toggleCount).toBe(2);
    
    component.toggle();
    expect(showCount).toBe(2);
    expect(hideCount).toBe(1);
    expect(toggleCount).toBe(3);
  });

  it('should not emit events when show/hide have no effect', () => {
    let showCount = 0;
    let hideCount = 0;
    
    component.tooltipShow.subscribe(() => showCount++);
    component.tooltipHide.subscribe(() => hideCount++);
    
    // Try to show when already visible
    component.isVisible.set(true);
    component.show();
    expect(showCount).toBe(0);
    
    // Try to hide when already hidden
    component.isVisible.set(false);
    component.hide();
    expect(hideCount).toBe(0);
  });

  it('should handle trigger events when disabled', () => {
    component.disabled = true;
    
    component.onTriggerMouseEnter();
    component.onTriggerFocus();
    component.onTriggerClick();
    
    expect(component.isVisible()).toBe(false);
  });

  it('should not handle mouse leave when disabled', () => {
    component.disabled = true;
    component.trigger = 'hover';
    component.isVisible.set(true);
    
    component.onTriggerMouseLeave();
    
    // Should remain visible since disabled
    expect(component.isVisible()).toBe(true);
  });

  it('should not handle blur when disabled', () => {
    component.disabled = true;
    component.trigger = 'focus';
    component.isVisible.set(true);
    
    component.onTriggerBlur();
    
    // Should remain visible since disabled
    expect(component.isVisible()).toBe(true);
  });

  it('should handle mouse leave when not disabled and hover trigger', fakeAsync(() => {
    component.disabled = false;
    component.trigger = 'hover';
    component.hideDelay = 0;
    component.isVisible.set(true);
    
    component.onTriggerMouseLeave();
    
    tick(1); // Allow the timeout to execute
    expect(component.isVisible()).toBe(false);
  }));

  it('should handle blur when not disabled and focus trigger', fakeAsync(() => {
    component.disabled = false;
    component.trigger = 'focus';
    component.hideDelay = 0;
    component.isVisible.set(true);
    
    component.onTriggerBlur();
    
    tick(1); // Allow the timeout to execute
    expect(component.isVisible()).toBe(false);
  }));
});
