document.querySelector("#add-time").addEventListener('click', () => {
    let newFieldContainer = document.querySelector('.schedule-item');
    let fields = newFieldContainer.querySelectorAll('input');
    fields[0].value = "";
    fields[1].value = "";
    document.querySelector('#schedule-items').appendChild(newFieldContainer.cloneNode(true))
})