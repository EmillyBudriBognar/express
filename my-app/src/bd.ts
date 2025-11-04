import mysql from 'mysql2/promise'

export async function connection(): Promise<mysql.Connection>{
    try {
        const connection = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'dados'
        })

        return connection

    } catch (error) {
        console.error('Não conectado')
        throw error
    }
}
