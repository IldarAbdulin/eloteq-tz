import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { updateUserProfile } from '../../store/slice/profile/profile-slice';
import CustomTextInputField from '../../shared/ui/CustomTextInputField';
import CustomTextareaField from '../../shared/ui/CustomTextareaField';
import { PROFILE_EDIT_FIELDS } from '../../constants/text-fields';
import { $githubApi } from '../../api';
import type {
  IEditDataState,
  IProfileProps,
} from '../../types/profile.interface';
import {
  showErrorToast,
  showSuccessToast,
} from '../../shared/utils/toast-utils';

const ProfileEdit = ({ setIsEditing, userProfile }: IProfileProps) => {
  const dispatch = useAppDispatch();

  const [editData, setEditData] = useState<IEditDataState>({
    name: '',
    bio: '',
    company: '',
    location: '',
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setEditData({
        name: userProfile.name ?? '',
        bio: userProfile.bio ?? '',
        company: userProfile.company ?? '',
        location: userProfile.location ?? '',
      });
    }
  }, [userProfile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem('eloteq_tz_access_token');
      const { data } = await $githubApi.patch('/user', editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateUserProfile(data));
      setIsEditing(false);
      showSuccessToast('Редактирование прошло успешно');
    } catch (err: any) {
      showErrorToast(
        err.response?.data?.message || err.message || 'Ошибка при обновлении'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 text-gray-800 dark:text-gray-200 max-w-md"
    >
      {PROFILE_EDIT_FIELDS.map(({ id, label, type }) => (
        <CustomTextInputField
          key={id}
          id={id}
          label={label}
          type={type}
          value={editData[id as keyof IEditDataState]}
          onChange={handleChange}
        />
      ))}

      <CustomTextareaField
        id="bio"
        label="Описание профиля"
        name="bio"
        value={editData.bio}
        onChange={handleChange}
        disabled={submitLoading}
      />

      {submitError && <p className="text-red-500">{submitError}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitLoading}
          className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitLoading ? 'Обновление...' : 'Сохранить'}
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded hover:bg-gray-500 transition"
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
