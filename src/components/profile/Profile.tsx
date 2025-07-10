import { useEffect } from 'react';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { getUserProfile } from '../../store/slice/profile/profile-slice';
import CustomLoader from '../../shared/ui/CustomLoader';
import ProfileStatic from './ProfileStatic';
import ProfileEdit from './ProfileEdit';
import ErrorTitle from '../../shared/ui/ErrorTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Profile = () => {
  const { userProfile, loading, error } = useAppSelector(
    ({ userProfile }) => userProfile
  );
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditing = searchParams.get('edit') === 'true';

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleSetEditing = (edit: boolean) => {
    const search = new URLSearchParams();
    if (edit) {
      search.set('edit', 'true');
    }
    navigate(`${location.pathname}?${search.toString()}`, {
      replace: false,
    });
  };

  if (loading) return <CustomLoader />;
  if (error) return <ErrorTitle error={error} />;

  return (
    <main className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        {!isEditing ? 'Профиль пользователя' : 'Редактирование профиля'}
      </h1>

      {!isEditing ? (
        <ProfileStatic
          userProfile={userProfile}
          setIsEditing={handleSetEditing}
        />
      ) : (
        <ProfileEdit
          userProfile={userProfile}
          setIsEditing={handleSetEditing}
        />
      )}
    </main>
  );
};

export default Profile;
