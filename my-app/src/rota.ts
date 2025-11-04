import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { App } from './app.js';

const rota = express();
const porta = 3001; // Using a different port to avoid conflict with apirest

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirectory = path.join(__dirname, 'public');

rota.get('/', (req: Request, res: Response) => {
   res.sendFile('index.html', { root: rootDirectory });
});

rota.get('/sobre', (req: Request, res: Response) => {
    res.sendFile('sobre.html', { root: rootDirectory });
});

const gravar = (req: Request, res: Response) => {
    const crud = new App();
    const nomeRecebido = req.query.nome as string;
    const emailRecebido = req.query.email as string;
    crud.InsertQuery(nomeRecebido, emailRecebido);
    res.send('Gravado com sucesso');
};

rota.get('/inserir', gravar);

rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
});