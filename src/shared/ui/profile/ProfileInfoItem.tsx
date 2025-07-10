interface IProfileInfoItem {
  icon: string;
  label: string;
  value?: string;
}

const ProfileInfoItem = ({ icon, label, value }: IProfileInfoItem) => {
  return (
    <p className="flex items-start gap-2">
      <span className="w-5 h-5 text-gray-600 dark:text-gray-300">{icon}</span>
      <span>
        <span className="font-semibold">{label}:</span> {value}
      </span>
    </p>
  );
};

export default ProfileInfoItem;
