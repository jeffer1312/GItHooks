import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const res = await fetch("https://api.github.com/users/jeffer1312/repos");
    const data = await res.json();

    setRepositories(data);
  }
  function titleFavorites() {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `voce Tem ${filtered.length} favoritos`;
  }

  useEffect(loadRepositories, []);
  useEffect(titleFavorites, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
