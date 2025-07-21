import { useState, useRef, useEffect } from "react";
import styles from "./HrnetDatePicker.module.css";
import { type HrnetDatePickerProps } from "./types";
import { format } from "date-fns";
import { HrnetCalendarGrid } from "./components/HRnetCalendarGrid";
import { HRnetCalendarHeader } from "./components/HRnetCalendarHeader";
import { classNames } from "./utils/classNames";
import { getLocale } from "./locales";

/**
 * Accessible, localized and customizable date picker for React.
 *
 * @component
 * @param value The currently selected date (or null)
 * @param onChange Callback called when a date is selected
 * @param label Label displayed above the input (optional, auto from locale if not set)
 * @param placeholder Input placeholder (optional, auto from locale if not set)
 * @param locale Display language and format ("fr" or "en", default: "fr")
 * @param variant Visual theme ("light" | "dark")
 * @param disabled Disables the input and calendar
 * @param error Error message to display
 * @param minDate Minimum selectable date
 * @param maxDate Maximum selectable date
 * @param dateFormat Custom display format (default: locale format)
 * @param className Custom CSS class for the input
 * @param wrapperClassName Custom CSS class for the wrapper
 * @param id HTML id for the input (overrides auto-generated id)
 * @param name HTML name for the input
 * @param ...rest Any other standard input props (autoFocus, onBlur, etc.)
 *
 * @example
 * <HrnetDatePicker
 *   value={date}
 *   onChange={setDate}
 *   locale="en"
 *   label="Birth date"
 *   name="birthDate"
 *   autoFocus
 * />
 */
export function HrnetDatePicker({
	value,
	onChange,
	label,
	placeholder,
	disabled = false,
	error,
	className,
	wrapperClassName,
	locale = "fr",
	dateFormat,
	...rest
}: HrnetDatePickerProps) {
	const localeData = getLocale(locale);
	const actualDateFormat = dateFormat || localeData.dateFormat;
	const actualPlaceholder = placeholder || localeData.texts.datePlaceholder;
	const actualLabel = label || localeData.texts.dateLabel;
	const [showCalendar, setShowCalendar] = useState(false);
	const [selected, setSelected] = useState<Date | null>(value);
	const [viewMonth, setViewMonth] = useState<Date>(() => 
		value || new Date()
	);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);
	const id = crypto.randomUUID();

	
	useEffect(() => {
		setSelected(value);
		if (value) {
			setViewMonth(value);
		}
	}, [value]);

	const handleInputFocus = () => {
		setShowCalendar(true);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case 'Escape':
				setShowCalendar(false);
				inputRef.current?.focus();
				break;
			case 'Enter':
			case ' ':
				if (!showCalendar) {
					event.preventDefault();
					setShowCalendar(true);
				}
				break;
			case 'Tab':
				if (showCalendar && !event.shiftKey) {
					// Let Tab navigate through the calendar
				}
				break;
		}
	};

	const previousMonth = () => {
		setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
	};

	const nextMonth = () => {
		setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
	};

	const handleMonthYearChange = (date: Date) => {
		setViewMonth(date);
	};

	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node) &&
				calendarRef.current &&
				!calendarRef.current.contains(event.target as Node)
			) {
				setShowCalendar(false);
			}
		};

		if (showCalendar) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showCalendar]);

	const handleDateClick = (date: Date) => {
		setSelected(date);
		onChange(date);
		setShowCalendar(false);
	};

	return (
		<div className={classNames(styles.wrapper, wrapperClassName)} ref={wrapperRef}>
			{actualLabel && (
				<label htmlFor={id} className={styles.label}>
					{actualLabel}
				</label>
			)}

			<div className={styles.datepickerWrapper}>
			   <input
				   ref={inputRef}
				   id={id}
				   className={classNames(styles.input, error && styles.error, className)}
				   value={selected ? format(selected, actualDateFormat) : ""}
				   placeholder={actualPlaceholder}
				   onFocus={handleInputFocus}
				   onKeyDown={handleKeyDown}
				   readOnly
				   disabled={disabled}
				   aria-label={actualLabel}
				   aria-expanded={showCalendar}
				   aria-haspopup="dialog"
				   role="combobox"
				   {...rest}
			   />

				{showCalendar && (
					<div
						ref={calendarRef}
						className={styles.dropdown}
						role="dialog"
						aria-label="Calendrier de sélection de date"
						aria-modal="false"
						style={{
							position: "absolute",
							top: "100%",
							left: "0",
							width: "100%",
							zIndex: 1000,
						}}
					>
						<HRnetCalendarHeader
							currentMonth={viewMonth}
							onPrevMonth={previousMonth}
							onNextMonth={nextMonth}
							onMonthYearChange={handleMonthYearChange}
							locale={locale}
						/>
						<HrnetCalendarGrid 
							date={viewMonth} 
							selectedDate={selected}
							onDayClick={handleDateClick}
							locale={locale}
						/>
					</div>
				)}
			</div>

			{error && <div className={styles.errorText}>{error}</div>}
		</div>
	);
}
