import mysql from 'mysql2/promise';
export async function connection() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dados'
    });
    return conn;
}
//# sourceMappingURL=bd.js.map