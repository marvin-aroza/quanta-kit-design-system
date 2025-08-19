# Chip Component Implementation Guide

## Overview

This guide provides detailed implementation instructions for the Chip component in Quanta Kit Angular, following Material UI 3 design specifications.

## Quick Start

### 1. Installation

```bash
npm install quanta-kit
```

### 2. Import and Use

```typescript
import { Component } from '@angular/core';
import { ChipComponent } from 'quanta-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ChipComponent],
  template: `
    <qk-chip variant="assist">
      Basic Chip
    </qk-chip>
  `
})
export class ExampleComponent {}
```

## Implementation Patterns

### Material UI 3 Chip Types

#### 1. Assist Chips
Help users take actions or see information related to primary content.

```typescript
@Component({
  template: `
    <div class="assist-chips">
      <!-- Basic assist chip -->
      <qk-chip variant="assist" (clicked)="onAssistAction()">
        Set reminder
      </qk-chip>

      <!-- With leading icon -->
      <qk-chip variant="assist" [hasLeadingIcon]="true" (clicked)="onAddToCart()">
        <svg leading-icon width="18" height="18" fill="currentColor">
          <path d="M19 7h-2v5h-2V7h-2V5h2V3h2v2h2v2zm-4 8H3V9h8.3c.1-.7.4-1.4.8-2H1v14h16v-6.1c-.6.4-1.3.7-2 .7z"/>
        </svg>
        Add to cart
      </qk-chip>

      <!-- Elevated style -->
      <qk-chip variant="assist" elevation="elevated" (clicked)="onGetDirections()">
        Get directions
      </qk-chip>
    </div>
  `
})
export class AssistChipsExample {
  onAssistAction() {
    console.log('Assist action triggered');
  }

  onAddToCart() {
    console.log('Adding to cart');
  }

  onGetDirections() {
    console.log('Getting directions');
  }
}
```

#### 2. Filter Chips
Let users select from a set of options to filter content.

```typescript
@Component({
  template: `
    <div class="filter-section">
      <h3>Filter Options</h3>
      <div class="filter-chips">
        <qk-chip 
          *ngFor="let filter of filters" 
          variant="filter"
          [selected]="filter.selected"
          (selectionChange)="onFilterChange(filter, $event)">
          {{ filter.label }}
        </qk-chip>
      </div>
      
      <div class="results">
        <p>Showing {{ getFilteredCount() }} results</p>
      </div>
    </div>
  `
})
export class FilterChipsExample {
  filters = [
    { id: 'popular', label: 'Popular', selected: false },
    { id: 'nearby', label: 'Nearby', selected: true },
    { id: 'price', label: 'Price', selected: false },
    { id: 'rating', label: 'Rating', selected: false }
  ];

  onFilterChange(filter: any, selected: boolean) {
    filter.selected = selected;
    this.applyFilters();
  }

  getFilteredCount(): number {
    const activeFilters = this.filters.filter(f => f.selected);
    // Your filtering logic here
    return 42; // Example count
  }

  private applyFilters() {
    // Implement your filtering logic
    console.log('Active filters:', this.filters.filter(f => f.selected));
  }
}
```

#### 3. Input Chips
Represent discrete pieces of information entered by a user.

```typescript
interface Tag {
  id: string;
  name: string;
  avatar?: string;
}

@Component({
  template: `
    <div class="input-section">
      <h3>Selected Tags</h3>
      <div class="input-chips">
        <qk-chip 
          *ngFor="let tag of selectedTags; trackBy: trackByTagId"
          variant="input"
          [removable]="true"
          [hasAvatar]="!!tag.avatar"
          (removed)="removeTag(tag)">
          
          <!-- Avatar if available -->
          <img 
            *ngIf="tag.avatar" 
            avatar 
            [src]="tag.avatar" 
            [alt]="tag.name"
            style="width: 100%; height: 100%; object-fit: cover;">
          
          <!-- Initials fallback -->
          <span 
            *ngIf="!tag.avatar" 
            avatar 
            style="font-size: 12px; font-weight: 500;">
            {{ getInitials(tag.name) }}
          </span>
          
          {{ tag.name }}
        </qk-chip>
      </div>
      
      <button (click)="addRandomTag()" class="add-tag-btn">
        Add Random Tag
      </button>
    </div>
  `
})
export class InputChipsExample {
  selectedTags: Tag[] = [
    { id: '1', name: 'JavaScript', avatar: 'js-logo.png' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Angular', avatar: 'angular-logo.png' }
  ];

  availableTags: Tag[] = [
    { id: '4', name: 'React' },
    { id: '5', name: 'Vue.js' },
    { id: '6', name: 'Svelte' }
  ];

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    console.log('Removed tag:', tag.name);
  }

  addRandomTag() {
    if (this.availableTags.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.availableTags.length);
      const tagToAdd = this.availableTags[randomIndex];
      
      this.selectedTags.push(tagToAdd);
      this.availableTags = this.availableTags.filter(t => t.id !== tagToAdd.id);
    }
  }

  trackByTagId(index: number, tag: Tag): string {
    return tag.id;
  }

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  }
}
```

