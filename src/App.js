import './App.css';
import socketIOClient from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const socket = socketIOClient('http://localhost:5000');

socket.on('Recebido-pelo-servidor', () => {
    console.log("ok");
});

function App() {
    
    const [modelo, setModelo] = useState('');
    const [numSerie, setNumSerie] = useState('');
    const [capDeCarga, setCapDeCarga] = useState('');
    const [dataFab, setDataFab] = useState('');
    const [classUtil, setClassUtil] = useState('');
    const [estadoCarga, setEstadoCarga] = useState('');
    const [peso, setPeso] = useState('');
    const [potInstal, setPotInstal] = useState('');
    const [volt, setVolt] = useState('');
    const [nCrea, setNCrea] = useState('');

    function handleSubmitToServer(e){
        e.preventDefault();
        socket.emit('data', [modelo, numSerie, capDeCarga, dataFab, classUtil, estadoCarga, peso, potInstal, volt, nCrea]);
    }

    /*function clearForm(e){
        e.preventDefault();
        setModelo('');
    }

    function successMessage(e){
        e.preventDefault();
        alert("Dados enviados com sucesso!");
    }*/

    function handleChange(e, setFunction){ setFunction(e.target.value); }

    return (
        <div className="container">
            <form onSubmit={handleSubmitToServer}>
                <div className="row mt-5">
                    <label className="col-lg-2 col-form-label" htmlFor="modelo">MODELO</label>
                    <div className="col-lg-10">
                        <input className="form-control" id="modelo" onChange={(e) => handleChange(e, setModelo)} type="text"/>
                    </div>
                </div>
                
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="numSerie">Nº DE SÉRIE</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="numSerie" onChange={(e) => handleChange(e, setNumSerie)} type="text"/>
                    </div>
    
                    <label className="col-lg-3 col-form-label" htmlFor="capDeCarga">CAP. DE CARGA</label>
                    <div className="col-lg-3">
                        <input className="form-control" id="capDeCarga" onChange={(e) => handleChange(e, setCapDeCarga)} type="text"/>
                    </div>
                </div>
                
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="dataFab">DATA DE FABR.</label>
                    <div className="col-lg-3">
                        <input className="form-control" id="dataFab" onChange={(e) => handleChange(e, setDataFab)} placeholder="MM/AA"/>
                    </div>
        
                    <label className="col-lg-3 col-form-label" htmlFor="classUtil">CLASSE DE UTILIZAÇÃO</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="classUtil" onChange={(e) => handleChange(e, setClassUtil)} type="text"/>
                    </div>
                </div>
    
                <div className="row">
                    <label className="col-lg-3 col-form-label" htmlFor="estadoCarga">ESTADO DE CARGA</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="estadoCarga" onChange={(e) => handleChange(e, setEstadoCarga)} type="text"/>
                    </div>
                    
                    <label className="col-lg-1 col-form-label" htmlFor="peso">PESO</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="peso" onChange={(e) => handleChange(e, setPeso)} type="text"/>
                    </div>
                </div>
    
                <div className="row">
                    <label className="col-lg-3 col-form-label" htmlFor="potInstal">POT. INSTALADA</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="potInstal" onChange={(e) => handleChange(e, setPotInstal)} type="text"/>
                    </div>
        
                    <label className="col-lg-2 col-form-label" htmlFor="volt">VOLTAGEM</label>
                    <div className="col-lg-3">
                        <input className="form-control" id="volt" onChange={(e) => handleChange(e, setVolt)} type="text"/>
                    </div>
                </div>
    
                <div className="row justify-content-center">
                    <label className="col-lg-2 col-form-label" htmlFor="nCrea">Nº CREA</label>
                    <div className="col-lg-4">
                        <input className="form-control" id="nCrea" onChange={(e) => handleChange(e, setNCrea)} type="text"/>
                    </div>
                </div>
                
                <div className="mb-5 mt-3">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
  );
}

export default App;