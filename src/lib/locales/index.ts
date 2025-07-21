/**
 * Locale definition for the date picker component.
 */
export interface DatePickerLocale {
  /** Full month names, starting from January. */
  monthNames: string[];
  /** Abbreviated month names, starting from Jan. */
  monthNamesShort: string[];
  /** Full day names, starting from Sunday. */
  dayNames: string[];
  /** Abbreviated day names, starting from Sun. */
  dayNamesShort: string[];
  /** Minimal day names (1-2 letters), starting from Sunday. */
  dayNamesMin: string[];
  /** Date display format for this locale (date-fns compatible). */
  dateFormat: string;
  /** First day of the week (0 = Sunday, 1 = Monday). */
  firstDayOfWeek: number;
  /**
   * Texts for UI labels and ARIA attributes.
   */
  texts: {
	/** Label for month selection dropdown. */
	selectMonth: string;
	/** Label for year selection dropdown. */
	selectYear: string;
	/** ARIA label for previous month button. */
	previousMonth: string;
	/** ARIA label for next month button. */
	nextMonth: string;
	/** Label for today button. */
	today: string;
	/** ARIA label for selected date. */
	selected: string;
	/** Placeholder for the date input. */
	datePlaceholder: string;
	/** ARIA label for the date input. */
	dateLabel: string;
  };
}

/**
 * French locale for the date picker component.
 */
export const frLocale: DatePickerLocale = {
	monthNames: [
		"janvier", "février", "mars", "avril", "mai", "juin",
		"juillet", "août", "septembre", "octobre", "novembre", "décembre"
	],
	monthNamesShort: [
		"jan", "fév", "mar", "avr", "mai", "juin",
		"juil", "août", "sep", "oct", "nov", "déc"
	],
	dayNames: [
		"dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
	],
	dayNamesShort: [
		"dim", "lun", "mar", "mer", "jeu", "ven", "sam"
	],
	dayNamesMin: [
		"D", "L", "M", "M", "J", "V", "S"
	],
	dateFormat: "dd/MM/yyyy",
	firstDayOfWeek: 1, // Lundi
	texts: {
		selectMonth: "Sélectionner le mois",
		selectYear: "Sélectionner l'année",
		previousMonth: "Mois précédent",
		nextMonth: "Mois suivant",
		today: "aujourd'hui",
		selected: "sélectionné",
		datePlaceholder: "JJ/MM/AAAA",
		dateLabel: "Sélecteur de date"
	}
};

/**
 * English locale for the date picker component.
 */
export const enLocale: DatePickerLocale = {
	monthNames: [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	],
	monthNamesShort: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	],
	dayNames: [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	dayNamesShort: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
	],
	dayNamesMin: [
		"S", "M", "T", "W", "T", "F", "S"
	],
	dateFormat: "MM/dd/yyyy",
	firstDayOfWeek: 0, // Sunday
	texts: {
		selectMonth: "Select month",
		selectYear: "Select year",
		previousMonth: "Previous month",
		nextMonth: "Next month",
		today: "today",
		selected: "selected",
		datePlaceholder: "MM/DD/YYYY",
		dateLabel: "Date picker"
	}
};

/**
 * Map of supported locales for the date picker.
 */
export const locales: Record<string, DatePickerLocale> = {
  fr: frLocale,
  en: enLocale
};

/**
 * Returns the locale object for the given locale code.
 * Defaults to French if the locale is not found.
 *
 * @param locale - Locale code ('fr' or 'en').
 * @returns The corresponding DatePickerLocale object.
 */
export function getLocale(locale: string = "fr"): DatePickerLocale {
  return locales[locale] || frLocale;
}
