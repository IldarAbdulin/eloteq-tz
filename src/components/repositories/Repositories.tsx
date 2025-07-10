import { useEffect } from 'react';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import {
  VISIBILITY_PARAMS,
  type VisibilityType,
} from '../../constants/repositories';
import { getRepositories } from '../../store/slice/repositories/repisitories-slice';
import type { IRepository } from '../../types/repositories.interface';
import CustomLoader from '../../shared/ui/CustomLoader';
import ErrorTitle from '../../shared/ui/ErrorTitle';
import { useSearchParams } from 'react-router-dom';
import { PaginationControls } from '../../shared/ui/CustomPaginationControls';
import RepositoryItemList from '../../shared/ui/repositories/RepositoryItemList';

const Repositories = () => {
  const {
    public: publicRepositories,
    private: privateRepositories,
    error,
    loading,
    hasMore,
  } = useAppSelector(({ repositories }) => repositories);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab =
    (searchParams.get('type') as VisibilityType) || VISIBILITY_PARAMS.PUBLIC;
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getRepositories({ visibility: activeTab, page: currentPage }));
  }, [activeTab, currentPage, dispatch]);

  const handleTabChange = (tab: VisibilityType) => {
    setSearchParams({ type: tab, page: '1' });
    window.scrollTo({ top: 0 });
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ type: activeTab, page: String(nextPage) });
    window.scrollTo({ top: 0 });
  };

  const repos: IRepository[] | null =
    activeTab === VISIBILITY_PARAMS.PUBLIC
      ? publicRepositories
      : privateRepositories;
  if (loading) return <CustomLoader />;
  if (error) return <ErrorTitle error={error} />;
  if (repos)
    return (
      <main className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Репозитории
        </h1>
        <div className="flex gap-4 mb-6">
          {(['public', 'private'] as VisibilityType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-900'
              }`}
            >
              {tab === 'public' ? 'Публичные' : 'Приватные'}
            </button>
          ))}
        </div>
        {!loading && repos?.length === 0 && (
          <p className="text-white">Нет репозиториев в этой категории.</p>
        )}
        <ul className="space-y-4">
          {repos?.map((repo) => (
            <RepositoryItemList key={repo.id} repo={repo} />
          ))}
        </ul>
        {!loading && repos?.length !== 0 && (
          <PaginationControls
            currentPage={currentPage}
            onPageChange={handlePageChange}
            disablePrev={currentPage === 1}
            disableNext={!hasMore[activeTab]}
          />
        )}
      </main>
    );
};

export default Repositories;
