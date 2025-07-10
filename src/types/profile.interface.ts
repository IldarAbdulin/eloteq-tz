export interface IUserProfile {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string | null;
  bio: string | null;
  company: string | null;
  email: string | null;
  name: string | null;
  location: string | null;
}

export interface IProfileProps {
  userProfile: IUserProfile | null;
  setIsEditing: (isEdit: boolean) => void;
}

export interface IEditDataState {
  name: string;
  bio: string;
  company: string;
  location: string;
}
