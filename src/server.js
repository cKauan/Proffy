const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const multer = require('multer');
const path = require('path');
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

function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1;
    return subjects[arrayPosition];
}

function pageLanding(req, res) {
    return res.render('index.html');
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render('study.html', {
        proffys,
        filters,
        subjects,
        weekdays
    })
}

function pageGiveClasses(req, res) {
    const data = req.query;
    const isNotEmpty = Object.keys(data).length > 0;
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect('/study');
    }
    return res.render('classes.html', {
        weekdays,
        subjects
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/nlw2/public/uploads")
      },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})
const upload = multer({storage});

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
    autoescape: true,
})

server
    .use(express.static("public/uploads"))
    .use(express.static("public"))
    .get('/', pageLanding)
    .get("/study", pageStudy)
    .get("/classes", pageGiveClasses)
    .post('/study', upload.single("avatar1"), (req, res) => {
            const data = req.body;
            data.subject = getSubject(data.subject)
            proffys.push(data)
            console.log(data, req.file)
            return res.redirect('/study');
    })
    .listen(5500)