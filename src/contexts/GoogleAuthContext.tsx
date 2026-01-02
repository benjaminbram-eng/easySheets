import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface GoogleAuthContextType {
  accessToken: string | null;
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  user: any;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(
  undefined
);

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const signIn = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope:
        "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly",
      callback: (response: any) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => setUser(data));
        }
      },
    });
    client.requestAccessToken();
  };

  const signOut = () => {
    if (accessToken) {
      google.accounts.oauth2.revoke(accessToken, () => {
        setAccessToken(null);
        setUser(null);
      });
    }
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        accessToken,
        isSignedIn: !!accessToken,
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error("useGoogleAuth must be used within GoogleAuthProvider");
  }
  return context;
}
