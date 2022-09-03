import Authorization from "../components/Authorization/Authorization";
import UserGuard from "../guards/UserGuard";

function AuthPage() {
  return (
    <UserGuard>
      <Authorization />
    </UserGuard>
  );
}

export default AuthPage;
