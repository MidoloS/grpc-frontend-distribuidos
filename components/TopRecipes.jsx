import React, { useEffect, useState } from 'react';

function TopRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await fetch("https://localhost:7055/api/Recipes/top");
        const data = await response.json();

        if (data && data.recipes) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error al obtener las recetas populares:', error);
      }
    };

    
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Top  5 Recetas</h2>
      <ul>
        {recipes.map((recipe) => (
            <li>
            <p>Titulo: {recipe.title}</p>
            <p>Popularidad: {recipe.popularity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopRecipes;