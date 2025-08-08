const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS aluno (
        cgm,
        nome,
        nascimento_date, 
        cpf_aluno,
        rg,
        genero,
        email_aluno ,
        telefone_aluno,
        endereço,
        cep,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        curso,
        turno,
        turma,
        responsavel,
        grau_parentesco,
        cpf_responsavel,
        telefone_responsavel,
        email_responsavel
        )
    `);
    console.log('Tabelas criadas com sucesso.');
});


///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////

// Cadastrar cliente
app.post('/aluno', (req, res) => {
    const {cgm, nome, nascimento_date, cpf_aluno, rg, genero, email_aluno, telefone_aluno, endereço, cep, numero, complemento, bairro, cidade, estado, curso, turno, turma, responsavel, grau_parentesco, cpf_responsavel, telefone_responsavel, email_responsavel } = req.body;

    if (!nome || !cpf) {
        return res.status(400).send('Nome e CPF são obrigatórios.');
    }

    const query = `INSERT INTO aluno (cgm, nome, nascimento_date, cpf_aluno, rg, genero, email_aluno, telefone_aluno, endereço, cep, numero, complemento, bairro, cidade, estado, curso, turno, turma, responsavel, grau_parentesco, cpf_responsavel, telefone_responsavel, email_responsavel) VALUES (?, ?, ?, ?, ?, ? , ? , ? , ? , ? , ?, ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`;
    db.run(query, [cgm, nome, nascimento_date, cpf_aluno, rg, genero, email_aluno, telefone_aluno, endereço, cep, numero, complemento, bairro, cidade, estado, curso, turno, turma, responsavel, grau_parentesco, cpf_responsavel, telefone_responsavel, email_responsavel], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar aluno.');
        }
        res.status(201).send({ id: this.lastID, message: 'Aluno cadastrado com sucesso.' });
    });
});

// Listar clientes
// Endpoint para listar todos os clientes ou buscar por CPF
app.get('/aluno', (req, res) => {
    const cpf = req.query.cpf || '';  // Recebe o CPF da query string (se houver)

    if (cpf) {
        // Se CPF foi passado, busca clientes que possuam esse CPF ou parte dele
        const query = `SELECT * FROM aluno WHERE cpf LIKE ?`;

        db.all(query, [`%${cpf}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna os clientes encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os clientes
        const query = `SELECT * FROM aluno`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna todos os clientes
        });
    }
});



// Atualizar cliente
app.put('/aluno/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;
    const { nome, email, telefone, endereco } = req.body;

    const query = `UPDATE aluno SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE cpf = ?`;
    db.run(query, [nome, email, telefone, endereco, cpf], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.send('Aluno atualizado com sucesso.');
    });
});





// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});