import React, { useEffect, useState } from 'react';

function TopUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await fetch("https://localhost:7055/api/user/top");
        const data = await response.json();

        if (data && data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios populares:', error);
      }
    };

    
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Top 5 Usuario</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.userName}) - Puntaje de Popularidad: {user.popularity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopUsers;