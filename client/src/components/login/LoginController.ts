import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginController = () => {
  const navigate = useNavigate();
  const userValid = { usuario: "Alex", password: "1234" };
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const sendUserPasswd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid =
      usuario === userValid.usuario && password === userValid.password;
    if (!isValid) return alert("nonononono");
    navigate("/dashboard");
  };
  return {
    usuario,
    password,
    setUsuario,
    setPassword,
    sendUserPasswd,
  };
};
