export default function getWeekday(isoWeekdayNumber, short) {
	if (short) {
		switch (isoWeekdayNumber) {
			case 1: return 'MO';
			case 2: return 'DI';
			case 3: return 'MI';
			case 4: return 'DO';
			case 5: return 'FR';
			case 6: return 'SA';
			case 7: return 'SO';
			default: return 'XX';
		}
	} else {
		switch (isoWeekdayNumber) {
			case 1: return 'Montag';
			case 2: return 'Dienstag';
			case 3: return 'Mittwoch';
			case 4: return 'Donnerstag';
			case 5: return 'Freitag';
			case 6: return 'Samstag';
			case 7: return 'Sonntag';
			default: return 'XXXXX';
		}
	}
}