import LogoGithub from "@/icons/logo-github.svg?raw&react";
import LogoVercel from "@/icons/logo-vercel.svg?raw&react";
import LogoGooglePlay from "@/icons/logo-google-playstore.svg?raw&react";

export function getLinkIcon(url: string) {
  const hostname = new URL(url).hostname.replace("www", "");

  if (/github/.test(hostname)) {
    return LogoGithub;
  } else if (/vercel/.test(hostname)) {
    return LogoVercel;
  } else if (/^play.google/.test(hostname)) {
    return LogoGooglePlay;
  } else {
    return null;
  }
}
