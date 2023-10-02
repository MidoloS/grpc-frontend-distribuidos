import React, { useState } from 'react';

const CalificarReceta = ({ recipeId, recipeUserId, userId }) => {
  const [calificacion, setCalificacion] = useState(1); // Inicializamos con 1 estrella

  const handleCalificacionClick = (nuevaCalificacion) => {
    setCalificacion(nuevaCalificacion);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://localhost:7055/api/Recipes/qualify/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: userId,
          clasification: calificacion,
        }),
      });

      if (response.ok) {
        console.log('Response ' + response.ok)
        const responseData = await response.json(); 
        window.alert(responseData.message)
        if (responseData.message === 'Qualify succesfully') {
          //console.alert('¡Receta calificada con éxito!');
          //window.alert('¡Receta calificada con éxito!'); // Mostrar alerta
        }

        setCalificacion(1); 
      } else {
        const errorData = await response.json(); 
        console.error('Error al calificar la receta:', errorData.message);
        window.alert('Error al calificar la receta.'); 
      }
    } catch (error) {
      console.error('Error de red:', error);
      window.alert('Error de red al calificar la receta.'); 
    }
  };

  // Función para renderizar las estrellas como caracteres Unicode
  const renderEstrellas = () => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      const estrella = i <= calificacion ? '★' : '☆'; // Utilizar caracteres Unicode
      estrellas.push(
        <span
          key={i}
          onClick={() => handleCalificacionClick(i)}
          style={{
            fontSize: '30px', 
            cursor: 'pointer',
          }}
        >
          {estrella}
        </span>
      );
    }
    return estrellas;
  };

  // Comprobación si recipeUserId es igual a userId, no mostrar el componente
  if (recipeUserId === userId) {
    return null;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
      >
        Calificar la Receta
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>{renderEstrellas()}</div>
        <button
          type="submit"
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
        >
          Calificar Receta
        </button>
      </form>
    </div>
  );
};

export default CalificarReceta;