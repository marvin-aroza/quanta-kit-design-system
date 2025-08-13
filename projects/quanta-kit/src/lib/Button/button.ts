import React from 'react';

type ButtonProps = {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label !== undefined ? label : 'Default Label'}
    </button>
  );
}

export default Button;