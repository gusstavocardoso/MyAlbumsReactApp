import React, { useState } from "react";

function AlbumForm({ onSave, onCancel, album }) {
  const [formData, setFormData] = useState(album);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      banda: "",
      nomeAlbum: "",
      anoLancamento: "",
      integrantes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Banda:
        <input
          type="text"
          name="banda"
          value={formData.banda}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Nome do Álbum:
        <input
          type="text"
          name="nomeAlbum"
          value={formData.nomeAlbum}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Ano de Lançamento:
        <input
          type="number"
          name="anoLancamento"
          value={formData.anoLancamento}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Integrantes:
        <input
          type="text"
          name="integrantes"
          value={formData.integrantes}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}

export default AlbumForm;
