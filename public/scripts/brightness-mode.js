// pegamos o valor no localStorage
const nightModeStorage = localStorage.getItem('gmtNightMode')
const nightMode = document.querySelector('#night-mode')

// caso tenha o valor no localStorage
if (nightModeStorage) {
  // ativa o night mode
  document.documentElement.classList.add('dark')

  // já deixa o input marcado como ativo
  nightMode.checked = true
}

// ao clicar mudaremos as cores
nightMode.addEventListener('click', () => {
  // adiciona a classe `dark` ao html
  document.documentElement.classList.toggle('dark')

  // se tiver a classe dark
  if (document.documentElement.classList.contains('dark')) {
    // salva o tema no localStorage
    localStorage.setItem('gmtNightMode', true)
    return
  }
  // senão remove
  localStorage.removeItem('gmtNightMode')
})