#### 4. Suggestion Chips
Present dynamically generated suggestions for user actions.

```typescript
@Component({
  template: `
    <div class="suggestion-section">
      <h3>Suggested Actions</h3>
      <div class="suggestion-chips">
        <qk-chip 
          *ngFor="let suggestion of suggestions"
          variant="suggestion"
          (clicked)="onSuggestionClick(suggestion)">
          {{ suggestion.text }}
        </qk-chip>
      </div>
    </div>
  `
})
export class SuggestionChipsExample {
  suggestions = [
    { id: 'coffee', text: 'Coffee shops nearby' },
    { id: 'restaurants', text: 'Popular restaurants' },
    { id: 'gas', text: 'Gas stations' },
    { id: 'hotels', text: 'Hotels in area' }
  ];

  onSuggestionClick(suggestion: any) {
    console.log('Suggestion clicked:', suggestion.text);
    // Implement suggestion action
    this.performSuggestedAction(suggestion.id);
  }

  private performSuggestedAction(actionId: string) {
    switch (actionId) {
      case 'coffee':
        // Search for coffee shops
        break;
      case 'restaurants':
        // Search for restaurants
        break;
      // ... other cases
    }
  }
}
```

## Advanced Implementation Patterns

### 1. Dynamic Chip Management

```typescript
interface ChipData {
  id: string;
  text: string;
  variant: 'assist' | 'filter' | 'input' | 'suggestion';
  selected?: boolean;
  removable?: boolean;
  icon?: string;
}

@Component({
  template: `
    <div class="dynamic-chips">
      <qk-chip 
        *ngFor="let chip of chips; trackBy: trackByChipId"
        [variant]="chip.variant"
        [selected]="chip.selected"
        [removable]="chip.removable"
        [hasLeadingIcon]="!!chip.icon"
        (clicked)="onChipClick(chip)"
        (removed)="onChipRemove(chip)"
        (selectionChange)="onChipSelectionChange(chip, $event)">
        
        <i *ngIf="chip.icon" [class]="chip.icon" leading-icon></i>
        {{ chip.text }}
      </qk-chip>
    </div>
  `
})
export class DynamicChipsExample {
  chips: ChipData[] = [];

  addChip(chipData: ChipData) {
    this.chips.push({ ...chipData });
  }

  onChipClick(chip: ChipData) {
    console.log('Chip clicked:', chip);
  }

  onChipRemove(chip: ChipData) {
    this.chips = this.chips.filter(c => c.id !== chip.id);
  }

  onChipSelectionChange(chip: ChipData, selected: boolean) {
    chip.selected = selected;
  }

  trackByChipId(index: number, chip: ChipData): string {
    return chip.id;
  }
}
```

### 2. Form Integration

