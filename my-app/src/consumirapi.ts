interface Campos {
    id: string;
    nome: string;
    email: string;
}

export function preencheCampos(campos: Campos) {
    (document.getElementById("id") as HTMLInputElement).value = campos.id;
    (document.getElementById("nome") as HTMLInputElement).value = campos.nome;
    (document.getElementById("email") as HTMLInputElement).value = campos.email;
}

export async function achaAlunos() {
    const n = parseInt((document.getElementById("id") as HTMLInputElement).value);
    const urls = 'http://localhost:3000/usuarios/' + `${n}`;

    const myInitGet = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const dados = await fetch(urls, myInitGet);
    const elens = await dados.json();

    console.log("Conteúdo de elens:", elens);

    if (elens && elens.length > 0) {
        preencheCampos(elens[0]);
    }
}