import type { IRepository } from '../../../types/repositories.interface';

interface IRepositoryItemList {
  repo: IRepository;
}

const RepositoryItemList = ({ repo }: IRepositoryItemList) => {
  return (
    <li className="p-4 border rounded">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-semibold hover:underline"
      >
        {repo.name}
      </a>
      <p className="text-sm text-gray-500">
        Develop By:{' '}
        <a
          href={repo.owner.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {repo.owner.login}
        </a>
      </p>
    </li>
  );
};

export default RepositoryItemList;
