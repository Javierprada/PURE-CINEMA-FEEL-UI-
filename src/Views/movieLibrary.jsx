import React from 'react';
import './movieLibrary.css'

const MovieLibrary = () => {
    // Datos de simulación listos para cuando conectes MySQL Workbench
    const mockMovies = [
        { id: 1, titulo: 'BLADE RUNNER 2049', genero: 'CIENCIA FICCIÓN', director: 'Denis Villeneuve', duracion: '164', fecha: '2026-06-01' },
        { id: 2, titulo: 'MATRIX REVOLUTIONS', genero: 'CIENCIA FICCIÓN', director: 'Lana Wachowski', duracion: '129', fecha: '2026-05-20' }
    ];

    return (
        <div className="admin-v4-glass-card" style={{ padding: '2rem', width: '100%' }}>
            <div className="admin-v4-section-indicator" style={{ marginBottom: '2rem' }}>
                <div className="admin-v4-indicator-bar" style={{ backgroundColor: '#00fbfb' }}></div>
                <h3 style={{ color: '#ff00ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    BIBLIOTECA MASTER / LOGS DE DATOS
                </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="admin-v4-crud-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TÍTULO ORIGINAL</th>
                            <th>GÉNERO</th>
                            <th>DIRECTOR</th>
                            <th>DURACIÓN</th>
                            <th>LANZAMIENTO</th>
                            <th style={{ textAlign: 'center' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockMovies.map((movie) => (
                            <tr key={movie.id}>
                                <td style={{ color: '#00fbfb', fontWeight: 'bold' }}>#CR-0{movie.id}</td>
                                <td style={{ fontWeight: 'bold', color: '#fff' }}>{movie.title || movie.titulo}</td>
                                <td>{movie.genero}</td>
                                <td>{movie.director || 'N/A'}</td>
                                <td>{movie.duracion} MIN</td>
                                <td>{movie.fecha}</td>
                                <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <button className="btn-action edit" style={{ color: '#00fbfb', background: 'transparent', border: '1px solid rgba(0,251,251,0.3)', padding: '4px 8px', cursor: 'pointer' }}>
                                        EDITAR
                                    </button>
                                    <button className="btn-action delete" style={{ color: '#ff00ff', background: 'transparent', border: '1px solid rgba(255,0,255,0.3)', padding: '4px 8px', cursor: 'pointer' }}>
                                        BORRAR
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieLibrary;