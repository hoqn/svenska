const COLOR_SCHEME_NAME = "color-scheme";

type ColorScheme = "dark" | "light";

function isColorScheme(colorScheme: any): colorScheme is ColorScheme {
  return colorScheme === "dark" || colorScheme === "light";
}

export function toggleColorScheme() {
  const scheme: ColorScheme = getColorScheme() === "dark" ? "dark" : "light";
  setColorScheme(scheme);
  return scheme;
}

export function setColorScheme(colorScheme: ColorScheme | null) {
  if (window?.localStorage) {
    if (isColorScheme(colorScheme)) window.localStorage.setItem(COLOR_SCHEME_NAME, colorScheme);
    else window.localStorage.removeItem(COLOR_SCHEME_NAME);
  }
}

export function getColorScheme(): ColorScheme {
  if (window?.localStorage) {
    const scheme = window.localStorage.getItem(COLOR_SCHEME_NAME);

    if (isColorScheme(scheme))
      return scheme;
  }

  return "light";
}
