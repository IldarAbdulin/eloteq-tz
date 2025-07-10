interface IErrorTitle {
  error: string;
}

const ErrorTitle = ({ error }: IErrorTitle) => {
  return <p className="text-lg text-red-500">{error}</p>;
};

export default ErrorTitle;
