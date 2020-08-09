// Arquivo com dados falsos para possiveis testes do banco de dados

// Importa a funcionalidade path que acredito ser nativa do nodejs, não precisei instalar nenhuma outra dependência!
const path = require('path')

const proffys = [{
    name: "Diego Fernandes",
    bio: "Nothing too interesting",
    avatar: path.win32.basename('uploads/instagram.png'),
    whatsapp: "85992476020",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
},
{
    name: "Diego Fernandes",
    bio: "Química",
    avatar: "https://images.unsplash.com/photo-1596453193951-671a680f2375?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    whatsapp: "85992476020",
    subject: "Nothing too interesting",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
}
]


// Caso eu quero exportar só preciso descomentar essa linha!
module.exports = proffys