async function cadastraraluno(event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById("nome").value,
        cgm: document.getElementById("cgm").value,
        nascimento_date: document.getElementById("nascimento_date").value,
        cpf_aluno: document.getElementById("cpf_aluno").value,
        rg: document.getElementById("rg").value,
        genero: document.getElementById("genero").value,
        email_aluno: document.getElementById("email_aluno").value,
        telefone_aluno: document.getElementById("telefone_aluno").value,
        endereço: document.getElementById("endereço").value,
        cep: document.getElementById("cep").value,
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        curso: document.getElementById("curso").value,
        turno: document.getElementById("turno").value,
        turma: document.getElementById("turma").value,
        responsavel: document.getElementById("responsavel").value,
        grau_parentesco: document.getElementById("grau_parentesco").value,
        cpf_responsavel: document.getElementById("cpf_responsavel").value,
        telefone_responsavel: document.getElementById("telefone_responsavel").value,
        email_responsavel: document.getElementById("email_responsavel").value
    };

    try {
        const response = await fetch('/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Aluno cadastrado com sucesso!");
            document.getElementById("aluno-form").reset();
        } else {
            alert(`Erro: ${result.message}`);cpf
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar aluno.");
    }
}
// Função para listar todos os clientes ou buscar clientes por CPF
async function listaralunos() {
    const cpf = document.getElementById('cpf').value.trim();  // Pega o valor do CPF digitado no input

    let url = '/aluno';  // URL padrão para todos os clientes

    if (cpf) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cpf=${cpf}`;
    }

    try {
        const response = await fetch(url);
        const aluno = await response.json();

        const tabela = document.getElementById('tabela-aluno');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (aluno.length === 0) {
            // Caso não encontre clientes, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum aluno encontrado.</td></tr>';
        } else {
            aluno.forEach(aluno => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.telefone}</td>
                    <td>${aluno.endereco}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
    }
}
// Função para atualizar as informações do cliente
async function atualizaraluno() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const alunoAtualizado = {
        nome,
        email,
        telefone,
        endereco,
        cpf
    };

    try {
        const response = await fetch(`/aluno/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoAtualizado)
        });

        if (response.ok) {
            alert('Aluno atualizado com sucesso!');
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar aluno: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        alert('Erro ao atualizar aluno.');
    }
}


async function limpaaluno() {
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('endereco').value = '';

}