```typescript
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-section">
        <label>Skills</label>
        <div class="skills-chips">
          <qk-chip 
            *ngFor="let skill of availableSkills"
            variant="filter"
            [selected]="isSkillSelected(skill)"
            (selectionChange)="toggleSkill(skill, $event)">
            {{ skill }}
          </qk-chip>
        </div>
      </div>

      <div class="form-section">
        <label>Selected Skills</label>
        <div class="selected-chips">
          <qk-chip 
            *ngFor="let skill of selectedSkills"
            variant="input"
            [removable]="true"
            (removed)="removeSkill(skill)">
            {{ skill }}
          </qk-chip>
        </div>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `
})
export class FormChipsExample {
  form: FormGroup;
  availableSkills = ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js'];
  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      skills: this.fb.array([])
    });
  }

  get skillsArray(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  toggleSkill(skill: string, selected: boolean) {
    if (selected) {
      this.selectedSkills.push(skill);
      this.skillsArray.push(this.fb.control(skill));
    } else {
      this.removeSkill(skill);
    }
  }

  removeSkill(skill: string) {
    const index = this.selectedSkills.indexOf(skill);
    if (index > -1) {
      this.selectedSkills.splice(index, 1);
      this.skillsArray.removeAt(index);
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
  }
}
```

### 3. Accessibility Implementation

```typescript
@Component({
  template: `
    <div class="accessible-chips" 
         role="group" 
         aria-label="Filter options">
      
      <qk-chip 
        *ngFor="let filter of filters; let i = index"
        variant="filter"
        [selected]="filter.selected"
        [ariaLabel]="getAriaLabel(filter)"
        [testId]="'filter-chip-' + filter.id"
        (selectionChange)="onFilterChange(filter, $event)"
        (focused)="onChipFocus(filter)"
        (blurred)="onChipBlur(filter)">
        {{ filter.name }}
      </qk-chip>

      <!-- Screen reader announcement -->
      <div aria-live="polite" aria-atomic="true" class="sr-only">
        {{ announceText }}
      </div>
    </div>
  `,
  styles: [`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class AccessibleChipsExample {
  filters = [
    { id: 'category', name: 'Category', selected: false },
    { id: 'price', name: 'Price Range', selected: false },
    { id: 'location', name: 'Location', selected: true }
  ];

  announceText = '';

  getAriaLabel(filter: any): string {
    const state = filter.selected ? 'selected' : 'not selected';
    return `${filter.name} filter, ${state}`;
  }

  onFilterChange(filter: any, selected: boolean) {
    filter.selected = selected;
    const action = selected ? 'applied' : 'removed';
    this.announceText = `${filter.name} filter ${action}`;
    
    // Clear announcement after screen reader reads it
    setTimeout(() => this.announceText = '', 1000);
  }

  onChipFocus(filter: any) {
    console.log('Chip focused:', filter.name);
  }

  onChipBlur(filter: any) {
    console.log('Chip blurred:', filter.name);
  }
}
```

## Styling and Customization

### 1. Custom CSS Classes

```typescript
@Component({
  template: `
    <qk-chip 
      variant="assist"
      customClass="custom-chip premium-chip"
      (clicked)="onPremiumAction()">
      Premium Feature
    </qk-chip>
  `,
  styles: [`
    ::ng-deep .custom-chip {
      border: 2px solid gold;
      background: linear-gradient(45deg, #FFD700, #FFA500);
    }

    ::ng-deep .premium-chip:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    }
  `]
})
export class CustomStyledChipsExample {
  onPremiumAction() {
    console.log('Premium action triggered');
  }
}
```

### 2. Theme Integration

```scss
// themes/_chip-theme.scss
.light-theme {
  .qk-chip {
    --chip-bg-color: #f5f5f5;
    --chip-text-color: #333;
    --chip-border-color: #ddd;
  }
}

.dark-theme {
  .qk-chip {
    --chip-bg-color: #2d2d2d;
    --chip-text-color: #fff;
    --chip-border-color: #555;
  }
}
```

## Testing Patterns

### 1. Unit Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from 'quanta-kit';

describe('ChipComponent Integration', () => {
  let component: MyChipContainer;
  let fixture: ComponentFixture<MyChipContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipComponent, MyChipContainer]
    }).compileComponents();

    fixture = TestBed.createComponent(MyChipContainer);
    component = fixture.componentInstance;
  });

  it('should handle chip click events', () => {
    spyOn(component, 'onChipClick');
    
    const chipElement = fixture.nativeElement.querySelector('[data-testid="test-chip"]');
    chipElement.click();
    
    expect(component.onChipClick).toHaveBeenCalled();
  });

  it('should toggle filter selection', () => {
    component.filters[0].selected = false;
    fixture.detectChanges();
    
    const filterChip = fixture.nativeElement.querySelector('[data-testid="filter-0"]');
    filterChip.click();
    
    expect(component.filters[0].selected).toBe(true);
  });
});
```

### 2. E2E Testing

```typescript
// e2e/chip.e2e-spec.ts
import { browser, by, element } from 'protractor';

