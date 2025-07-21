import { useState } from "react";
import { HrnetDatePicker } from "./lib";

export default function App() {
	const [date, setDate] = useState<Date | null>(null);
	const [dateEn, setDateEn] = useState<Date | null>(null);
	const [locale, setLocale] = useState<"fr" | "en">("fr");

	return (
		<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h1>Test HRnet DatePicker - Localisation</h1>

			<div style={{ marginBottom: "2rem" }}>
				<label style={{ marginRight: "1rem" }}>
					<input
						type="radio"
						value="fr"
						checked={locale === "fr"}
						onChange={(e) => setLocale((e.target as HTMLInputElement).value as "fr" | "en")}
					/>{" "}
					Français
				</label>
				<label>
					<input
						type="radio"
						value="en"
						checked={locale === "en"}
						onChange={(e) => setLocale((e.target as HTMLInputElement).value as "fr" | "en")}
					/>{" "}
					English
				</label>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
				<div>
					<h3>Locale Française</h3>
					<HrnetDatePicker value={date} onChange={setDate} label="Date de naissance" locale="fr" />
					<p>Date sélectionnée : {date ? date.toLocaleDateString("fr-FR") : "Aucune"}</p>
				</div>

				<div>
					<h3>English Locale</h3>
					<HrnetDatePicker value={dateEn} onChange={setDateEn} label="Birth Date" locale="en" />
					<p>Selected date: {dateEn ? dateEn.toLocaleDateString("en-US") : "None"}</p>
				</div>
			</div>

			<div style={{ marginTop: "2rem" }}>
				<h3>Locale Dynamique : {locale === "fr" ? "Français" : "English"}</h3>
				<HrnetDatePicker
					value={locale === "fr" ? date : dateEn}
					onChange={locale === "fr" ? setDate : setDateEn}
					locale={locale}
				/>
			</div>
		</div>
	);
}
