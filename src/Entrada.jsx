import { useState, useEffect } from "react";
import "./Entrada.css";
import { useNavigate, Link } from "react-router-dom";
import { usePersonagem } from "./components/PersonagemContext.jsx";
import './style.css'

export function Entrada () {
   const { setPersonagemSelecionado } = usePersonagem();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      nome: "",
      classe: "",
      raca:"",
      nivel:"",
      imagem: "",
      historia: "",
      forca: "",
      destreza: "",
      constituicao: "",
      inteligencia: "",
      sabedoria: "",
      carisma: "",
    });
    const [personagens, setPersonagens] = useState([]); // Lista de personagens criados
    const [nomeParaExcluir, setNomeParaExcluir] = useState(""); // Nome do personagem a ser excluído
    const [excluirModal, setExcluirModal] = useState(false); // Controle do modal de exclusão
    const [searchQuery, setSearchQuery] = useState(""); // Estado de pesquisa
    const [sortOption, setSortOption] = useState(""); // Opção selecionada para ordenação
    
    const apiUrl = "http://localhost:3000/personagens";
  
    // Carregar os personagens da API ao montar o componente
    useEffect(() => {
      const fetchPersonagens = async () => {
        
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            setPersonagens(data);
          } 
        
      };
  
      fetchPersonagens();
    }, []);
  
    // Função para adicionar uma novo personagem
    const adicionarPersonagem = async (novoPersonagem) => {
      
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoPersonagem),
        });
        if (response.ok) {
          const personagemSalva = await response.json();
          setPersonagens([...personagens, personagemSalva]); // Atualiza o estado com o novo personagem salvo
        } 
    
    };

    const excluirPersonagem = async (nome) => {
      const personagem = personagens.find((p) => p.nome.toLowerCase() == nome.toLowerCase());
  
      if (!personagem) {
        alert("Personagem não encontrado!");
        return;
      }
  
      const response = await fetch(`${apiUrl}/${personagem.id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setPersonagens(personagens.filter((p) => p.id !== personagem.id));
        alert("Personagem excluído com sucesso!");
        setExcluirModal(false);
        setNomeParaExcluir("");
      } else {
        alert("Erro ao excluir personagem.");
      }
    };
  
    const handleSortChange = (event) => {
      const option = event.target.value;
      setSortOption(option);
  
      let sortedCharacters = [...personagens];
      if (option === "nome") {
        sortedCharacters.sort((a, b) => a.nome.localeCompare(b.nome));
      } else if (option === "classe") {
        sortedCharacters.sort((a, b) => a.classe.localeCompare(b.classe));
      } else if (option === "nivel") {
        sortedCharacters.sort((a, b) => b.nivel - a.nivel); // Ordena por nível decrescente
      }
      setPersonagens(sortedCharacters);
    };

    const navigate = useNavigate();

    const handlePersonagemClick = (personagem) => {
      setPersonagemSelecionado(personagem);
      navigate("/inicio");
    };

    const handleSearch = () => {
      if (searchQuery === "") {
        // Se a pesquisa estiver vazia, exibe todos os personagens novamente
        const fetchPersonagens = async () => {
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            setPersonagens(data); // Exibe todos os personagens
          }
        };
        fetchPersonagens(); // Chama a função para buscar todos os personagens
      } else {
        // Caso contrário, filtra os personagens com base no nome
        const personagensFiltrados = personagens.filter((personagem) =>
          personagem.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPersonagens(personagensFiltrados); // Atualiza a lista com os personagens filtrados
      }
    };
    

    const handleInputChange = (data) => {
      const { name, value } = data.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFormSubmit = async (data) => {
      data.preventDefault();
      await adicionarPersonagem(formData); // Chama a função para salvar na API
      setFormData({ nome: "",  classe: "", raca:"", nivel:"", imagem: "", historia: "", forca: "", destreza: "", constituicao: "", inteligencia: "", sabedoria: "", carisma: "", }); // Limpa o formulário
      setShowModal(false); // Fecha o modal
    };

   

    return (
      <>
        {/* Cabeçalho */}
        <header className="cabecalho">
          <div className="cabecalho__container">
            {/* Logo */}
            <div className="cabecalho__logo">
              <img src="mysquire.png" className="logo__img" alt="" />
              <div className="logo__texto">
                <h4 className="texto__subtitulo">Hall de Personagens</h4>
              </div>
            </div>
    
            {/* Botões do cabeçalho */}
            <div className="cabecalho__botoes">
              <button className="botoes__botao" onClick={() => setShowModal(true)}>
                Criar
              </button>
    
              {/* Modal de criação */}
              {showModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h2>Adicionar Personagem</h2>
                    <form onSubmit={handleFormSubmit} className="formulario">
                      {[
                        { label: "Nome", name: "nome", type: "text" },
                        { label: "Classe", name: "classe", type: "text" },
                        { label: "Raça", name: "raca", type: "text" },
                        { label: "Nível", name: "nivel", type: "number", max:20 },
                        { label: "Força", name: "forca", type: "number", max:99 },
                        { label: "Destreza", name: "destreza", type: "number", max:99 },
                        { label: "Constituição", name: "constituicao", type: "number", max:99 },
                        { label: "Inteligência", name: "inteligencia", type: "number", max:99 },
                        { label: "Sabedoria", name: "sabedoria", type: "number", max:99 },
                        { label: "Carisma", name: "carisma", type: "number", max:99 },
                        { label: "Imagem (URL)", name: "imagem", type: "url" },
                        { label: "História", name: "historia", type: "textarea" },
                      ].map(({ label, name, type, max }) => (
                        <div key={name} className="formulario-linha">
                          <label>{label}:</label>
                          {type === "textarea" ? (
                            <textarea
                              name={name}
                              value={formData[name]}
                              onChange={handleInputChange}
                              required
                            />
                          ) : (
                            <input
                              type={type}
                              name={name}
                              value={formData[name]}
                              onChange={handleInputChange}
                              required
                              max={max}
                            />
                          )}
                        </div>
                      ))}
    
                      <div className="modal-buttons">
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={() => setShowModal(false)}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
    
              <select
                className="botoes__botao"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Filtrar por:</option>
                <option value="nome">Nome</option>
                <option value="classe">Classe</option>
                <option value="nivel">Nível</option>
              </select>
    
              <button
                className="botoes__botao"
                onClick={() => setExcluirModal(true)}
              >
                Excluir
              </button>
    
              {/* Modal de exclusão */}
              {excluirModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h2>Excluir Personagem</h2>
                    <p>Digite o nome do personagem que deseja excluir:</p>
                    <input
                      type="text"
                      value={nomeParaExcluir}
                      onChange={(e) => setNomeParaExcluir(e.target.value)}
                      placeholder="Nome do personagem"
                    />
                    <div className="modal-buttons">
                      <button onClick={() => excluirPersonagem(nomeParaExcluir)}>
                        Excluir
                      </button>
                      <button onClick={() => setExcluirModal(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
    
            <Link to="/"><img src="image 1.png" className="cabecalho__perfil" alt="" /></Link>
          </div>
        </header>
    
        {/* Barra de busca */}
        <section>
          <div className="busca">
            <input
              type="text"
              className="busca__pesquisa"
              placeholder="Pesquisar Personagem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src="Search.png"
              className="busca__botao"
              alt=""
              onClick={handleSearch}
            />
          </div>
        </section>
    
        {/* Grid de personagens */}
        <main>
          <div className="personagens-grid">
            {personagens.map((personagem) => (
              <div
                key={personagem.id}
                className="personagem-card"
                onClick={() => handlePersonagemClick(personagem)}
              >
                <div className="personagem-avatar">
                  <img
                    src={personagem.imagem}
                    alt={personagem.nome}
                    className="personagem-image"
                  />
                  <h3 className="info__nome">{personagem.nome}</h3>
                </div>
                <div className="personagens__info">
                  
                  <div className="info__build">
                    <div className="build__classeraca">
                      <p>Classe: {personagem.classe}</p>
                      <p>Raça: {personagem.raca}</p>
                      <p className="build__nivel">Nível: {personagem.nivel}</p>
                    </div>
                    
                  </div>
                  <div className="historia__atributos">
                    <div className="info__historia">
                      <p className="historia__titulo">História:</p>
                      <p className="historia__conteudo">{personagem.historia}</p>
                    </div>
                    <div className="info__atributos">
                      <div className="atributos__container">
                        {[
                          "forca",
                          "destreza",
                          "constituicao",
                          "inteligencia",
                          "sabedoria",
                          "carisma",
                        ].map((atributo) => (
                          <div key={atributo} className="atributos__numeros">
                            <p>
                              {atributo.charAt(0).toUpperCase() +
                                atributo.slice(1)}:{" "}
                              {personagem[atributo]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
    
    
}

export default Entrada;