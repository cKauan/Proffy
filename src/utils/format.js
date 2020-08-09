// Dados que precisaram ser formatados para uso no banco de dados!

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]
// pega as info do form
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1;
    return subjects[arrayPosition];
}

// Função que converte horas em minutos
function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(':');
    return Number(( hour * 60 ) + minutes);
}
// Exporta tudo dentro de um objeto!
module.exports = { weekdays, subjects, getSubject, convertHoursToMinutes }