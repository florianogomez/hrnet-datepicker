import styles from "./HRnetCalendarDay.module.scss";
import { getLocale } from "../locales";

/**
 * Props for the HRnetCalendarDay component.
 */
export interface HrnetCalendarDayProps {
  /** The date represented by this day cell. */
  date: Date;
  /** Whether this day is currently selected. */
  isSelected: boolean;
  /** Callback fired when the day is clicked. */
  onClick: (date: Date) => void;
  /** If true, disables the day button. */
  disabled?: boolean;
  /** The current month displayed in the calendar (used to style days outside the month). */
  currentMonth?: Date;
  /** Locale code for date formatting ('fr' or 'en'). */
  locale?: "fr" | "en";
}

/**
 * Renders a single day cell in the calendar grid.
 * Handles selection, keyboard navigation, and accessibility.
 *
 * @param props - HrnetCalendarDayProps
 */
export const HRnetCalendarDay = ({
  date,
  isSelected,
  onClick,
  disabled,
  currentMonth = new Date(),
  locale = "fr",
}: HrnetCalendarDayProps) => {
  const localeData = getLocale(locale);
  const isToday = new Date().toDateString() === date.toDateString();
  const notInMonth = date.getMonth() !== currentMonth?.getMonth();

  const handleClick = () => {
	if (!disabled) {
	  onClick(date);
	}
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
	if (event.key === 'Enter' || event.key === ' ') {
	  event.preventDefault();
	  handleClick();
	}
  };

  /**
   * ARIA label for accessibility, including day, month, year, and state.
   */
  const ariaLabel = `${date.getDate()} ${localeData.monthNames[date.getMonth()]} ${date.getFullYear()}${isToday ? `, ${localeData.texts.today}` : ''}${isSelected ? `, ${localeData.texts.selected}` : ''}`;

  return (
	<button
	  onClick={handleClick}
	  onKeyDown={handleKeyDown}
	  disabled={disabled}
	  aria-label={ariaLabel}
	  aria-pressed={isSelected}
	  tabIndex={isSelected ? 0 : -1}
	  type="button"
	  className={`${styles.calendarDay} ${isSelected ? styles.selected : ""} ${
		disabled ? styles.disabled : ""
	  } ${isToday ? styles.today : ""} ${notInMonth ? styles.notInMonth : ""}`}
	>
	  {date.getDate()}
	</button>
  );
};
