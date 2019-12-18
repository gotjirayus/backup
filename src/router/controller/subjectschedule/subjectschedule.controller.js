import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const createdate = new Date()
const createbyuser = 'Gotham'

const addsubjectschedule = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const semesterSubjectId = req.params.id
        const {roomNo, classDay, startTime, endTime} = req.body
        const sql = `INSERT INTO subjectschedule(
                                                  institution_id,
                                                  semester_subject_id,
                                                  room_no,
                                                  class_day,
                                                  start_time,
                                                  end_time,
                                                  created_date,
                                                  created_by_user,
                                                  created_by_program,
                                                  updated_date,
                                                  updated_by_user,
                                                  updated_by_program
                                                )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`
        const values = [
            institutionId,
            semesterSubjectId,
            roomNo,
            classDay,
            startTime,
            endTime,
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
            message:'Add suvjectschedule success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const getsubjectschedule = async (req,res) => {
    try {
        const response = await pg.query('SELECT * FROM subjectschedule')
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const updatesubjectschedule = async (req,res) => {
    try {
        const subjectscheduleId = req.params.subjectscheduleId
        const {roomNo, classDay, startTime, endTime} = req.body
        const sql = `UPDATE subjectschedule SET 
                                                room_no = $1,
                                                class_day = $2,
                                                start_time = $3,
                                                end_time = $4,
                                                updated_date = $5,
                                                updated_by_user = $6,
                                                updated_by_program = $7 
                                            WHERE subject_schedule_id = $8`
        const values = [
            roomNo,
            classDay,
            startTime,
            endTime, 
            createdate,
            createbyuser,
            createbyuser,
            subjectscheduleId 
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'Update success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknow internal server error.'
        })
    }
}

const deletesubjectschedule = async (req,res) => {
    try {
        const subjectscheduleId = req.params.subjectscheduleId
        const sql = 'DELETE FROM subjectschedule WHERE subject_schedule_id = $1' 
        const values = [subjectscheduleId]
        await pg.query(sql,values)
        res.status(200).json({
            status:200,
            message: 'Delete Success'
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
    addsubjectschedule,
    getsubjectschedule,
    updatesubjectschedule,
    deletesubjectschedule
}