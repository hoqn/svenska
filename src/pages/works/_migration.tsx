import { useEffect, useRef, useState } from "react";

export default function PortfolioMigrationAlert() {
  const [open, setOpen] = useState<boolean>(true);

  const timeDisplayRef = useRef<HTMLSpanElement>(null);
  const time = useRef<number>(3);
  const intervalHandle = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalHandle.current = setInterval(() => {
      time.current--;

      if (timeDisplayRef.current)
        timeDisplayRef.current.innerText = `${time.current}`;

      if (time.current <= 0) {
        clearInterval(intervalHandle.current);
        window.location.href =
          "https://hoqn.notion.site/8a92985f1b1946f485e0969146f4b3b4";
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        clearInterval(intervalHandle.current);
        setOpen(false);
      }
    };

    window.document.addEventListener("keydown", handler);

    return () => void window.document.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        inset: "0",
        zIndex: "99",
        color: "white",
      }}
    >
      <div
        style={{
          zIndex: "0",
          position: "absolute",
          inset: "0",
          backgroundColor: "rgba(0, 0, 0, .75)",
          backdropFilter: "blur(16px)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: `var(--grass2)`,
            border: "1px solid var(--grass6)",
            color: `var(--grass12)`,
            borderRadius: ".5rem",
            overflow: "hidden",
            lineHeight: "1.5",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--grass9)",
              color: "var(--grass1)",
              padding: "1rem",
            }}
          >
            <p style={{ fontWeight: "bold" }}>
              죄송합니다.
              <br />이 페이지는 내용을 더 보충하여{" "}
              <a
                style={{ color: `inherit`, textDecoration: `underline` }}
                href="https://hoqn.notion.site/8a92985f1b1946f485e0969146f4b3b4"
              >
                여기
              </a>
              로 이전하고 있습니다.
            </p>
          </div>

          <div style={{ padding: "1rem", fontSize: ".875rem" }}>
            <p>
              <span ref={timeDisplayRef}>{time.current}</span>초 후 자동으로
              이동됩니다...
            </p>
            <p style={{ marginTop: "2rem" }}>
              위 링크를 확인해주시면 감사하겠습니다.
              <br />
              불편을 드려 죄송합니다.
            </p>
          </div>
        </div>
        <p
          style={{
            marginTop: `1rem`,
            fontSize: `.875em`,
            textAlign: "center",
            opacity: 0.5,
          }}
        >
          <button
            role="button"
            onClick={() => {
              clearInterval(intervalHandle.current);
              setOpen(false);
            }}
            style={{
              all: "unset",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            기존 페이지 보기
          </button>
        </p>
      </div>
    </div>
  );
}
