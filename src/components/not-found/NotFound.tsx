import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Страница не найдена</h1>
      <p className="text-xl mb-6">Упс! Такой страницы не существует.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition cursor-pointer"
      >
        <span>←</span>
        Назад
      </button>
    </div>
  );
};

export default NotFound;
