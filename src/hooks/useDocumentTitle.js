import { useEffect } from "react";

const SITE = "Glover, Mast & Purl LLP";

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    const prev = document.title;
    document.title = pageTitle ? `${pageTitle} — ${SITE}` : `${SITE} — Counsel for Those Who Cannot Speak for Themselves`;
    return () => { document.title = prev; };
  }, [pageTitle]);
}
