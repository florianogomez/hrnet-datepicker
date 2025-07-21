import styles from "./HRnetCalendarHeader.module.scss";
import { getLocale } from "../locales";

/**
 * Props for the HRnetCalendarHeader component.
 */
export interface HrnetCalendarHeaderProps {
  /** The current month displayed in the calendar. */
  currentMonth: Date | null;
  /** Callback fired when the previous month button is clicked. */
  onPrevMonth: () => void;
  /** Callback fired when the next month button is clicked. */
  onNextMonth: () => void;
  /** Callback fired when the month or year is changed via dropdown. */
  onMonthYearChange?: (date: Date) => void;
  /** Locale code for month/year labels ('fr' or 'en'). */
  locale?: "fr" | "en";
}

/**
 * Renders the calendar header with month/year selectors and navigation buttons.
 * Handles locale-aware labels and accessibility.
 *
 * @param props - HrnetCalendarHeaderProps
 */
export const HRnetCalendarHeader = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onMonthYearChange,
  locale = "fr",
}: HrnetCalendarHeaderProps) => {
  const currentDate = currentMonth || new Date();
  const localeData = getLocale(locale);

  // Generate month options using locale
  const months = localeData.monthNames.map((name, index) => ({
	value: index,
	label: name
  }));

  // Generate year options (10 years before and after current year)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => {
	const year = currentYear - 10 + i;
	return { value: year, label: year.toString() };
  });

  /**
   * Handles month dropdown change.
   */
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	const newMonth = parseInt((event.target as HTMLSelectElement).value);
	if (onMonthYearChange) {
	  const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
	  onMonthYearChange(newDate);
	}
  };

  /**
   * Handles year dropdown change.
   */
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	const newYear = parseInt((event.target as HTMLSelectElement).value);
	if (onMonthYearChange) {
	  const newDate = new Date(newYear, currentDate.getMonth(), 1);
	  onMonthYearChange(newDate);
	}
  };

  return (
	<div className={styles.calendarHeader}>
	  <button 
		className={styles.prevButton} 
		onClick={onPrevMonth}
		aria-label={localeData.texts.previousMonth}
		type="button"
	  >
		&lt;
	  </button>

	  <div className={styles.monthYearSelectors}>
		<select 
		  className={styles.monthSelector}
		  value={currentDate.getMonth()}
		  onChange={handleMonthChange}
		  aria-label={localeData.texts.selectMonth}
		>
		  {months.map(month => (
			<option key={month.value} value={month.value}>
			  {month.label}
			</option>
		  ))}
		</select>

		<select 
		  className={styles.yearSelector}
		  value={currentDate.getFullYear()}
		  onChange={handleYearChange}
		  aria-label={localeData.texts.selectYear}
		>
		  {years.map(year => (
			<option key={year.value} value={year.value}>
			  {year.label}
			</option>
		  ))}
		</select>
	  </div>

	  <button 
		className={styles.nextButton} 
		onClick={onNextMonth}
		aria-label={localeData.texts.nextMonth}
		type="button"
	  >
		&gt;
	  </button>
	</div>
  );
};

