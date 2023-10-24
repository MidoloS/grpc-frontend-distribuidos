"use client";
import React, { useState } from 'react';
import MessageForm from '../../components/MessageForm';
import SentMessages from '../../components/SentMessages';
import ReceivedMessages from '../../components/ReceivedMessages';
import { getCookie } from "../../helpers";

export default function Messages() {
  const [view, setView] = useState('inbox');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <ul style={styles.optionsList}>
        <li>
          <button
            onClick={() => handleViewChange('compose')}
            style={{ ...styles.button, ...(view === 'compose' ? styles.selected : {}) }}
          >
            Redactar Mensaje
          </button>
        </li>
        <li>
          <button
            onClick={() => handleViewChange('inbox')}
            style={{ ...styles.button, ...(view === 'inbox' ? styles.selected : {}) }}
          >
            Recibidos
          </button>
        </li>
        <li>
          <button
            onClick={() => handleViewChange('sent')}
            style={{ ...styles.button, ...(view === 'sent' ? styles.selected : {}) }}
          >
            Enviados
          </button>
        </li>
      </ul>

      {view === 'compose' && <MessageForm user_id={Number(getCookie("userId"))} />}
      {view === 'inbox' && <ReceivedMessages user_id={Number(getCookie("userId"))} />}
      {view === 'sent' && <SentMessages user_id={Number(getCookie("userId"))} />}
    </div>
  );
}

const styles = {
  optionsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: '200px',
  },
  button: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '8px',
  },
  selected: {
    color: 'black',
    fontWeight: 'bold',
  },
};





