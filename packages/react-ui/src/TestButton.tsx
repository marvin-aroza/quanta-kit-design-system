import React from 'react';
import { Button } from './Button';

// Simple test component to verify Button renders
export const TestButton = () => {
  return (
    <div>
      <h2>Button Component Test</h2>
      <Button variant="primary">Primary Button</Button>
      <br /><br />
      <Button variant="secondary">Secondary Button</Button>
      <br /><br />
      <Button variant="success">Success Button</Button>
      <br /><br />
      <Button disabled>Disabled Button</Button>
    </div>
  );
};
