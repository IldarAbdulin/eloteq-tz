export interface IRepository {
  id: number;
  name: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  };
  private: boolean;
  page: number;
}
