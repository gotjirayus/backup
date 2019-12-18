import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const createdate = new Date()
const createbyuser = 'Gotham'

const addteachersubject = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const semesterSubjectId = req.params.id
        const {teacherId,getReport} = req.body
        const sql = `INSERT INTO subjectteacher(
                                                institution_id,
                                                semester_subject_id,
                                                teacher_id,
                                                get_report,
                                                created_date,
                                                created_by_user,
                                                created_by_program,
                                                updated_date,
                                                updated_by_user,
                                                updated_by_program
                                                )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
        const values = [
                        institutionId,
                        semesterSubjectId,
                        teacherId,
                        getReport,
                        createdate,
                        createbyuser,
                        createbyuser,
                        createdate,
                        createbyuser,
                        createbyuser
                    ]
        await pg.query(sql,values)
        res.status(200).json({
            status:200,
            message:'add success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const getteachersubject = async (req,res) => {
    try {
       const response = await pg.query('SELECT * FROM subjectteacher')
       res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const updateteachersubject = async (req,res) => {
    try {
        const subjectTeacherId = req.params.subjectteacherId
        const {teacherId,getReport} = req.body
        const sql = `UPDATE subjectteacher SET 
                                            teacher_id = $1,
                                            get_report = $2,
                                            updated_date = $3,
                                            updated_by_user = $4,
                                            updated_by_program = $5
                            WHERE subject_teacher_id = $6` 
        const values = [
            teacherId,
            getReport,
            createdate,
            createbyuser,
            createbyuser,
            subjectTeacherId
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status:200,
            message:'update success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const deleteteachersubject = async (req,res) => {
    try {
        const subjectTeacherId = req.params.subjectteacherId
        const sql = `DELETE FROM subjectteacher WHERE subject_teacher_id = $1`
        const value = [subjectTeacherId]
        await pg.query(sql,value)
        res.status(200).json({
            status:200,
            message:'Delete success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    } 
}

module.exports = {
    addteachersubject,
    getteachersubject,
    updateteachersubject,
    deleteteachersubject
}