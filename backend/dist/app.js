import { connection } from './bd.js';
export class App {
    async executeSearchQuery() {
        let conn;
        try {
            conn = await connection();
            let sql = "select * from estudante";
            const [rows] = await conn.query(sql);
            return rows;
        }
        catch (error) {
            console.error("Não encontrado");
            throw error;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }
    async searchQueryById(id) {
        let conn;
        try {
            conn = await connection();
            let sql = "select * from estudante where id = ?";
            const [rows] = await conn.query(sql, [id]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            console.error("Não encontrado");
            throw error;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }
    async insertQuery(nome, email) {
        let conn;
        try {
            conn = await connection();
            let sql = "INSERT INTO estudante SET ?";
            let dd = { nome, email };
            const [rows] = await conn.query(sql, dd);
            return rows;
        }
        catch (error) {
            console.error("Não encontrado");
            throw error;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }
    async updateQuery(id, nome, email) {
        let conn;
        try {
            conn = await connection();
            let dadosParaAtualizar = {};
            if (nome)
                dadosParaAtualizar.nome = nome;
            if (email)
                dadosParaAtualizar.email = email;
            if (Object.keys(dadosParaAtualizar).length === 0) {
                return { affectedRows: 0 };
            }
            let sql = "UPDATE estudante SET ? WHERE id = ?";
            const [result] = await conn.query(sql, [dadosParaAtualizar, id]);
            return result;
        }
        catch (error) {
            console.error("Erro ao atualizar registro:", error);
            throw error;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }
    async deleteQuery(id) {
        let conn;
        try {
            conn = await connection();
            let sql = "delete from estudante where id = ?";
            const [rows] = await conn.query(sql, [id]);
            return rows;
        }
        catch (error) {
            console.error("Não encontrado");
            throw error;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }
}
//# sourceMappingURL=app.js.map