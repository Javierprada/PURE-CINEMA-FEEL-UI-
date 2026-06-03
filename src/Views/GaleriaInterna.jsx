import './GaleriaInterna.css';

// Estructura de datos simulada (Mock Data) con el ecosistema de Cinema Feel
const MOCK_PELICULAS = [
  { id: 1, titulo: "NEO-TOKYO 2099 // MASTER_REC.mkv", size: "45.2 GB", codec: "H.265", status: "READY" },
  { id: 2, titulo: "CYBERPUNK CHRONICLES // VOL_3.mp4", size: "38.1 GB", codec: "AV1", status: "ENCRYPTED" },
  { id: 3, titulo: "GHOST IN THE SHIELD // PROD_RAW.mkv", size: "52.0 GB", codec: "H.265", status: "READY" },
  { id: 4, titulo: "GHOST IN THE SHIELD // PROD_RAW.mkv", size: "52.0 GB", codec: "H.265", status: "READY" },
];

const GaleriaInterna = () => {
  
  

  return (
    <div className="gallery-internal-wrapper">
      

      {/* RENDERIZADO DE LA TABLA ESTILO TERMINAL OPERADOR */}
      
        <div className="gallery-internal-table-container">
          <div className="gallery-internal-table-header">
            <span>ID</span>
            <span>DATA_STREAM // ARCHIVO</span>
            <span>TAMAÑO</span>
            <span>CODEC</span>
            <span>STATUS</span>
          </div>
          
          <div className="gallery-internal-table-body">
            {MOCK_PELICULAS.map((peli) => (
              <div key={peli.id} className="gallery-internal-table-row">
                <span className="gallery-internal-text-cyan">[{peli.id}]</span>
                <span className="gallery-internal-text-white">{peli.titulo}</span>
                <span className="gallery-internal-text-dim">{peli.size}</span>
                <span className="gallery-internal-text-magenta">{peli.codec}</span>
                <span className={`gallery-internal-status-tag gallery-internal-status-${peli.status.toLowerCase()}`}>
                  {peli.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      

    </div>
  );
};

export default GaleriaInterna;