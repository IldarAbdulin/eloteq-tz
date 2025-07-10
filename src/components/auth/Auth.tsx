import { API_URIS } from '../../constants/api-uris';
import GitHubLogo from '../../shared/assets/GitHubLogo';

const Auth = () => {
  const handleLogin = () => {
    const githubAuthUrl = API_URIS.AUTH_URL;
    window.location.href = githubAuthUrl;
  };

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <button
        onClick={handleLogin}
        className="flex items-center gap-2 border rounded border-white p-3 cursor-pointer bg-gray-900 duration-300 hover:bg-gray-800/30"
      >
        Авторизоваться с помощью GitHub <GitHubLogo />
      </button>
    </section>
  );
};

export default Auth;
