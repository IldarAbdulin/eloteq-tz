import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { getUser } from '../../store/slice/users/user-detail-slice';
import CustomLoader from '../../shared/ui/CustomLoader';
import ErrorTitle from '../../shared/ui/ErrorTitle';
import {
  getUserRepositories,
  setRepoPage,
} from '../../store/slice/users/user-repos-slice';
import RepositoryItemList from '../../shared/ui/repositories/RepositoryItemList';
import UserProfileHeader from '../../shared/ui/UserProfileHeader';
import { PaginationControls } from '../../shared/ui/CustomPaginationControls';

const UserDetailsPage = () => {
  const { username } = useParams();
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useAppSelector(({ userDetail }) => userDetail);
  const {
    repos,
    loading: reposLoading,
    error: reposError,
    page,
  } = useAppSelector(({ userRepositories }) => userRepositories);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (username) {
      dispatch(setRepoPage(1));
      setSearchParams({ page: '1' });
    }
  }, [username]);

  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;
    if (urlPage !== page) {
      dispatch(setRepoPage(urlPage));
    }
  }, [searchParams]);

  useEffect(() => {
    if (username) {
      dispatch(getUser({ username }));
      dispatch(getUserRepositories({ username, page }));
    }
  }, [username, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(setRepoPage(newPage));
    setSearchParams({ page: String(newPage) });
    window.scrollTo({ top: 0 });
  };

  if (userError) return <ErrorTitle error={userError} />;
  if (userLoading) return <CustomLoader />;
  if (user)
    return (
      <main className="p-6">
        <UserProfileHeader user={user} />
        <h3 className="mt-4 text-lg font-semibold mb-3">
          Публичные репозитории:
        </h3>
        {reposError && <ErrorTitle error={reposError} />}
        {reposLoading ? (
          <CustomLoader />
        ) : (
          <ul className="space-y-4">
            {repos?.map((repo) => (
              <RepositoryItemList key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
        <PaginationControls
          currentPage={page}
          onPageChange={handlePageChange}
          disablePrev={page === 1}
          disableNext={repos.length < 30}
        />
      </main>
    );
};

export default UserDetailsPage;
