import type { Connection } from 'mysql2/promise';
import { connection } from './bd.js';

interface Estudante {
  id: number;
  nome: string;
  email: string;
}

export class App {

    async executeSearchQuey(): Promise<Estudante[]> {
        let conn: Connection | null = null;
        try {
            conn = await connection();
            if (!conn) {
                throw new Error('DB Connection failed');
            }
            const sql = "select * from estudante";
            const [rows] = await conn.query(sql);
            console.log('Registro: total de tuplas', rows);
            return rows as Estudante[];
        } catch (error) {
            console.error('Não encontrado');
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async SearchQueyById(id: number): Promise<Estudante | null> {
        let conn: Connection | null = null;
        try {
            conn = await connection();
            if (!conn) {
                throw new Error('DB Connection failed');
            }
            const sql = "select * from estudante where id = ?";
            const [rows] = await conn.query(sql, [id]);
            console.log('Registro: total de tuplas', rows);
            const estudantes = rows as Estudante[];
            return estudantes.length > 0 ? estudantes[0] : null;
        } catch (error) {
            console.error('Não encontrado');
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async InsertQuery(nome: string, email: string): Promise<void> {
        let conn: Connection | null = null;
        try {
            conn = await connection();
            if (!conn) {
                throw new Error('DB Connection failed');
            }
            const sql = "INSERT INTO estudante SET ?";
            const dd = { nome, email };
            await conn.query(sql, dd);
            console.log('Inserção bem-sucedida!');
        } catch (error) {
            console.error('Não encontrado');
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async UpdatetQuey(id: number, nome?: string, email?: string): Promise<any> {
        let conn: Connection | null = null;
        try {
            conn = await connection();
            if (!conn) {
                throw new Error('DB Connection failed');
            }
            const dadosParaAtualizar: Partial<Estudante> = {};
            if (nome) dadosParaAtualizar.nome = nome;
            if (email) dadosParaAtualizar.email = email;

            if (Object.keys(dadosParaAtualizar).length === 0) {
                console.log('Nenhum dado fornecido para atualização.');
                return { affectedRows: 0 };
            }

            const sql = "UPDATE estudante SET ? WHERE id = ?";
            const [result] = await conn.query(sql, [dadosParaAtualizar, id]);
            console.log('Alteração bem-sucedida!');
            return result;
        } catch (error) {
            console.error('Erro ao atualizar registro:', error);
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async DeletetQuey(id: number): Promise<void> {
        let conn: Connection | null = null;
        try {
            conn = await connection();
            if (!conn) {
                throw new Error('DB Connection failed');
            }
            const sql = "delete from estudante where id = ?";
            await conn.query(sql, [id]);
            console.log('Remoção bem-sucedida!');
        } catch (error) {
            console.error('Não encontrado');
            throw error;
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }
}
