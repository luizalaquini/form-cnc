import './App.css';
import socketIOClient from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const socket = socketIOClient('https://server-75ps4q3vc-luizalaquini.vercel.app/', {
    transports: ['websocket', 'polling', 'flashsocket']
});
// https://server-cnc.herokuapp.com/ 
// https://server-75ps4q3vc-luizalaquini.vercel.app/


socket.on('recebido_forms', (data) => {
    console.log("ok - " + data);
});

function App() {
    const [modelo, setModelo] = useState('');
    const [numSerie, setNumSerie] = useState('');
    const [capDeCarga, setCapDeCarga] = useState('');
    const [dataFabMes, setDataFabMes] = useState('');
    const [dataFabAno, setDataFabAno] = useState('');
    const [classUtil, setClassUtil] = useState('');
    const [estadoCarga, setEstadoCarga] = useState('');
    const [peso, setPeso] = useState('');
    const [potInstal, setPotInstal] = useState('');
    const [volt, setVolt] = useState('');
    const [nCrea, setNCrea] = useState('');

    function clearForm (){
        for (let input of document.getElementsByClassName('input-field')){
            input.value = '';
        }
    }

    function resetStates(){
        setModelo('');
        setNumSerie('');
        setCapDeCarga('');
        setDataFabMes('');
        setDataFabAno('');
        setClassUtil('');
        setEstadoCarga('');
        setPeso('');
        setPotInstal('');
        setVolt('');
        setNCrea('');
    }

    function handleSubmitToServer(e){
        e.preventDefault();
        socket.emit('data', [modelo, numSerie, capDeCarga, dataFabMes, dataFabAno, classUtil, estadoCarga, peso, potInstal, volt, nCrea]);
        clearForm();
        resetStates();
    }

    /*function successMessage(e){
        e.preventDefault();
        alert("Dados enviados com sucesso!");
    }*/

    function handleChange(e, setFunction){ setFunction(e.target.value); }

    return (
        <div className="App">
            <header className="logos">
                <img alt='Logo Promilaq' src='/logo-Promilaq.png' />
                <img alt='Logo Maquilaq' src='/logo-Maquilaq.png' />
            </header>

            <p className='instructions'>Caracteres permitidos: letras, números, ponto("."), vírgula(","), hífen("-") e barra ("/").</p>

            <form onSubmit={handleSubmitToServer} className="my-form">
                <div className="row">
                    <label className="col-lg-1 col-form-label" htmlFor="modelo">MODELO</label>
                    <input className="input-field col-lg-11" id="modelo" onChange={(e) => handleChange(e, setModelo)} type="text"/>
                </div>
                
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="numSerie">Nº DE SÉRIE</label>
                    <input className="input-field col-lg-4" id="numSerie" onChange={(e) => handleChange(e, setNumSerie)} type="text"/>
                    
                    <label className="col-lg-2 col-form-label special-treatment" htmlFor="capDeCarga">CAP. DE CARGA</label>
                    <input className="input-field col-lg-4" id="capDeCarga" onChange={(e) => handleChange(e, setCapDeCarga)} type="text"/>
                </div>
                
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="dataFabMes">DATA DE FABR.</label>
                    <input className="input-field col-lg-2 col-md-6 col-sm-6" id="dataFabMes" onChange={(e) => handleChange(e, setDataFabMes)} placeholder="MM"/>
                    <input className="input-field col-lg-2 col-md-6 col-sm-6" id="dataFabAno" onChange={(e) => handleChange(e, setDataFabAno)} placeholder="AA"/>
                    
                    <label className="col-lg-3 col-form-label special-treatment" htmlFor="classUtil">CLASSE DE UTILIZAÇÃO</label>
                    <input className="input-field col-lg-3" id="classUtil" onChange={(e) => handleChange(e, setClassUtil)} type="text"/>
                </div>
    
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="estadoCarga">ESTADO DE CARGA</label>
                    <input className="input-field col-lg-5" id="estadoCarga" onChange={(e) => handleChange(e, setEstadoCarga)} type="text"/>
                    
                    <label className="col-lg-1 col-form-label special-treatment" htmlFor="peso">PESO</label>
                    <input className="input-field col-lg-4" id="peso" onChange={(e) => handleChange(e, setPeso)} type="text"/>
                </div>
    
                <div className="row">
                    <label className="col-lg-2 col-form-label" htmlFor="potInstal">POT. INSTALADA</label>
                    <input className="input-field col-lg-5" id="potInstal" onChange={(e) => handleChange(e, setPotInstal)} type="text"/>
        
                    <label className="col-lg-2 col-form-label special-treatment" htmlFor="volt">VOLTAGEM</label>
                    <input className="input-field col-lg-3" id="volt" onChange={(e) => handleChange(e, setVolt)} type="text"/>
                </div>
    
                <div className="row justify-content-center">
                    <label className="col-lg-1 col-form-label" htmlFor="nCrea">Nº CREA</label>
                    <input className="input-field col-lg-4" id="nCrea" onChange={(e) => handleChange(e, setNCrea)} type="text" placeholder='UF-XXXXXX/X'/>
                </div>
                
                <div className="mb-2 mt-3">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
