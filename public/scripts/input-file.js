var $input = document.getElementById('avatar'),
    $fileName = document.getElementById('file-name'),
    $labelText = document.getElementById('label-avatar'),
    $modal = document.getElementById('modal'),
    $cancelButton = document.getElementById('cancelar'),
    $confirmButton = document.getElementById('confirmar'),
    $closeItem = document.getElementById('close-item'),
    $hiddenInput = document.getElementById('hidden-text');


$modal.style.display = 'none';
const img = document.createElement("img");


$input.addEventListener('change', function () {
    document.getElementsByClassName('opacity')[0].style.opacity = '0.2';
    $modal.style.display = 'block';
    $confirmButton.addEventListener('click', () => {
        getImage(img);
        // $hiddenInput.innerHTML = img.src;
        // $hiddenInput.childNodes[0].nodeValue = img.src;
        $labelText.style.backgroundColor = '#3ce98a';
        $labelText.style.borderStyle = 'solid';
        $labelText.style.color = '#fff';
        $hiddenInput.value = img.src;
        $fileName.appendChild(img);
        $labelText.innerHTML = 'Arquivo adicionado com sucesso';
        $modal.style.display = 'none';
        document.getElementsByClassName('opacity')[0].style.opacity = '1';
    })
    $closeItem.addEventListener('click', () => {
        $modal.style.display = 'none';
        document.getElementsByClassName('opacity')[0].style.opacity = '1';
    })
    $cancelButton.addEventListener('click', () => {
        $modal.style.display = 'none';
        document.getElementsByClassName('opacity')[0].style.opacity = '1';
    })
});

function getImage(img) {
    img.src = URL.createObjectURL($input.files[0]);
    img.height = 100;
    img.onload = function () {
        URL.revokeObjectURL($input.src);
    }
    return img;
}
