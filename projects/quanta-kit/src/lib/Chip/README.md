# Chip Component

A versatile chip component following Material UI 3 design guidelines for Angular applications.

## Overview

The Chip component represents input, attributes, or actions in a compact form. It supports four distinct variants based on Material UI 3 specifications, each optimized for different use cases.

## Features

- ✅ **4 Material UI 3 Variants**: assist, filter, input, suggestion
- ✅ **2 Sizes**: small (24px), medium (32px)
- ✅ **2 Elevations**: flat, elevated
- ✅ **Interactive States**: clickable, selectable, removable
- ✅ **Icon Support**: leading icons, trailing icons, avatars
- ✅ **Accessibility**: ARIA attributes, keyboard navigation
- ✅ **Events**: click, remove, focus, blur, selection change
- ✅ **TypeScript**: Full type safety with exported types
- ✅ **Customizable**: Custom classes and styling

## Installation

```bash
npm install quanta-kit
```

## Basic Usage

```typescript
import { ChipComponent } from 'quanta-kit';

@Component({
  imports: [ChipComponent],
  template: `
    <qk-chip variant="assist" size="md">
      Basic Chip
    </qk-chip>
  `
})
export class MyComponent {}
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `ChipVariant` | `'assist'` | The Material UI 3 chip variant |
| `size` | `ChipSize` | `'md'` | The size of the chip |
| `elevation` | `ChipElevation` | `'flat'` | The elevation style |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `selected` | `boolean` | `false` | Whether the chip is selected (filter chips) |
| `clickable` | `boolean` | `true` | Whether the chip is clickable |
| `removable` | `boolean` | `false` | Whether the chip can be removed |
| `hasLeadingIcon` | `boolean` | `false` | Whether the chip has a leading icon |
| `hasTrailingIcon` | `boolean` | `false` | Whether the chip has a trailing icon |
| `hasAvatar` | `boolean` | `false` | Whether the chip has an avatar |
| `customClass` | `string` | `''` | Custom CSS classes to apply |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaPressed` | `boolean \| null` | `null` | ARIA pressed state |
| `removeAriaLabel` | `string` | `''` | ARIA label for remove button |
| `testId` | `string` | `''` | Test ID for testing purposes |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `clicked` | `EventEmitter<MouseEvent>` | Emitted when chip is clicked |
| `removed` | `EventEmitter<MouseEvent>` | Emitted when chip is removed |
| `focused` | `EventEmitter<FocusEvent>` | Emitted when chip receives focus |
| `blurred` | `EventEmitter<FocusEvent>` | Emitted when chip loses focus |
| `selectionChange` | `EventEmitter<boolean>` | Emitted when selection state changes |

### Types

```typescript
export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';
export type ChipSize = 'sm' | 'md';
export type ChipElevation = 'flat' | 'elevated';
```

## Material UI 3 Chip Types

### Assist Chips
Help users take actions or see information related to primary content.

```html
<qk-chip variant="assist" [hasLeadingIcon]="true" (clicked)="onAssistClick()">
  <svg slot="leading-icon" width="18" height="18">...</svg>
  Set reminder
</qk-chip>
```

### Filter Chips
Let users select from a set of options to filter content.

```html
<qk-chip 
  variant="filter" 
  [selected]="isSelected" 
  (selectionChange)="onFilterChange($event)">
  Popular
</qk-chip>
```

### Input Chips
Represent discrete pieces of information entered by a user.

```html
<qk-chip 
  variant="input" 
  [removable]="true" 
  [hasAvatar]="true"
  (removed)="onTagRemove()">
  <img slot="avatar" src="avatar.jpg" alt="User">
  John Doe
</qk-chip>
```

### Suggestion Chips
Present dynamically generated suggestions for user actions.

```html
<qk-chip variant="suggestion" (clicked)="onSuggestionClick()">
  Coffee shops nearby
</qk-chip>
```

## Examples

### With Icons

```html
<!-- Leading Icon -->
<qk-chip variant="assist" [hasLeadingIcon]="true">
  <svg slot="leading-icon" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>
  With Icon
</qk-chip>

<!-- Trailing Icon -->
<qk-chip variant="assist" [hasTrailingIcon]="true">
  Action
  <svg slot="trailing-icon" width="18" height="18" fill="currentColor">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
</qk-chip>
```

### With Avatar

```html
<!-- Image Avatar -->
<qk-chip variant="input" [hasAvatar]="true" [removable]="true">
  <img slot="avatar" src="user.jpg" alt="User" style="width: 100%; height: 100%; object-fit: cover;">
  John Doe
</qk-chip>

<!-- Initial Avatar -->
<qk-chip variant="input" [hasAvatar]="true" [removable]="true">
  <span slot="avatar" style="font-size: 12px; font-weight: 500;">JD</span>
  John Doe
</qk-chip>
```

