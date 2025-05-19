import { useState, useEffect } from "react";
import { Menuesquerda } from "./components/Menuesquerda";
import "./Magias.css";
import { usePersonagem } from "./components/PersonagemContext";

export function Magias() {
  const { personagemSelecionado } = usePersonagem();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    imagem: "",
    sinopse: "",
    personagemId: personagemSelecionado?.id // Adiciona ID do personagem
  });
  const [magias, setMagias] = useState([]); // Lista de magias criadas

  const apiUrl = "http://localhost:3000/magias";

  // Carregar as magias da API ao montar o componente
  useEffect(() => {
    const fetchMagias = async () => {
      try {
        // Filtra magias apenas do personagem selecionado
        const response = await fetch(`${apiUrl}?personagemId=${personagemSelecionado?.id}`);
        if (response.ok) {
          const data = await response.json();
          setMagias(data);
        } else {
          console.error("Erro ao carregar magias:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar magias:", error);
      }
    };

    if (personagemSelecionado) {
      fetchMagias();
    }
  }, [personagemSelecionado]);

  // Função para adicionar uma nova magia
  const adicionarMagia = async (novaMagia) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...novaMagia, personagemId: personagemSelecionado.id}),          // Garante que a magia seja associada ao personagem
      });
      if (response.ok) {
        const magiaSalva = await response.json();
        setMagias([...magias, magiaSalva]); // Atualiza o estado com a nova magia salva
      } else {
        console.error("Erro ao adicionar magia:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao salvar magia:", error);
    }
  };

  const handleInputChange = (data) => {
    const { name, value } = data.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (data) => {
    data.preventDefault();
    await adicionarMagia(formData); // Chama a função para salvar na API
    setFormData({ nome: "", imagem: "", sinopse: "" }); // Limpa o formulário
    setShowModal(false); // Fecha o modal
  };

  return (
    <>
      <div className="magias-container">
        <Menuesquerda />
        <div>
          <button className="add-magia-btn" onClick={() => setShowModal(true)}>
            Adicionar
          </button>
          {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Magia</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Nome da Magia:
                  <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required/>
                </label>
                <label>
                  Imagem (URL):
                  <input type="url" name="imagem" value={formData.imagem} onChange={handleInputChange} required/>
                </label>
                <label>
                  Sinopse:
                  <textarea name="sinopse" value={formData.sinopse} onChange={handleInputChange} required/>
                </label>
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
        <div className="magias-grid">
          {magias.map((magia) => (
            <div key={magia.id} className="magia-card">
              <img src={magia.imagem} alt={magia.nome} className="magia-image" />
              <div className="magia-info">
                <h3>{magia.nome}</h3>
                <p>{magia.sinopse}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default Magias;
