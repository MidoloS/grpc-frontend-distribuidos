import React, { useEffect, useState } from 'react';

const ComentariosReceta = ({ recipeId }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        const response = await fetch(`https://localhost:7055/api/Recipes/comments/${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          setComentarios(data.comments);
        } else {
          console.error('Error al obtener los comentarios');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    obtenerComentarios();
  }, [recipeId]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Comentarios</h2> {/* Título "Comentarios" */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {comentarios.map((comentario) => (
          <li
            key={comentario.idComment}
            style={{
              display: 'flex',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Somos más oscura
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              maxWidth: '80%',
            }}
          >
            <div
              style={{
                flex: 1,
                paddingRight: '10px',
              }}
            >
              <p>{comentario.comment_}</p>
            </div>
            <div
              style={{
                flex: 1,
                paddingLeft: '10px',
              }}
            >
              <p>Usuario: {comentario.username}</p>
              <p>Fecha: {comentario.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComentariosReceta;