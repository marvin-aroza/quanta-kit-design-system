<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    
    <h1>Quanta Kit Vue Documentation</h1>
    <p>Welcome to the Quanta Kit Vue component library documentation.</p>
    
    <section style="margin: 2rem 0;">
      <h2>Button Component Examples</h2>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
        <QkButton variant="primary" @click="handlePrimaryClick">
          Primary Button
        </QkButton>
        <QkButton variant="secondary" @click="handleSecondaryClick">
          Secondary Button
        </QkButton>
        <QkButton variant="outline" @click="handleOutlineClick">
          Outline Button
        </QkButton>
        <QkButton variant="ghost" @click="handleGhostClick">
          Ghost Button
        </QkButton>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
        <QkButton size="small">Small Button</QkButton>
        <QkButton size="medium">Medium Button</QkButton>
        <QkButton size="large">Large Button</QkButton>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <QkButton disabled>Disabled Button</QkButton>
        <QkButton variant="primary" type="submit">Submit Button</QkButton>
      </div>
    </section>
  </div>
</template>

<script>
import { Button as QkButton } from 'quanta-kit-vue'

export default {
  name: 'App',
  components: {
    QkButton
  },
  methods: {
    handlePrimaryClick() {
      alert('Primary button clicked!')
    },
    handleSecondaryClick() {
      alert('Secondary button clicked!')
    },
    handleOutlineClick() {
      alert('Outline button clicked!')
    },
    handleGhostClick() {
      alert('Ghost button clicked!')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
