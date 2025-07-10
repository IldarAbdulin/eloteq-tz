import ProfileInfoItem from '../../shared/ui/profile/ProfileInfoItem';
import UserProfileHeader from '../../shared/ui/UserProfileHeader';
import type { IProfileProps } from '../../types/profile.interface';

const ProfileStatic = ({ userProfile, setIsEditing }: IProfileProps) => {
  const profileFields = [
    {
      label: 'Email',
      value: userProfile?.email || 'Не указан',
      icon: '📧',
    },
    {
      label: 'Компания',
      value: userProfile?.company || 'Не указана',
      icon: '🏢',
    },
    {
      label: 'Местоположение',
      value: userProfile?.location || 'Неизвестно',
      icon: '📍',
    },
    {
      label: 'Описание',
      value: userProfile?.bio || 'Отсутствует',
      icon: '📝',
    },
  ];
  if (userProfile)
    return (
      <>
        <UserProfileHeader user={userProfile} />
        <div className="mt-8 space-y-4 text-gray-800 dark:text-gray-200">
          {profileFields.map((field) => (
            <ProfileInfoItem key={field.label} {...field} />
          ))}
          <p className="flex items-start gap-2">
            <span>
              <a
                href={userProfile?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-500 underline hover:text-blue-600"
              >
                Профиль GitHub
              </a>
            </span>
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Редактировать профиль
        </button>
      </>
    );
};

export default ProfileStatic;
