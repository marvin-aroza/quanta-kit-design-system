# Tooltip Accessibility Fixes

## Issues Resolved

### 1. Nested Interactive Elements (Serious)
**Problem:** The tooltip wrapper div had `role="button"` and `tabindex="0"` even when containing interactive elements like buttons, creating nested interactive controls that confuse screen readers.

**Solution:** 
- Component now detects interactive children after view initialization
- Uses Angular signals (`hasInteractiveChildren`, `needsTabIndex`, `needsRole`) for reactive state
- Only applies `role="button"` and `tabindex` when content is non-interactive

### 2. Invalid ARIA Attributes (Critical)
**Problem:** `aria-expanded` was being applied to div elements without proper roles, violating ARIA specifications.

**Solution:**
- `aria-expanded` is now only applied when the wrapper also has `role="button"`
- `aria-describedby` is also conditional to avoid invalid ARIA usage

## Technical Implementation

### Signal-Based Accessibility State
```typescript
// Signals for accessibility
hasInteractiveChildren = signal(false);
needsTabIndex = computed(() => !this.hasInteractiveChildren());
needsRole = computed(() => !this.hasInteractiveChildren());
```

### Interactive Children Detection
```typescript
private detectInteractiveChildren(): void {
  const interactiveElements = this.triggerElement.nativeElement.querySelectorAll(
    'button, [role="button"], a, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
  );
  this.hasInteractiveChildren.set(interactiveElements.length > 0);
}
```

### Conditional ARIA Attributes
```typescript
[attr.aria-describedby]="needsRole() && isVisible() ? tooltipId : null"
[attr.aria-expanded]="needsRole() ? isVisible() : null"
[attr.tabindex]="needsTabIndex() ? triggerTabIndex : null"
[attr.role]="needsRole() ? 'button' : null"
```

## Result

### ✅ With Interactive Children (e.g., button)
```html
<div class="qk-tooltip-trigger">
  <button>Button with tooltip</button>
</div>
```
- No `role`, `tabindex`, or `aria-expanded` on wrapper
- Button handles its own focus and interaction

### ✅ With Non-Interactive Content (e.g., text)
```html
<div class="qk-tooltip-trigger" role="button" tabindex="0" aria-expanded="false">
  <span>Text with tooltip</span>
</div>
```
- Proper ARIA attributes on wrapper
- Wrapper acts as the interactive element

## Accessibility Benefits

1. **No Nested Interactive Elements:** Prevents confusion for screen readers and keyboard navigation
2. **Valid ARIA Usage:** All ARIA attributes are used according to specification
3. **Proper Focus Management:** Interactive elements receive focus appropriately
4. **WCAG Compliance:** Follows Web Content Accessibility Guidelines
5. **Screen Reader Friendly:** Provides clear, unambiguous interaction patterns

## Testing

The `AccessibilityShowcase` story in Storybook demonstrates both scenarios and explains the expected HTML output for each case.
