import React, { useState, useEffect } from 'react';

function ReceivedMessage({ message, onReplySubmit }) {
  const [replyInput, setReplyInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyChange = (event) => {
    setReplyInput(event.target.value);
  };

  const handleReplySubmit = () => {
    onReplySubmit(message.id, replyInput);
    setIsReplying(false);
  };

  return (
    <li className="mb-4">
      <div className="font-bold text-slate-900">Usuario: {message.emisor}</div>
      <div className="text-slate-600">Asunto: {message.asunto}</div>
      <div className="text-slate-600">Mensaje: {message.mensaje}</div>
      {message.respuesta ? (
        <div className="text-slate-600">Respuesta: {message.respuesta}</div>
      ) : (
        <div>
          {isReplying ? (
            <div>
              <input
                type="text"
                placeholder="Agregar respuesta"
                value={replyInput}
                onChange={handleReplyChange}
                className="border border-slate-300 p-2 rounded-md text-slate-600"
              />
              <button
                onClick={handleReplySubmit}
                className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer"
              >
                Enviar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsReplying(true)}
              className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer"
            >
              Responder
            </button>
          )}
        </div>
      )}
      <div className="text-slate-600">Fecha: {message.created_at}</div>
    </li>
  );
}

export default function ReceivedMessages({ user_id }) {
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/messages/received/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setReceivedMessages(data);
      })
      .catch(error => {
        console.error('Error al obtener los mensajes recibidos', error);
      });
  }, [user_id]);

  const handleReplySubmit = (messageId, replyInput) => {
    fetch(`http://127.0.0.1:8000/api/user/message/reply/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: messageId, respuesta: replyInput }),
    })
      .then(response => response.json())
      .then(data => {
        // Actualiza los mensajes después de agregar la respuesta.
        const updatedMessages = receivedMessages.map(message => {
          if (message.id === messageId) {
            return { ...message, respuesta: replyInput };
          }
          return message;
        });
        setReceivedMessages(updatedMessages);
      })
      .catch(error => {
        console.error('Error al agregar la respuesta', error);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900">Mensajes Recibidos</h2>
      <ul className="border border-slate-300 p-4 rounded-md">
        {Array.isArray(receivedMessages) ? (
          receivedMessages.map((message, index) => (
            <ReceivedMessage
              key={index}
              message={message}
              onReplySubmit={handleReplySubmit}
            />
          ))
        ) : (
          <p className="text-slate-600">No se encontraron mensajes recibidos.</p>
        )}
      </ul>
    </div>
  );
}
