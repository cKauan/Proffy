const Database = require('./db');
const createProffy = require('./createProffy');
Database.then(async (db) => {
    // Inserir Dados 
    proffyValue = {
        name: "Diego Fernandes",
        bio: "Nothing too interesting",
        avatar: "https://images.unsplash.com/photo-1596453193951-671a680f2375?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        whatsapp: "85992476020",
    }
    classValue = {
        // Proffy id virá pelo banco de dados
        subject: 1,
        cost: "20",
    }
    classScheduleValues = [
        // Class id vira pelo banco de dados, apos cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    // createProffy(db)
    // await createProffy(db, {proffyValue, classScheduleValues, classValue})

    // Consultar os dados inseridos
    // Todos os Proffys

    // const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor e trazer junto os dados do professor

    // const selectClassesAndProffys = await db.all(`
    //     SELECT classes.*, proffys.*
    //     FROM proffys
    //     JOIN classes ON (classes.proffy_id = proffys.id)
    //     WHERE classes.proffy_id = 1;
    // `)
    // console.log(selectClassesAndProffys);

    // O horário que a pessoa trabalha, por exemplo é das 8h - 18h
    // time_from precisa ser menor ou igual ao horario especificado
    // time_to precisa ser maior que o time_from
    
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    // console.log(selectClassesSchedules)
})