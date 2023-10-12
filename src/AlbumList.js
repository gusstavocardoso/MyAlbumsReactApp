import React from "react";

function AlbumList({ albums, onEdit, onDelete }) {
  return (
    <div>
      <ul>
        {albums.map((album, index) => (
          <li key={index}>
            <strong>{album.banda} - {album.nomeAlbum} ({album.anoLancamento})</strong>
            <br />
            <em>Integrantes: {album.integrantes.join(", ")}</em>
            <button onClick={() => onEdit(album)}>Editar</button>
            <button onClick={() => onDelete(album)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
