import { useState, useEffect } from "react";
import { Menuesquerda } from "./components/Menuesquerda";
import "./Equipamentos.css";
import { usePersonagem } from "./components/PersonagemContext";

export function Equipamentos() {
  const { personagemSelecionado } = usePersonagem(); // Obtém o personagem selecionado
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    dano: "",
    alcance: "",
    imagem: "",
    sinopse: "",
    caracteristicas: [], // Adicionado para armazenar características
    personagemId: personagemSelecionado?.id // Adiciona ID do personagem
  });
  const [novaCaracteristica, setNovaCaracteristica] = useState(""); // Campo para nova característica
  const [equipamentos, setEquipamentos] = useState([]);

  const apiUrl = "http://localhost:3000/equipamentos";

  useEffect(() => {
    const fetchEquipamentos = async () => {
      try {
        // Filtra equipamentos apenas do personagem selecionado
        const response = await fetch(`${apiUrl}?personagemId=${personagemSelecionado?.id}`);
        if (response.ok) {
          const data = await response.json();
          setEquipamentos(data);
        } else {
          console.error("Erro ao carregar equipamentos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      }
    };

    if (personagemSelecionado) {
      fetchEquipamentos();
    }
  }, [personagemSelecionado]);

// Resto do código permanece igual, apenas adicione personagemId no método de adição
  const adicionarEquipamento = async (novoEquipamento) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...novoEquipamento, personagemId: personagemSelecionado.id}),  // Garante que o equipamento seja associado ao personagem
      });
      if (response.ok) {
        const equipamentoSalvo = await response.json();
        setEquipamentos([...equipamentos, equipamentoSalvo]);
      } else {
        console.error("Erro ao adicionar equipamento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao salvar equipamento:", error);
    }
  };

  const handleInputChange = (data) => {
    const { name, value } = data.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (data) => {
    data.preventDefault();
    await adicionarEquipamento(formData);
    setFormData({ nome: "", dano: "", alcance: "", imagem: "", sinopse: "", caracteristicas: [] });
    setShowModal(false);
  };

  const handleAddCaracteristica = () => {
    if (novaCaracteristica.trim() !== "") {
      setFormData({
        ...formData,
        caracteristicas: [...formData.caracteristicas, novaCaracteristica],
      });
      setNovaCaracteristica(""); // Limpa o campo de entrada
    }
  };

  return (
    <>
      <div className="equipamentos-container">
        <Menuesquerda />
        <div className="equipamentos-space">
        <button className="add-equipamento-btn" onClick={() => setShowModal(true)}>
          Adicionar
        </button>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Adicionar Equipamento</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Nome do Equipamento:
                  <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
                </label>
                <label>
                  Dano do Equipamento:
                  <input type="text" name="dano" value={formData.dano} onChange={handleInputChange} required />
                </label>
                <label>
                  Alcance do Equipamento:
                  <input type="text" name="alcance" value={formData.alcance} onChange={handleInputChange} required />
                </label>
                <label>
                  Imagem (URL):
                  <input type="url" name="imagem" value={formData.imagem} onChange={handleInputChange} required />
                </label>
                <label>
                  Sinopse:
                  <textarea name="sinopse" value={formData.sinopse} onChange={handleInputChange} required />
                </label>
                <label>
                  Características:
                  <div>
                    <input type="text" value={novaCaracteristica} onChange={(data) => setNovaCaracteristica(data.target.value)}placeholder="Adicionar característica" />
                    <button type="button" onClick={handleAddCaracteristica}>
                      Adicionar
                    </button>
                  </div>
                  <ul>
                    {formData.caracteristicas.map((caracteristica, index) => (
                      <li key={index}>{caracteristica}</li>
                    ))}
                  </ul>
                </label>
                <div className="modal-buttons">
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={() => setShowModal(false)}> Cancelar </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="equipamentos-grid">
          {equipamentos.map((equipamento) => (
            <div key={equipamento.id} className="equipamento-card">
              <img src={equipamento.imagem} alt={equipamento.nome} className="equipamento-image" />
              <div className="equipamento-info">
                <h3>{equipamento.nome}</h3>
                <p>Dano: {equipamento.dano}</p>
                <p>Alcance: {equipamento.alcance}</p>
                <p>{equipamento.sinopse}</p>
                <p>Características:</p>
                <ul className="equipamentos-carac">
                  {equipamento.caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        </div>
        
      </div>
    </>
  );
}

export default Equipamentos;
