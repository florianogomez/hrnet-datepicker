
/**
 * Props for the HrnetCalendarGrid component.
 */
export interface HrnetCalendarGridProps {
  /** The month to display in the grid. */
  date: Date | null;
  /** Callback fired when a day is clicked. */
  onDayClick?: (date: Date) => void;
  /** The currently selected date. */
  selectedDate?: Date | null;
  /** Locale code for day and week labels ('fr' or 'en'). */
  locale?: "fr" | "en";
  /** Visual variant: 'light' or 'dark'. */
  variant?: "light" | "dark";
  /** If true, disables all days in the grid. */
  disabled?: boolean;
  /** Error message to display below the grid. */
  error?: string;
}

import { useEffect, useMemo, useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { HRnetCalendarDay } from "./HRnetCalendarDay";
import styles from "./HRnetCalendarGrid.module.scss";
import { createLogger } from "../../utils/logger";
import { getLocale } from "../locales";

const logger = createLogger("HrnetCalendarGrid");

/**
 * Handles click on a day cell and logs the event.
 * @param date - The clicked date
 * @param onDayClick - Optional callback
 */
const handleDayClick = (date: Date, onDayClick?: (date: Date) => void) => {
  logger.info("Day clicked", { date });
  onDayClick?.(date);
}

/**
 * Renders the calendar grid for a given month, including week headers and day cells.
 * Handles locale-aware week layout, selection, and error display.
 *
 * @param props - HrnetCalendarGridProps
 */
export function HrnetCalendarGrid({
  date,
  onDayClick,
  selectedDate,
  locale = "fr",
  variant = "light",
  disabled = false,
  error,
}: HrnetCalendarGridProps ) {

  const currentDate = useMemo(() => date || new Date(), [date]);
  const localeData = getLocale(locale);
  logger.info("Rendering calendar grid for date", { currentDate });
  const [startDate, setStartDate] = useState<Date>(startOfMonth(currentDate));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(currentDate));

  useEffect(() => {
	const start = startOfMonth(currentDate);
	const end = endOfMonth(currentDate);

	// Adjust according to locale's first day of week
	const firstDayOfWeek = localeData.firstDayOfWeek;
	while (start.getDay() !== firstDayOfWeek) {
	  start.setDate(start.getDate() - 1);
	}
	const lastDayOfWeek = (firstDayOfWeek + 6) % 7;
	while (end.getDay() !== lastDayOfWeek) {
	  end.setDate(end.getDate() + 1);
	}
	setStartDate(start);
	setEndDate(end);
  }, [currentDate, localeData.firstDayOfWeek]);

  /**
   * All days to display in the grid, including days from previous/next month.
   */
  const days = useMemo(() => eachDayOfInterval({ start: startDate, end: endDate }), [startDate, endDate]);

  /**
   * Weekday headers, reordered according to locale's first day of week.
   */
  const weekDays = useMemo(() => {
	const dayNames = localeData.dayNamesShort;
	const firstDay = localeData.firstDayOfWeek;
	return [
	  ...dayNames.slice(firstDay),
	  ...dayNames.slice(0, firstDay)
	];
  }, [localeData]);

  return (
	<div className={`${styles.calendarGrid} ${styles[variant]} ${error ? styles.error : ""}`}>
	  {/* Weekday headers */}
	  {weekDays.map((day) => (
		<div key={day} className={styles.weekDay} role="columnheader">
		  {day}
		</div>
	  ))}

	  {/* Day cells */}
	  {days.map((day) => (
		<HRnetCalendarDay
		  key={day.toISOString()}
		  date={day}
		  isSelected={selectedDate?.toDateString() === day.toDateString()}
		  onClick={() => handleDayClick(day, onDayClick)}
		  disabled={disabled}
		  currentMonth={currentDate}
		  locale={locale}
		/>
	  ))}
	</div>
  );
}

