const ErrorPage = ({ error }) => {
  return (
    <div className="text-center flex gap-4 flex-col">
      <span className="text-[4rem]">😕</span>
      <h1 className="text-xl font-bold dark:text-white">{error.title}</h1>
      <p className="text-darkGray text-[18px] dark:text-white">{`${error.message} ${error.resolution}`}</p>
    </div>
  );
};

export default ErrorPage;
