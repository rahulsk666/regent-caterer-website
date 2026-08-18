import type { MouseEvent } from "react";

export function scrollToSection(id: string) {
  return (e: MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `/#${id}`);
    }
  };
}
