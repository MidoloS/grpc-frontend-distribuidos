import React, { useState, useEffect } from 'react';

export default function DenunciarReceta({ recipeId, recipeUserId, userId }) {
  const [motivo, setMotivo] = useState('');
  const [motivos, setMotivos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    // Realizar una solicitud a tu API para obtener la lista de motivos
    fetch('http://127.0.0.1:8000/api/motivos')
      .then(response => response.json())
      .then(data => {
        setMotivos(data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de motivos', error);
      });
  }, []);

  const handleDenunciarClick = () => {
    setMostrarFormulario(true);
  };

  const handleSubmit = () => {
    
    fetch('http://127.0.0.1:8000/data-processing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `motivo=${motivo}&id_recipe=${recipeId}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta de la API:', data);
        console.log(data)
        if (data === null) {
          alert('Denuncia enviada exitosamente.');
        } else {
          alert('Error al enviar la denuncia.');
        }
      })
      .catch(error => {
        console.error('Error al enviar la denuncia', error);
        alert('Error al enviar la denuncia.');
      });
  };

  // Comprobación si recipeUserId es igual a userId, no mostrar el componente
  if (recipeUserId === userId) {
    return null;
  }

  return (
    <div>
      {mostrarFormulario ? (
        <div>
          <select
            className="border border-slate-300 p-2 rounded-md text-slate-600"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          >
            <option value="">Seleccione un motivo</option>
            {motivos.map(motivo => (
              <option key={motivo.id} value={motivo.nombre}>
                {motivo.nombre}
              </option>
            ))}
          </select>
          <button
            className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            Enviar Denuncia
          </button>
        </div>
      ) : (
        <button
          className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer"
          onClick={handleDenunciarClick}
        >
          Denunciar
        </button>
      )}
    </div>
  );
}
