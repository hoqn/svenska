"use client";

import LogoGithub from "@/icons/logo-github.svg?raw&react";
import LogoVercel from "@/icons/logo-vercel.svg?raw&react";
import LogoGooglePlay from "@/icons/logo-google-playstore.svg?raw&react";
import type { Work } from "@/data/works";
import { useMemo, type SVGProps } from "react";

import $ from "./WorkCard.module.scss";

const LinkIcon = ({
  url,
  ...props
}: {
  url: string;
} & SVGProps<SVGSVGElement>) => {
  const hostname = new URL(url).hostname.replace("www", "");

  if (/github/.test(hostname)) {
    // return LogoGithub.src;
    return <LogoGithub {...props} />;
  } else if (/vercel/.test(hostname)) {
    // return LogoVercel.src;
    return <LogoVercel {...props} />;
  } else if (/^play.google/.test(hostname)) {
    // return LogoGooglePlay.src;
    return <LogoGooglePlay {...props} />;
  } else {
    return null;
  }
};

export type Props = Work & { href?: string };

export default function WorkCard({
  title,
  icon,
  summary,
  roles: rolesRaw = [],
  stacks = [],
  startDate,
  endDate,
  href,
  links = {},
}: Props) {
  const dateString = useMemo(
    () =>
      [startDate, endDate]
        .filter(Boolean)
        .map((it) => (typeof it === "string" ? it : it?.toDateString()))
        .join(" — "),
    [startDate, endDate],
  );

  const roles = useMemo(() => {
    if (Array.isArray(rolesRaw)) return rolesRaw;
    else return [rolesRaw];
  }, [rolesRaw]);

  return (
    <div className={$.root}>
      {/* Head */}
      <div className={$.head}>
        <h3 className={$.title}>
          <>
            {icon && (
              <span className={$.icon}>
                {typeof icon === "string" ? (
                  icon
                ) : (
                  <img src={icon.src} alt={title} loading="lazy" />
                )}
              </span>
            )}
            <span>{title}</span>
          </>
        </h3>
        <div className={$.subdata}>
          <div className={$.subdata__row}>
            <div className={$.date}>{dateString}</div>
            <div className={$.roles}>
              {roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
          <div className={$.stacks}>
            {stacks.map((stack) => (
              <span className={$.stack} key={stack}>
                {stack}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={`${$.body} markdown-body`}>{summary}</div>
      <div className={$.footer}>
        <div className={$.links}>
          {Object.entries(links).map(([name, href], i) => (
            <a className={$.link} key={i} href={href}>
              {/* <LogoGithub /> */}
              <LinkIcon
                className={$.link__icon}
                url={href}
                width={16}
                height={16}
              />
              {name}
            </a>
          ))}
        </div>
        {href && (
          <a href={href} className={$["more-button"]}>
            더 많은 이야기
          </a>
        )}
      </div>
    </div>
  );
}
