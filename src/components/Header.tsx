import { useGoogleAuth } from "../contexts/GoogleAuthContext";

type Props = { title?: string };

export default function Header({ title = "My Google Sheets" }: Props) {
  const { user, signOut } = useGoogleAuth();

  return (
    <header className="header">
      <div>{title}</div>
      {user && (
        <div className="userInfo">
          {user.picture && (
            <img src={user.picture} alt={user.name} className="userAvatar" />
          )}
          <span className="userName">{user.name}</span>
          <button onClick={signOut} className="signOutButton">
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}
