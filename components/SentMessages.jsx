import React, { useState, useEffect } from 'react';

export default function SentMessages({ user_id }) {
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/messages/sent/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setSentMessages(data);
      })
      .catch(error => {
        console.error('Error al obtener los mensajes enviados', error);
      });
  }, [user_id]);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900">Mensajes Enviados</h2>
      <ul className="border border-slate-300 p-4 rounded-md">
        {Array.isArray(sentMessages) ? (
          sentMessages.map((message, index) => (
            <li key={index} className="mb-4">
              <div className="font-bold text-slate-900">Usuario: {message.receptor}</div>
              <div className="text-slate-600">Asunto: {message.asunto}</div>
              <div className="text-slate-600">Mensaje: {message.mensaje}</div>              
              <div className="text-slate-600">Respuesta: {message.respuesta || "Sin respuesta"}</div>
              <div className="text-slate-600">Fecha: {message.created_at}</div>
            </li>
          ))
        ) : (
          <p>No se encontraron mensajes enviados.</p>
        )}
      </ul>
    </div>
  );
}
