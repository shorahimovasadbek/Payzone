export const translate = (item, slug, lang) => {
  if (lang === "en") {
    lang = "eng";
  }

  return item[slug + "_" + lang];
};
