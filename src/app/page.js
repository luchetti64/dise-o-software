"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [bathrooms, setBathrooms] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addBathroom = () => {
    setBathrooms([...bathrooms, { counter: 0, status: 'Libre', isClean: true }]);
  };

  const toggleOccupied = (index) => {
    const updatedBathrooms = [...bathrooms];
    if (updatedBathrooms[index].status === 'Libre') {
      updatedBathrooms[index].counter += 1;  // Increment only when changing to Occupied
    }
    updatedBathrooms[index].status = updatedBathrooms[index].status === 'Libre' ? 'Ocupado' : 'Libre';
    setBathrooms(updatedBathrooms);
  };

  const toggleClean = (index) => {
    const updatedBathrooms = [...bathrooms];
    updatedBathrooms[index].isClean = !updatedBathrooms[index].isClean;
    setBathrooms(updatedBathrooms);
  };

  const addToBlacklist = () => {
    if (name && description) {
      setBlacklist([...blacklist, { name, description }]);
      setName('');
      setDescription('');
    }
  };

  const removeFromBlacklist = (index) => {
    const updatedBlacklist = blacklist.filter((_, i) => i !== index);
    setBlacklist(updatedBlacklist);
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      {/* Bathroom Management Section */}
      <div className="mb-5">
        <h1 className="mb-4">Gestionador de baños</h1>
        <button onClick={addBathroom} className="btn btn-primary mb-3">
          Agregar Baño
        </button>
        <div className="row">
          {bathrooms.map((bathroom, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title">Baño {index + 1}</h5>
                  <p className="card-text">Gente que lo ha usado: {bathroom.counter}</p>
                  <p className="card-text">Status: {bathroom.isClean ? 'Limpio' : 'Sucio'}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => toggleOccupied(index)}
                      className={`btn ${bathroom.status === 'Libre' ? 'btn-success' : 'btn-danger'} mb-2`}
                      style={{ flex: 1, marginRight: '10px' }}
                    >
                      {bathroom.status}
                    </button>
                    <button
                      onClick={() => toggleClean(index)}
                      className={`btn ${bathroom.isClean ? 'btn-warning' : 'btn-secondary'} mb-2`}
                      style={{ flex: 1 }}
                    >
                      {bathroom.isClean ? 'Limpio' : 'Sucio'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blacklist Section */}
      <div>
        <h1 className="mb-4">Lista negra</h1>
        <h3 className="mb-4">Gente que no sabe usar el baño</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control ml-2"
          />
        </div>
        <button onClick={addToBlacklist} className="btn btn-danger mb-4">
          Agregar a lista
        </button>
        <ul className="list-group">
          {blacklist.map((person, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#ffe6e6' }}>
              <span>
                <strong>{person.name}</strong>: {person.description}
              </span>
              <button
                onClick={() => removeFromBlacklist(index)}
                className="btn btn-sm btn-outline-danger"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
