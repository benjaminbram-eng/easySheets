import { useEffect, useMemo, useState } from "react";

type Props = {
  sheetId: string;
};

export default function SheetViewer({ sheetId }: Props) {
  const [loading, setLoading] = useState(true);

  const src = useMemo(() => {
    return `https://docs.google.com/spreadsheets/d/${sheetId}/edit?embedded=true`;
  }, [sheetId]);

  useEffect(() => {
    setLoading(true);
  }, [sheetId]);

  return (
    <main className="content">
      {loading && (
        <div className="loader">
          <div className="spinner" />
          <div>Loading…</div>
          <div className="loaderSub">
            If you see view-only, make sure you are logged into Google and have
            edit access.
          </div>
        </div>
      )}

      <iframe
        key={sheetId}
        title="Google Sheet"
        src={src}
        className="sheetIframe"
        onLoad={() => setLoading(false)}
        allow="clipboard-read; clipboard-write"
      />
    </main>
  );
}
