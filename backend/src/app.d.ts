import type { RowDataPacket } from 'mysql2';
interface User extends RowDataPacket {
    id: number;
    nome: string;
    email: string;
}
export declare class App {
    executeSearchQuery(): Promise<User[]>;
    searchQueryById(id: number): Promise<User | null>;
    insertQuery(nome: string, email: string): Promise<any>;
    updateQuery(id: number, nome?: string, email?: string): Promise<any>;
    deleteQuery(id: number): Promise<any>;
}
export {};
//# sourceMappingURL=app.d.ts.map