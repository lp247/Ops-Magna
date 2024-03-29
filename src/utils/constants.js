import moment from 'moment';

export const FONT_COLOR = 'rgb(184, 184, 184)';
export const BACKGROUND_COLOR = 'rgb(33, 34, 37)';
export const INPUT_BACKGROUND_COLOR = 'rgb(43, 44, 47)';
// export const accentcolor = 'rgb(111, 178, 156)';
// export const accentcolor = '#6BB2B0';
// export const ACCENT_OCEAN = '#279EB2';
// export const ACCENT_PURPLE = '#8C21BF';
// export const ACCENT_GREEN = '#27B26F';
// export const ACCENT_GOLD = '#FEB82B';
export const ACCENT_GREY = '#939393';
// export const ACCENT_COLOR = 'rgba(39, 158, 178, 1.0)';
export const ACCENT_COLOR = 'rgba(201, 167, 50, 1.0)'; // #C9A732
export const ACCENT_COLOR_DARKER = '#937a24';
export const ACCENT_COLOR_OPACITY_07 = ACCENT_COLOR.replace('1.0', '0.7');
export const ACCENT_COLOR_OPACITY_05 = ACCENT_COLOR.replace('1.0', '0.5');
export const ACCENT_COLOR_OPACITY_03 = ACCENT_COLOR.replace('1.0', '0.3');
export const TRANSPARENT = 'rgba(0, 0, 0, 0)';

export const DAY_CHANGE_HOUR = 4;
export const EVENT_FORECAST_DAYS = 7;
export const NOTIFICATION_START_MINUTES = 60;
export const NOTIFICATION_END_MINUTES = 15;

export const TRANSLATED_DATE = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');