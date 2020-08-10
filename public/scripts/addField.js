document.querySelector("#add-time").addEventListener('click', () => {
    let newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    let fields = newFieldContainer.querySelectorAll('input');
    fields[0].value = "";
    fields[1].value = "";
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
})

// Implementar funcionalidade de excluir horarios não selecionados
// Implementar página de sucesso!
// Implementar modo noturno e claro