describe('Chip Component E2E', () => {
  beforeEach(() => {
    browser.get('/chips-demo');
  });

  it('should allow filtering with chip selection', async () => {
    const filterChip = element(by.css('[data-testid="filter-popular"]'));
    const resultCount = element(by.css('.result-count'));
    
    await filterChip.click();
    
    const count = await resultCount.getText();
    expect(count).toContain('filtered results');
  });

  it('should remove input chips', async () => {
    const inputChip = element(by.css('[data-testid="input-tag-1"]'));
    const removeButton = inputChip.element(by.css('.qk-chip__remove-button'));
    
    await removeButton.click();
    
    expect(await inputChip.isPresent()).toBe(false);
  });
});
```

## Performance Optimization

### 1. TrackBy Functions

```typescript
@Component({
  template: `
    <qk-chip 
      *ngFor="let item of largeDataSet; trackBy: trackByItemId"
      variant="filter"
      [selected]="item.selected"
      (selectionChange)="onItemSelectionChange(item, $event)">
      {{ item.name }}
    </qk-chip>
  `
})
export class PerformantChipsExample {
  largeDataSet: any[] = [];

  trackByItemId(index: number, item: any): string {
    return item.id;
  }

  onItemSelectionChange(item: any, selected: boolean) {
    // Only update the specific item
    item.selected = selected;
  }
}
```

### 2. OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <qk-chip 
      *ngFor="let chip of chips$ | async; trackBy: trackByChipId"
      [variant]="chip.variant"
      [selected]="chip.selected"
      (clicked)="onChipClick(chip)"
      (selectionChange)="onSelectionChange(chip, $event)">
      {{ chip.text }}
    </qk-chip>
  `
})
export class OptimizedChipsExample {
  chips$ = this.dataService.getChips();

  constructor(
    private dataService: ChipDataService,
    private cdr: ChangeDetectorRef
  ) {}

  trackByChipId(index: number, chip: any): string {
    return chip.id;
  }

  onChipClick(chip: any) {
    // Immutable update
    this.chips$ = this.chips$.pipe(
      map(chips => chips.map(c => 
        c.id === chip.id ? { ...c, clicked: true } : c
      ))
    );
  }

  onSelectionChange(chip: any, selected: boolean) {
    // Trigger change detection if needed
    this.cdr.markForCheck();
  }
}
```

## Common Patterns and Best Practices

### 1. State Management

```typescript
// Using NgRx for chip state management
@Component({
  template: `
    <qk-chip 
      *ngFor="let filter of filters$ | async"
      variant="filter"
      [selected]="filter.selected"
      (selectionChange)="onFilterToggle(filter, $event)">
      {{ filter.name }}
    </qk-chip>
  `
})
export class StateManagementExample {
  filters$ = this.store.select(selectFilters);

  constructor(private store: Store) {}

  onFilterToggle(filter: any, selected: boolean) {
    this.store.dispatch(toggleFilter({ filterId: filter.id, selected }));
  }
}
```

### 2. Error Handling

```typescript
@Component({
  template: `
    <div class="chip-container">
      <qk-chip 
        *ngFor="let tag of tags"
        variant="input"
        [removable]="true"
        [disabled]="loading"
        (removed)="removeTag(tag)">
        {{ tag.name }}
      </qk-chip>

      <div *ngIf="error" class="error-message" role="alert">
        {{ error }}
      </div>
    </div>
  `
})
export class ErrorHandlingExample {
  tags: any[] = [];
  loading = false;
  error = '';

  async removeTag(tag: any) {
    this.loading = true;
    this.error = '';

    try {
      await this.tagService.removeTag(tag.id);
      this.tags = this.tags.filter(t => t.id !== tag.id);
    } catch (error) {
      this.error = 'Failed to remove tag. Please try again.';
      console.error('Tag removal failed:', error);
    } finally {
      this.loading = false;
    }
  }
}
```

## Migration Guide

### From Other Chip Libraries

If migrating from other chip implementations:

1. **Replace imports**:
   ```typescript
   // Before
   import { MatChipsModule } from '@angular/material/chips';
   
   // After
   import { ChipComponent } from 'quanta-kit';
   ```

2. **Update templates**:
   ```html
   <!-- Before (Material) -->
   <mat-chip-set>
     <mat-chip>Chip 1</mat-chip>
   </mat-chip-set>
   
   <!-- After (Quanta Kit) -->
   <qk-chip variant="input">Chip 1</qk-chip>
   ```

3. **Map event handlers**:
   ```typescript
   // Before
   onChipRemoved(event: MatChipEvent) { }
   
   // After
   onChipRemoved(event: MouseEvent) { }
   ```

This implementation guide provides comprehensive patterns for using the Chip component effectively in real-world applications while maintaining accessibility, performance, and user experience standards.
