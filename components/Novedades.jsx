import React, { useState, useEffect } from "react";

function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    // Simula una carga demorada para fines de demostración
    setTimeout(() => {
      fetch("https://localhost:7055/api/Recipes/Novedades")
        .then((response) => response.json())
        .then((data) => {
          setNovedades(data.novedad);
          setLoading(false);
        })
        .catch((error) => console.error("Error al obtener novedades:", error));
    }, 2000); // Simula una carga de 2 segundos

    // Inicia el intervalo para los puntos suspensivos
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        return prevDots === "..." ? "." : prevDots + ".";
      });
    }, 1000); // Cambia los puntos cada 1 segundo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const contenedorStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  };

  const novedadStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
  };

  const imagenStyle = {
    width: "100%",
    height: "auto",
  };

  const loadingStyle = {
    textAlign: "center",
    fontSize: "24px",
  };

  return (
    <div className="novedades" style={contenedorStyle}>
      {loading ? (
        <div className="loader" style={loadingStyle}>
          Cargando{dots}
        </div>
      ) : (
        novedades.map((novedad, index) => (
          <div key={index} style={novedadStyle} className="novedad-item">
            <h3>{novedad.title}</h3>
            <p>Usuario: {novedad.user}</p>
            <img src={novedad.url} alt={novedad.title} style={imagenStyle} />
          </div>
        ))
      )}
    </div>
  );
}

export default Novedades;
