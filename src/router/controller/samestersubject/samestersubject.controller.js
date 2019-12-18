import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const datecreate = new Date()
const usercreate = 'Gotham'

const addsamestersubject = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const { lateCheck, allowLateMinute} = req.body
        const sql1 = 'SELECT semester_id FROM yearsemester WHERE institution_id = $1'
        const value1 = [institutionId]
        const response1 = await pg.query(sql1,value1)
        const samester = response1.rows[1].semester_id
        const sql2 = 'SELECT subject_id FROM subject WHERE institution_id = $1'
        const value2 = [institutionId]
        const response2 = await pg.query(sql2,value2)
        const subject = response2.rows[1].subject_id
        const sql3 = `INSERT INTO samestersubject(
                                            institution_id,
                                            semester_id,
                                            subject_id,
                                            late_check,
                                            allow_late_minute,
                                            created_date,
                                            created_by_user,
                                            created_by_program,
                                            updated_date,
                                            updated_by_user,
                                            updated_by_program
                                            )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
        const value = [
                        institutionId,
                        samester,
                        subject,
                        lateCheck,
                        allowLateMinute,
                        datecreate,
                        usercreate,
                        usercreate,
                        datecreate,
                        usercreate,
                        usercreate 
                    ]
        const response3 = await pg.query(sql3,value)
        res.json(response3)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const getsamestersubject = async (req,res) => {
    try {
        const response = await pg.query(`select t1.semester_subject_id, t2.year_semester,t3.subject_code, t3.subject_name,t1.late_check,t1.allow_late_minute from samestersubject t1
                                        inner join yearsemester t2 on t1.semester_id = t2.semester_id inner join subject t3 on t1.subject_id = t3.subject_id`)
        res.json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const getsamestersubjectbyid = async (req,res) => {
    try {
        const semesterSubjectId = req.params.id
        const sql = `select t2.year_semester,t3.subject_code, t3.subject_name,t1.late_check,t1.allow_late_minute from samestersubject t1
        inner join yearsemester t2 on t1.semester_id = t2.semester_id inner join subject t3 on t1.subject_id = t3.subject_id WHERE semester_subject_id = $1`
        const value = [semesterSubjectId]
        const response = await pg.query(sql,value)
        res.json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const updatesamestersubject = async (req,res) => {
    try {
        const semesterSubjectId = req.params.id
        const { lateCheck, allowLateMinute} = req.body
        const sql = `UPDATE samestersubject SET
                            late_check = $1,
                            allow_late_minute = $2,
                            updated_date = $3,
                            updated_by_user = $4,
                            updated_by_program = $5
                    WHERE semester_subject_id = $6` 
        const value = [
                        lateCheck,
                        allowLateMinute,
                        datecreate,
                        usercreate,
                        usercreate,
                        semesterSubjectId
                    ]   
        await pg.query(sql,value) 
        res.status(200).json({
            status:200,
            message:'update success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const deletesamestersubject = async (req,res) => {
    try {
        const semesterSubjectId = req.params.id
        const sql = `DELETE FROM samestersubject WHERE semester_subject_id = $1`
        const value = [semesterSubjectId]
        await pg.query(sql,value)
        res.json({
            status: 200,
            message: 'delete success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknow internal server error.'
        })
    }
}

module.exports = {
    addsamestersubject,
    getsamestersubject,
    getsamestersubjectbyid,
    updatesamestersubject,
    deletesamestersubject
}