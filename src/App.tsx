import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import SheetViewer from "./components/SheetViewer";
import SignIn from "./components/SignIn";
import { useGoogleAuth } from "./contexts/GoogleAuthContext";
import { fetchUserSheets, type GoogleSheet } from "./api/sheetsApi";
import type { SheetLink } from "./sheets";

export default function App() {
  const { isSignedIn, accessToken } = useGoogleAuth();
  const [sheets, setSheets] = useState<SheetLink[]>([]);
  const [active, setActive] = useState<SheetLink | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && accessToken) {
      setLoading(true);
      setError(null);
      fetchUserSheets(accessToken)
        .then((googleSheets: GoogleSheet[]) => {
          const sheetLinks = googleSheets.map((sheet) => ({
            id: sheet.id,
            name: sheet.name,
          }));
          setSheets(sheetLinks);
          if (sheetLinks.length > 0) {
            setActive(sheetLinks[0]);
          }
        })
        .catch((err) => {
          console.error("Error fetching sheets:", err);
          setError("Failed to load your sheets. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isSignedIn, accessToken]);

  if (!isSignedIn) {
    return <SignIn />;
  }

  return (
    <div className="app">
      <Header />

      <div className="layout">
        {loading ? (
          <div className="loadingSheets">
            <div className="spinner" />
            <div>Loading your sheets...</div>
          </div>
        ) : error ? (
          <div className="errorMessage">{error}</div>
        ) : sheets.length === 0 ? (
          <div className="noSheets">
            No spreadsheets found in your Google Drive
          </div>
        ) : (
          <>
            <Sidebar
              sheets={sheets}
              activeId={active?.id || ""}
              onSelect={setActive}
            />

            {active && <SheetViewer sheetId={active.id} />}
          </>
        )}
      </div>

      <Footer text="Google Sheets Viewer" />
    </div>
  );
}
