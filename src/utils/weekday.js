import {
	MondayShort,
	TuesdayShort,
	WednesdayShort,
	ThursdayShort,
	FridayShort,
	SaturdayShort,
	SundayShort,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
} from "./translations";

export default function getWeekday(isoWeekdayNumber, short, lang) {
	if (short) {
		switch (isoWeekdayNumber) {
			case 1: return MondayShort[lang];
			case 2: return TuesdayShort[lang];
			case 3: return WednesdayShort[lang];
			case 4: return ThursdayShort[lang];
			case 5: return FridayShort[lang];
			case 6: return SaturdayShort[lang];
			case 7: return SundayShort[lang];
			default: return 'XX';
		}
	} else {
		switch (isoWeekdayNumber) {
			case 1: return Monday[lang];
			case 2: return Tuesday[lang];
			case 3: return Wednesday[lang];
			case 4: return Thursday[lang];
			case 5: return Friday[lang];
			case 6: return Saturday[lang];
			case 7: return Sunday[lang];
			default: return 'XXXXX';
		}
	}
}