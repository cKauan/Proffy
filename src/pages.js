// Importando o arquivo format.js de forma desistruturada, por isso usando {}, em forma de objeto!
const { weekdays, subjects, getSubject, convertHoursToMinutes } = require('./utils/format');
// Importa o database do db.js
const Database = require('./database/db');
// Importa o multer para que ele possa ser utilizado na função que depois vai ser chamada no arquivo server.js
const multer = require('multer');

// Importando os dados falsos para testes!
// const proffys = require('./database/fakeData');

// pagina principal (index.html)
function pageLanding(req, res) {
    return res.render('index.html');
}
// Pagina study.html
async function pageStudy(req, res) {
    // const filters = req.query
    // return res.render('study.html', {
    //     proffys,
    //     filters,
    //     subjects,
    //     weekdays
    // })
// }
    const filters = req.query;
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subjects, weekdays });
        // Proffy que esta sendo importato, lembre de remove-lo!
    }
    // Converter horas em minutos!
    const timeToMinutes = convertHoursToMinutes(filters.time);

    console.log("Não existem campos vazios!");
    // Pagina rodando sem para hora 1:55
    // Organizar a consulta
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
            AND classes.subject = '${filters.subject}'
    `
    // Caso haja erro na hora da consulta do banco de dados try catch
    try {
        const db = await Database;
        const proffys = await db.all(query);
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        })
        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }

    
}
// Pagina classes.html
function pageGiveClasses(req, res) {
    return res.render('classes.html', { weekdays, subjects });
}
// Arquivos passados durando o POST do formulario!
async function uploadForm(req, res) {
    const createProffy = require('./database/createProffy');
    // Corpo do formulario enviado por metodo POST
    const data = req.body;
    const file = req.file;
    const proffyValue = {
        name: data.name,
        avatar: `http://localhost:5500/uploads/${file.originalname}`,
        whatsapp: data.whatsapp,
        bio: data.bio
    }
    const classValue = {
        subject: data.subject,
        cost: data.cost
    }
    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        }
    })
    try {
        const db = await Database;
        await createProffy(db, { proffyValue, classScheduleValues, classValue });
        let queryString = "?subject=" + data.subject;
        queryString += "&weekday=" + data.weekday[0];
        queryString += "&time=" + data.time_from[0];
        return res.redirect('/study' + queryString );
    } catch (error) {
        console.log(error)
    }
    
    // Arquivo enviado pelo formulario e pego pelo multer
    // 
    // Atualiza as info do proffy com os dados do form
    // data.subject = getSubject(data.subject)
    // Troca o avatar de blob para o arquivo uploaded pelo multer
    // data.avatar = `http://localhost:5500/uploads/${file.originalname}`
    // Envia essas informações para a pagina study
    // proffys.push(data)
    // Mostra no console
    // console.log(data, req.file)
    // Redireciona para a pagina study
}

// Configurações do multer
const storage = multer.diskStorage({
    // Destino do arquivo uploaded
    destination: (req, file, cb) => {
        cb(null, "C:/nlw2/public/uploads")
    },
    // Configurações do nome do arquivo
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})

// Exportando de forma desestruturada todas as funções e uma constante necessarias para que possam ser usadas no arquivo server.js
module.exports = { pageLanding, pageGiveClasses, pageStudy, uploadForm, storage};