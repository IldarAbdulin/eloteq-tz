import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GitHubLogo from '../../shared/assets/GitHubLogo';
import { showErrorToast } from '../../shared/utils/toast-utils';
import { exchangeCodeForToken } from '../../store/slice/auth/auth-slice';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { PAGES } from '../../config/page.config';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code) {
      navigate(PAGES.AUTH);
      return;
    }

    dispatch(exchangeCodeForToken(code))
      .unwrap()
      .then(() => navigate(PAGES.PROFILE))
      .catch((err) => {
        showErrorToast(err || 'Ошибка при получении токена');
        navigate(PAGES.AUTH);
      });
  }, [location.search]);

  return (
    <section className="flex items-center justify-center h-[100vh]">
      <div className="flex items-center gap-2 border rounded border-white p-3 cursor-pointer bg-gray-900 duration-300 hover:bg-gray-800/30">
        <p>Идет авторизация...</p> <GitHubLogo />
      </div>
    </section>
  );
};

export default AuthCallback;
