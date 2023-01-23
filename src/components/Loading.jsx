import Logo from "../assets/images/logo.svg";

const Loading = () => {
  return (
    <main className="loading">
      <img className="loading__image bounce" src={Logo} alt="Dictionary Logo" />
    </main>
  );
};

export default Loading;
