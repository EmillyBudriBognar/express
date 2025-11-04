import express from 'express';

const rota = express();
const porta = 3003; // Using a different port

//Iniciar servidor
rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
});