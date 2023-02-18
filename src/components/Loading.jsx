import Logo from "../assets/images/logo.svg";

const Loading = () => {
  return (
    <main className="min-h-screen min-w-full grid place-items-center">
      <img className="animate-boing" src={Logo} alt="Dictionary Logo" />
    </main>
  );
};

export default Loading;
