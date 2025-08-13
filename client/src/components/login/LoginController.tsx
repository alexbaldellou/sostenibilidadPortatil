import { useState } from "react";

export const LoginController = () => {
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const sendUserPasswd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmptyUser = usuario === "" || password === "";
    if (isEmptyUser) console.log("yeahahahhd");
  };
  return {
    usuario,
    password,
    setUsuario,
    setPassword,
    sendUserPasswd,
  };
};
