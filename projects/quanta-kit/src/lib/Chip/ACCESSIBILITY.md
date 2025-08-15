# Chip Component Accessibility Guide

## Overview

The Quanta Kit Angular Chip component has been designed with accessibility as a first-class citizen, following WCAG 2.1 AA guidelines and best practices for interactive UI components.

## Accessibility Features

### 1. **Semantic HTML & ARIA Roles**
- ✅ **Filter chips**: Use `role="checkbox"` with proper `aria-selected` and `aria-pressed` states
- ✅ **Interactive chips**: Use `role="button"` for clickable chips
- ✅ **Display chips**: Use `role="listitem"` for non-interactive chips
- ✅ **Remove buttons**: Proper button semantics with descriptive labels

### 2. **Keyboard Navigation**
- ✅ **Tab navigation**: Chips are included in tab order with `tabindex="0"`
- ✅ **Disabled state**: Disabled chips removed from tab order with `tabindex="-1"`
- ✅ **Keyboard activation**: 
  - `Enter` and `Space` keys activate clickable chips
  - `Delete` and `Backspace` keys remove removable chips
- ✅ **Focus management**: Focus indicators meet contrast requirements

### 3. **Screen Reader Support**
- ✅ **Accessible names**: Support for custom `aria-label` attributes
- ✅ **State announcements**: Selected/unselected states properly announced
- ✅ **Disabled state**: `aria-disabled` attribute for disabled chips
- ✅ **Remove button labels**: Clear, descriptive labels for remove functionality
- ✅ **Icon accessibility**: Decorative icons marked with `aria-hidden="true"`

### 4. **Visual Accessibility**
- ✅ **Focus indicators**: 3px outline with sufficient color contrast
- ✅ **High contrast mode**: Support for `prefers-contrast: high`
- ✅ **Reduced motion**: Respects `prefers-reduced-motion: reduce`
- ✅ **Color contrast**: Text and background colors meet WCAG AA standards
- ✅ **Touch targets**: Minimum 44px height for touch accessibility

## Implementation Examples

### Filter Chip with Accessibility
```html
<qk-chip 
  variant="filter" 
  ariaLabel="Technology filter" 
  [selected]="isSelected"
  (selectionChange)="onFilterChange($event)">
  Technology
</qk-chip>
```

### Input Chip with Remove Function
```html
<qk-chip 
  variant="input" 
  [removable]="true" 
  ariaLabel="JavaScript skill"
  removeAriaLabel="Remove JavaScript skill"
  (removed)="onSkillRemove()">
  JavaScript
</qk-chip>
```

### Disabled Chip
```html
<qk-chip 
  variant="assist" 
  [disabled]="true" 
  ariaLabel="Feature unavailable">
  Unavailable Feature
</qk-chip>
```

## Accessibility Testing

### Manual Testing Checklist
- [ ] **Keyboard Navigation**: Can navigate to and activate all interactive chips using only keyboard
- [ ] **Screen Reader**: All chip content and states are properly announced
- [ ] **Focus Visibility**: Focus indicators are clearly visible on all interactive elements
- [ ] **High Contrast**: Component remains usable in high contrast mode
- [ ] **Touch**: All interactive elements meet minimum touch target size

### Automated Testing
The component includes comprehensive accessibility tests in Storybook stories that verify:
- ARIA attributes are correctly applied
- Focus management works properly  
- Keyboard interactions function as expected
- Screen reader accessibility is maintained

## WCAG 2.1 Compliance

| Guideline | Level | Status | Implementation |
|-----------|-------|--------|----------------|
| 1.3.1 Info and Relationships | A | ✅ | Semantic markup and ARIA |
| 1.4.3 Contrast (Minimum) | AA | ✅ | Color contrast ratios verified |
| 2.1.1 Keyboard | A | ✅ | Full keyboard accessibility |
| 2.1.2 No Keyboard Trap | A | ✅ | Proper focus management |
| 2.4.3 Focus Order | A | ✅ | Logical tab order |
| 2.4.7 Focus Visible | AA | ✅ | Clear focus indicators |
| 3.2.2 On Input | A | ✅ | Predictable behavior |
| 4.1.2 Name, Role, Value | A | ✅ | Proper ARIA implementation |

## Browser & Assistive Technology Support

### Tested Combinations
- ✅ **NVDA** + Chrome/Firefox
- ✅ **JAWS** + Chrome/Edge  
- ✅ **VoiceOver** + Safari
- ✅ **Dragon NaturallySpeaking** + Chrome
- ✅ **Keyboard only** navigation

## Best Practices for Developers

1. **Always provide meaningful labels**: Use `ariaLabel` for context-specific descriptions
2. **Handle state changes**: Ensure filter chips announce selection state changes
3. **Group related chips**: Use semantic containers for chip sets
4. **Test with real users**: Include users with disabilities in your testing process
5. **Maintain focus order**: Ensure logical tab sequence in your layouts

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Material Design Accessibility](https://material.io/design/usability/accessibility.html)
