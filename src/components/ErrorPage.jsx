const ErrorPage = ({ error }) => {
  return (
    <div className="text-center flex gap-4 flex-col">
      <span>😕</span>
      <h1 className="text-xl">{error.title}</h1>
      <p className="font-darkGray">{`${error.message} ${error.resolution}`}</p>
    </div>
  );
};

export default ErrorPage;
