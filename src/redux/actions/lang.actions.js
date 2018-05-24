export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';

export function selectLanguage(lang) {
  return {type: SELECT_LANGUAGE, lang};
}