const ErrorPage = ({ error }) => {
  return (
    <div className="error">
      <span className="error_emoji">😕</span>
      <h1>{error.title}</h1>
      <p>{`${error.message} ${error.resolution}`}</p>
    </div>
  );
};

export default ErrorPage;
