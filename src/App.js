import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositorie] = useState([]);
  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: `desafio react ${Date.now()}`,
      url: "https://github.com/anderson-tec12/desafio01",
      techs: [],
    });

    setRepositorie([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const dataUpdated = repositories.filter(
      (repositorie) => repositorie.id !== id
    );

    //console.log(dataUpdated);
    setRepositorie(dataUpdated);
  }

  useEffect(() => {
    api.get("repositories").then((resp) => {
      setRepositorie(resp.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((resposetorie) => (
          <li key={resposetorie.id}>
            {resposetorie.title}
            <button onClick={() => handleRemoveRepository(resposetorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
