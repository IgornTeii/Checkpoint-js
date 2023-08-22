let listaTarefa = []

const botaoAddTarefa = document.querySelector("#btnAddTarefa")
const botaoListarPorImportancia = document.querySelector("#btnListarPorImportancia")

botaoAddTarefa.addEventListener("click", (evento) => {
    evento.preventDefault();

    const descricao = document.querySelector("#idDescricao").value;
    const autor = document.querySelector("#idAutor").value;
    const departamento = document.querySelector("#idDepartamento").value;
    const valor = document.querySelector("#idValor").value;
    const duracao = document.querySelector("#idDuracao").value;

    const importanciaElementos = document.getElementsByName('importancia');
    let importancia;
    for (const elemento of importanciaElementos) {
        if (elemento.checked) {
            importancia = elemento.value;
            break;
        }
    }

    const tarefa = {
        descricao,
        autor,
        departamento,
        importancia,
        valor,
        duracao
    };

    listaTarefa.push(tarefa);
    atualizarLista();
});

botaoListarPorImportancia.addEventListener("click", () => {
    const tarefasOrdenadas = listaTarefa.slice().sort((a, b) => {
        const valoresImportancia = { 'Importante': 3, 'Razoável': 2, 'Baixo': 1 };
        return valoresImportancia[b.importancia] - valoresImportancia[a.importancia];
    });
    atualizarLista(tarefasOrdenadas);
});

function atualizarLista(tarefas = listaTarefa) {
    const listaTarefasUL = document.querySelector("#listaTarefa");
    listaTarefasUL.innerHTML = '';

    tarefas.forEach(tarefa => {
        let li = document.createElement("li");
        li.textContent = `${tarefa.descricao} - ${tarefa.autor} - ${tarefa.departamento} - ${tarefa.importancia}`;
        if (tarefa.valor) li.textContent += ` - ${tarefa.valor}`;
        if (tarefa.duracao) li.textContent += ` - ${tarefa.duracao}`;

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = " x ";
        li.appendChild(botaoExcluir);

        listaTarefasUL.appendChild(li);

        botaoExcluir.addEventListener("click", (evt) => {
            evt.preventDefault();

            let indiceTarefa = listaTarefa.indexOf(tarefa);

            if (indiceTarefa !== -1) {
                listaTarefa.splice(indiceTarefa, 1);
            }

            evt.target.parentNode.remove();
        });
    });

    // Resetar valores dos inputs
    document.querySelector("#idDescricao").value = "";
    document.querySelector("#idAutor").value = "";
    document.querySelector("#idDepartamento").value = "";
    document.querySelector('input[name="importancia"]:checked').checked = false;
    document.querySelector("#idValor").value = "";
    document.querySelector("#idDuracao").value = "";
}
