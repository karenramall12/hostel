function salvarCSV() {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;

    if (!nome || !data) {
        alert("Por favor, preencha o nome e a data.");
        return;
    }

    let csvContent = `Nome do Voluntário: ${nome}\n`;
    csvContent += `Data: ${data}\n\n`;
    csvContent += "Tarefa,Feito,Observações\n";

    const tarefas = document.querySelectorAll(".checklist-table tbody tr");
    tarefas.forEach(tarefa => {
        const descricao = tarefa.cells[0].innerText;
        const feito = tarefa.cells[1].querySelector('input').checked ? 'Sim' : 'Não';
        const observacao = tarefa.cells[2].querySelector('input').value || "Nenhuma";
        csvContent += `"${descricao}","${feito}","${observacao}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Checklist_${nome}_${data}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function enviarWhatsApp() {
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;

    if (!nome || !data) {
        alert("Por favor, preencha o nome e a data.");
        return;
    }

    let mensagem = `Nome do Voluntário: ${nome}\nData: ${data}\n\n`;
    const tarefas = document.querySelectorAll(".checklist-table tbody tr");
    tarefas.forEach(tarefa => {
        const descricao = tarefa.cells[0].innerText;
        const feito = tarefa.cells[1].querySelector('input').checked ? 'Sim' : 'Não';
        const observacao = tarefa.cells[2].querySelector('input').value || "Nenhuma";
        mensagem += `- ${descricao}\n  Feito: ${feito}\n  Observações: ${observacao}\n\n`;
    });

    const mensagemFormatada = encodeURIComponent(mensagem);
    const whatsappURL = `https://wa.me/?text=${mensagemFormatada}`;
    window.open(whatsappURL, "_blank");
}
