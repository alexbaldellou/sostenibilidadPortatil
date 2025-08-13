import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { LoginController } from "./LoginController";

export const Login = () => {
  const { usuario, password, setUsuario, setPassword, sendUserPasswd } =
    LoginController();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-teal-400 to-teal-900">
      <form onSubmit={sendUserPasswd} autoComplete="off">
        <div className="bg-teal-300/70 p-5 rounded-xl font-bold text-xl w-80">
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-white placeholder:text-gray-500 focus:outline-none"
          />
          <div className="flex justify-between">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-white placeholder:text-gray-500 focus:outline-none"
            />
            {usuario && password && (
              <button
                type="submit"
                className="w-12 bg-teal-500 rounded-xl p-2 text-white"
              >
                <RocketLaunchIcon />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
