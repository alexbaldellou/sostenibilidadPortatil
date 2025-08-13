import { LoginController } from "./LoginController";

export const Login = () => {
  const { usuario, password, setUsuario, setPassword, sendUserPasswd } =
    LoginController();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-teal-400 to-teal-900">
      <form onSubmit={(event) => sendUserPasswd(event)}>
        <div className="bg-teal-300/70 p-5 rounded-xl font-bold text-xl ">
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-white placeholder:text-gray-500 focus:outline-none"
          />
          <div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-white placeholder:text-gray-500 focus:outline-none"
            />
            {/* <button onClick={() => sendUserPasswd()}></button> */}
          </div>
        </div>
      </form>
    </div>
  );
};
