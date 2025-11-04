import express, { type Request, type Response } from 'express';
import { App } from './app.js';

const rota = express();
const porta = 3002; // Using a different port

rota.use(express.json());

const gravar = async (req: Request, res: Response) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }

    try {
        const crud = new App();
        await crud.InsertQuery(nome, email);
        return res.status(201).json({ message: 'Usuário inserido com sucesso!' });
    } catch (error) {
        console.error('Erro ao inserir:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

rota.post('/inserirUsuario', gravar);

const listarTodos = async (req: Request, res: Response) => {
    try {
        const crud = new App();
        const usuarios = await crud.executeSearchQuey();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao listar usuários.' });
    }
};

rota.get('/listar-usuarios', listarTodos);

const buscarPorId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    try {
        const crud = new App();
        const usuario = await crud.SearchQueyById(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(`Erro ao buscar usuário ${id}:`, error);
        return res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' });
    }
};

rota.get('/buscar-usuario/:id', buscarPorId);

const atualizar = async (req: Request, res: Response) => {
    const { id, nome, email } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    if (!nome && !email) {
        return res.status(400).json({ message: 'Pelo menos nome ou email deve ser fornecido para atualização.' });
    }

    try {
        const crud = new App();
        await crud.UpdatetQuey(id, nome, email);
        return res.status(200).json({ message: `Usuário ${id} atualizado com sucesso!` });
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${id}:`, error);
        return res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
    }
};

rota.post('/atualizar-usuario', atualizar);

const deletar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    try {
        const crud = new App();
        await crud.DeletetQuey(id);
        return res.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar usuário ${id}:`, error);
        return res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
    }
};

rota.post('/deletar-usuario/:id', deletar);

rota.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
});