import React, { useState, useEffect } from 'react';

export default function MessageForm({ user_id }) {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (recipient) {
      fetch(`http://127.0.0.1:8000/api/user/${recipient}`)
        .then(response => response.json())
        .then(data => {
          setUserList(data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios', error);
        });
    }
  }, [recipient]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserList([]);
    setRecipient(user.username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedUser) {
      const messageData = {
        receptor_id: selectedUser.id,
        asunto: subject,
        mensaje: message,
      };

      console.log('Datos del mensaje a enviar:', messageData);

      fetch(`http://127.0.0.1:8000/api/user/message/send/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta de la API:', data);
          console.log(data.status)
          if (data.status === null){
            window.alert('No se Realizó el envío') 
          } else {
            window.alert('Mensaje Enviado!')
          }
        })
        .catch(error => {
          console.error('Error al enviar el mensaje', error);
        });
    } else {
      console.error('Debes seleccionar un destinatario antes de enviar el mensaje.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Ingresar Usuario"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="border border-slate-300 p-2 rounded-md text-slate-600 w-full"
      />
      <ul style={{
        padding: 0,
        listStyle: 'none',
        width: '100%', // Ancho igual al input
      }}>
        {userList.map(user => (
          
          <li
            key={user.id}
            onClick={() => handleUserSelect(user)}
            style={{
              cursor: 'pointer',
              padding: '8px',
              border: '1px solid #ccc',
              marginBottom: '4px',
              borderRadius: '4px',
              backgroundColor: user === selectedUser ? '#f0f0f0' : 'transparent',
              width: '100%', // Ancho igual al input
            }}
          >
            {user.username}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Asunto"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border border-slate-300 p-2 rounded-md text-slate-600 w-full"
      />
      <textarea
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-slate-300 p-2 rounded-md text-slate-600 w-full h-52"
      />
      <button
        type="submit"
        className="bg-slate-950 text-slate-50 py-2 px-6 rounded-md cursor-pointer w-full"
      >
        Enviar
      </button>
    </form>
  );
}



