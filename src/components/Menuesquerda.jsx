import { Link } from "react-router-dom";
import './Menuesquerda.css';
import { usePersonagem } from "./PersonagemContext";


export function Menuesquerda() {
  const { personagemSelecionado } = usePersonagem();

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__resumo">
        <Link to="/entrada" className="volta"> <img className="seta" src="doublearrow.png" alt="" /></Link>
         {personagemSelecionado ? (
          <>
          <div className="resumo__conteudo">
            <div className="resumo__nomeimg">
              <h2>{personagemSelecionado.nome}</h2>
              <img src={personagemSelecionado.imagem} alt={personagemSelecionado.nome} />
              <p className="resumo__classenivel">{personagemSelecionado.classe} - Nível {personagemSelecionado.nivel}</p>
            </div>
              
            </div>
          </>
        ) : (
          <p>Selecione um personagem</p>
        )}
        </div>
        <ul className="menu">
          <li>
            <Link to="/inicio">
              <img src="./home.png" alt="Ícone Início" className="icon" /><p> Início </p> 
            </Link>
          </li>
          <li>
            <Link to="/atributos">
              <img src="./list.png" alt="Ícone Atributos" className="icon" /><p> Atributos</p>
            </Link>
          </li>
          <li>
            <Link to="/equipamentos">
              <img src="./armor.png" alt="Ícone Equipamentos" className="icon" /><p> Equipamentos</p>
            </Link>
          </li>
          <li>
            <Link to="/magias">
              <img src="./staff.png" alt="Ícone Magias" className="icon" /><p> Magias</p>
            </Link>
          </li>
          <li>
            <Link to="/combate">
              <img src="./arrows.png" alt="Ícone Combate" className="icon" /><p> Combate</p>
            </Link>
          </li>
          <li>
            <Link to="/mapa">
              <img src="./map.png" alt="Ícone Mapa" className="icon" /><p> Mapa</p>
            </Link>
          </li>
          <li>
            <Link to="/anotacoes">
              <img src="./book.png" alt="Ícone Anotações" className="icon" /><p> Anotações</p>
            </Link>
          </li>
          <li>
            <Link to="/grupo">
              <img src="./group.png" alt="Ícone Grupo" className="icon" /><p> Grupo</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
