import { useEffect, useState } from 'react';
import useDebounce from '../../shared/hooks/useDebounce';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getUsers,
  setPage,
  setQuery,
} from '../../store/slice/users/users-slice';
import { PaginationControls } from '../../shared/ui/CustomPaginationControls';
import { DYNAMIC_PAGES } from '../../config/page.config';

const UsersSearch = () => {
  const { users, totalCount, query, loading, error, page } = useAppSelector(
    ({ users }) => users
  );
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(query);
  const debouncedInput = useDebounce(inputValue, 1000);

  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    if (urlPage !== page) {
      dispatch(setPage(urlPage));
    }
    setInputValue(urlQuery);
  }, [searchParams]);

  useEffect(() => {
    if (debouncedInput.trim()) {
      dispatch(getUsers({ query: debouncedInput, page }));
      const search = new URLSearchParams({
        search: debouncedInput,
        page: String(page),
      }).toString();
      navigate(`${location.pathname}?${search}`, { replace: false });
    } else {
      dispatch(setQuery(''));
      dispatch(setPage(1));
      navigate(location.pathname, { replace: false });
    }
  }, [debouncedInput, page, dispatch, navigate, location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <main className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Поиск пользователей
      </h1>
      <input
        type="text"
        placeholder="Введите имя пользователя"
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 rounded border w-full mb-4"
      />
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && query.trim() && (
        <>
          <p className="mb-4 text-gray-500">
            Найдено: {totalCount} пользователей
          </p>

          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="border rounded p-3">
                <Link
                  to={DYNAMIC_PAGES.USER_DETAIL(user.login)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {user.login}
                </Link>
              </li>
            ))}
          </ul>

          {totalCount > 10 && (
            <PaginationControls
              currentPage={page}
              onPageChange={(newPage) => dispatch(setPage(newPage))}
              disablePrev={page <= 1}
              disableNext={page * 10 >= totalCount}
            />
          )}
        </>
      )}
    </main>
  );
};

export default UsersSearch;
