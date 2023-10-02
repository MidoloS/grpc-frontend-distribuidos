import React, { useState } from 'react';

const ComentarReceta = ({ recipeId, userId }) => {
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://localhost:7055/api/Recipes/comment/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: userId, 
          comment: comentario,
        }),
      });

      if (response.ok) {
        const responseData = await response.json(); 
        window.alert(responseData.message)
        if (responseData.message === 'Comment successfully') {
          window.alert('¡Comentario enviado con éxito!'); // Mostrar alerta
        }

        setMensaje('Comentario enviado con éxito.');
        setComentario('');
      } else {
        const errorData = await response.json(); // Parsear la respuesta JSON en caso de error
        console.error('Error al enviar el comentario:', errorData.message);
        setMensaje('Error al enviar el comentario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setMensaje('Error de red al enviar el comentario.');
    }
  };

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
        Comentar la Receta
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          placeholder="Escribe tu comentario..."
          value={comentario}
          onChange={handleComentarioChange}
          rows="4"
        ></textarea>
        <br />
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
          Enviar Comentario
        </button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default ComentarReceta;