import React, { useState } from "react";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    banda: "",
    nomeAlbum: "",
    anoLancamento: "",
    integrantes: "",
  });
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "integrantes") {
      // Divide o valor em uma array separada por vírgulas
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddAlbum = () => {
    const { banda, nomeAlbum, anoLancamento, integrantes } = formData;

    if (!banda || !nomeAlbum || !anoLancamento) {
      setMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (albums.some((album) => album.banda === banda && album.nomeAlbum === nomeAlbum)) {
      setMessage("Este álbum já foi cadastrado para esta banda.");
    } else {
      const newAlbum = {
        banda,
        nomeAlbum,
        anoLancamento,
        integrantes,
      };

      setAlbums([...albums, newAlbum]);
      setFormData({
        banda: "",
        nomeAlbum: "",
        anoLancamento: "",
        integrantes: "",
      });
      setMessage("Álbum cadastrado com sucesso.");
    }
  };

  const handleEditAlbum = (index) => {
    // Define o índice do álbum em edição e preenche o formulário com os dados do álbum
    setEditIndex(index);
    setFormData(albums[index]);
  };

  const handleUpdateAlbum = () => {
    if (editIndex !== -1) {
      const { banda, nomeAlbum, anoLancamento, integrantes } = formData;
  
      if (!banda || !nomeAlbum || !anoLancamento || !integrantes) {
        setMessage("Por favor, preencha todos os campos.");
        return;
      }
  
      // Verifique se os novos dados não correspondem a nenhum álbum existente, exceto o álbum sendo editado
      const isDuplicate = albums.some((album, index) => {
        return index !== editIndex && album.banda === banda && album.nomeAlbum === nomeAlbum;
      });
  
      if (isDuplicate) {
        setMessage("Este álbum já foi cadastrado para esta banda.");
      } else {
        const updatedAlbums = [...albums];
        updatedAlbums[editIndex] = { ...formData };
        setAlbums(updatedAlbums);
        setEditIndex(-1);
        setFormData({ banda: "", nomeAlbum: "", anoLancamento: "", integrantes: "" });
        setMessage("Álbum editado com sucesso.");
      }
    }
  };

  const handleDeleteAlbum = (index) => {
    const updatedAlbums = [...albums];
    updatedAlbums.splice(index, 1);
    setAlbums(updatedAlbums);
    setMessage("Álbum removido com sucesso.");
  };

  return (
    <div className="App">
      <div className="container"></div>
      <h1>Meus Álbuns de Música</h1>
      <div>
        <h2>Adicionar Álbum</h2>
        <input
          type="text"
          name="banda"
          placeholder="Banda"
          value={formData.banda}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nomeAlbum"
          placeholder="Nome do Álbum"
          value={formData.nomeAlbum}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="anoLancamento"
          placeholder="Ano de Lançamento"
          value={formData.anoLancamento}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="integrantes"
          placeholder="Integrantes (separados por vírgula)"
          value={formData.integrantes}
          onChange={handleInputChange}
        />
        {editIndex !== -1 ? (
          <button onClick={handleUpdateAlbum}>Atualizar Álbum</button>
        ) : (
          <button onClick={handleAddAlbum}>Adicionar Álbum</button>
        )}
      </div>
      <div>
        <h2>Lista de Álbuns</h2>
        <div className="list-container"></div>
        <ul>
          {albums.map((album, index) => (
            <li key={index}>
              <strong>Banda:</strong> {album.banda}, <strong>Álbum:</strong> {album.nomeAlbum}, <strong>Ano de Lançamento:</strong> {album.anoLancamento}, <strong>Integrantes:</strong> {album.integrantes.join(", ")}
              <button className="edit-button" onClick={() => handleEditAlbum(index)}>Editar</button>
              <button className="remove-button" onClick={() => handleDeleteAlbum(index)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
