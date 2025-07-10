import type { IUserProfile } from '../../types/profile.interface';

interface IProfileUserAvatarName {
  user: IUserProfile;
}

const UserProfileHeader = ({ user }: IProfileUserAvatarName) => {
  return (
    <div className="flex items-center gap-6">
      <img
        src={
          user?.avatar_url ||
          `https://www.gravatar.com/avatar/${user?.email}?d=identicon`
        }
        alt="Аватар пользователя"
        loading="lazy"
        className="w-24 h-24 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
      />
      <div>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {user?.name || 'Не указано'}
        </p>
        <p className="text-gray-500">{user?.login}</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
