<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props with defaults
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  class: '',
});

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Computed classes
const buttonClasses = computed(() => {
  const baseClasses = 'qk-button';
  const variantClass = `qk-button--${props.variant}`;
  const sizeClass = `qk-button--${props.size}`;
  const disabledClass = props.disabled ? 'qk-button--disabled' : '';
  
  return [baseClasses, variantClass, sizeClass, disabledClass, props.class]
    .filter(Boolean)
    .join(' ');
});

// Handle click
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.qk-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  font-family: inherit;
}

.qk-button:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Variants */
.qk-button--primary {
  background-color: #3b82f6;
  color: #ffffff;
}

.qk-button--primary:hover:not(.qk-button--disabled) {
  background-color: #2563eb;
}

.qk-button--secondary {
  background-color: #6b7280;
  color: #ffffff;
}

.qk-button--secondary:hover:not(.qk-button--disabled) {
  background-color: #4b5563;
}

.qk-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.qk-button--outline:hover:not(.qk-button--disabled) {
  background-color: #3b82f6;
  color: #ffffff;
}

.qk-button--ghost {
  background-color: transparent;
  color: #3b82f6;
}

.qk-button--ghost:hover:not(.qk-button--disabled) {
  background-color: #f3f4f6;
}

/* Sizes */
.qk-button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.qk-button--medium {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.qk-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

/* Disabled state */
.qk-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
