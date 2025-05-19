import React, { createContext, useState, useContext } from "react";

const PersonagemContext = createContext();

export const PersonagemProvider = ({ children }) => {
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  return (
    <PersonagemContext.Provider value={{ personagemSelecionado, setPersonagemSelecionado }}>
      {children}
    </PersonagemContext.Provider>
  );
};

export const usePersonagem = () => {
  return useContext(PersonagemContext);
};
