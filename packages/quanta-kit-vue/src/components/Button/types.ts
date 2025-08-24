export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: ButtonType;
  /**
   * Optional CSS class
   */
  class?: string;
}