### Removable with Custom Icon

```html
<qk-chip variant="input" [removable]="true" (removed)="onRemove($event)">
  Removable Chip
  <svg slot="remove-icon" width="18" height="18" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/>
  </svg>
</qk-chip>
```

### Event Handling

```typescript
@Component({
  template: `
    <qk-chip 
      variant="filter"
      [selected]="isSelected"
      (clicked)="onChipClick($event)"
      (selectionChange)="onSelectionChange($event)"
      (focused)="onChipFocus($event)"
      (blurred)="onChipBlur($event)">
      Interactive Chip
    </qk-chip>
  `
})
export class MyComponent {
  isSelected = false;

  onChipClick(event: MouseEvent) {
    console.log('Chip clicked:', event);
  }

  onSelectionChange(selected: boolean) {
    this.isSelected = selected;
    console.log('Selection changed:', selected);
  }

  onChipFocus(event: FocusEvent) {
    console.log('Chip focused');
  }

  onChipBlur(event: FocusEvent) {
    console.log('Chip blurred');
  }
}
```

### Chip Set Example

```html
<div class="chip-set">
  <!-- Filter Chips -->
  <div class="filter-section">
    <h4>Filters</h4>
    <qk-chip variant="filter" [selected]="filters.popular" (selectionChange)="toggleFilter('popular', $event)">
      Popular
    </qk-chip>
    <qk-chip variant="filter" [selected]="filters.nearby" (selectionChange)="toggleFilter('nearby', $event)">
      Nearby
    </qk-chip>
    <qk-chip variant="filter" [selected]="filters.price" (selectionChange)="toggleFilter('price', $event)">
      Price
    </qk-chip>
  </div>

  <!-- Input Chips (Tags) -->
  <div class="tags-section">
    <h4>Selected Tags</h4>
    <qk-chip 
      *ngFor="let tag of selectedTags" 
      variant="input" 
      [removable]="true"
      (removed)="removeTag(tag)">
      {{ tag.name }}
    </qk-chip>
  </div>

  <!-- Assist Chips -->
  <div class="actions-section">
    <h4>Quick Actions</h4>
    <qk-chip variant="assist" [hasLeadingIcon]="true" (clicked)="setReminder()">
      <svg slot="leading-icon" width="18" height="18">...</svg>
      Set reminder
    </qk-chip>
    <qk-chip variant="assist" [hasLeadingIcon]="true" (clicked)="addToCart()">
      <svg slot="leading-icon" width="18" height="18">...</svg>
      Add to cart
    </qk-chip>
  </div>
</div>
```

## Accessibility

The Chip component includes comprehensive accessibility features:

- **ARIA Roles**: Automatically sets appropriate roles (`button`, `checkbox`, `listitem`)
- **ARIA States**: Manages `aria-selected`, `aria-pressed`, and `aria-label`
- **Keyboard Navigation**: Supports Enter, Space, Delete, and Backspace keys
- **Focus Management**: Proper tabindex and focus indicators
- **Screen Reader Support**: Descriptive labels and state announcements

### Accessibility Example

```html
<qk-chip 
  variant="filter"
  [selected]="isSelected"
  ariaLabel="Filter by popularity"
  (selectionChange)="onFilterChange($event)">
  Popular
</qk-chip>

<qk-chip 
  variant="input"
  [removable]="true"
  ariaLabel="JavaScript programming language tag"
  removeAriaLabel="Remove JavaScript tag"
  (removed)="onTagRemove()">
  JavaScript
</qk-chip>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activate clickable chip |
| `Delete` / `Backspace` | Remove removable chip |
| `Tab` | Navigate between chips |

## CSS Classes

The component generates CSS classes following the BEM methodology:

```scss
.qk-chip {
  // Base chip styles
  
  &--assist { /* Assist variant */ }
  &--filter { /* Filter variant */ }
  &--input { /* Input variant */ }
  &--suggestion { /* Suggestion variant */ }
  
  &--sm { /* Small size */ }
  &--md { /* Medium size */ }
  
  &--flat { /* Flat elevation */ }
  &--elevated { /* Elevated elevation */ }
  
  &--disabled { /* Disabled state */ }
  &--selected { /* Selected state */ }
  &--clickable { /* Clickable state */ }
  &--removable { /* Removable state */ }
  
  &--has-leading-icon { /* With leading icon */ }
  &--has-trailing-icon { /* With trailing icon */ }
  &--has-avatar { /* With avatar */ }
}
```

## Testing

The component includes comprehensive test coverage and testing utilities:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from 'quanta-kit';

describe('Chip Integration', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
  });

  it('should handle click events', () => {
    spyOn(component.clicked, 'emit');
    component.clickable = true;
    fixture.detectChanges();

    const chipElement = fixture.nativeElement.querySelector('.qk-chip');
    chipElement.click();

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
