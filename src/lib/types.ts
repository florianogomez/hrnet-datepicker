import { type InputHTMLAttributes } from "react";

/**
 * Props for the HrnetDatePicker React component.
 * Extends all standard input props except value, onChange, and type.
 */
export interface HrnetDatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  /**
   * The currently selected date value.
   * Pass `null` for no selection.
   */
  value: Date | null;

  /**
   * Callback fired when a date is selected or cleared.
   * @param date The selected date, or `null` if cleared.
   */
  onChange: (date: Date | null) => void;

  /**
   * Label displayed above the input field.
   */
  label?: string;

  /**
   * Placeholder text for the input field.
   */
  placeholder?: string;

  /**
   * Locale for date display and calendar UI.
   * Supported: 'fr' (French), 'en' (English). Defaults to 'en'.
   */
  locale?: "fr" | "en";

  /**
   * Visual variant of the component: 'light' or 'dark'.
   * Defaults to 'light'.
   */
  variant?: "light" | "dark";

  /**
   * If true, disables the date picker input and calendar.
   */
  disabled?: boolean;

  /**
   * Error message to display below the input.
   */
  error?: string;

  /**
   * Minimum selectable date (inclusive).
   */
  minDate?: Date;

  /**
   * Maximum selectable date (inclusive).
   */
  maxDate?: Date;

  /**
   * Custom date display format (overrides locale default).
   * Example: 'dd/MM/yyyy'.
   */
  dateFormat?: string;

  /**
   * Custom CSS class for the input element.
   */
  className?: string;

  /**
   * Custom CSS class for the main wrapper element.
   */
  wrapperClassName?: string;

  /**
   * HTML id for the input (overrides auto-generated id).
   */
  id?: string;

  /**
   * HTML name for the input.
   */
  name?: string;
}
