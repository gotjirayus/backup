import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const createdate = new Date()
const createbyuser = 'Gotham'

const addstudentsubject = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const semesterSubjectId = req.params.id
        const { studentsId } = req.body
        const sql = `INSERT INTO subjectstudent(
                                                institution_id,
                                                semester_subject_id,
                                                student_id,
                                                created_date,
                                                created_by_user,
                                                created_by_program,
                                                updated_date,
                                                updated_by_user,
                                                updated_by_program
                                                )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`
        const values = [
                        institutionId,
                        semesterSubjectId,
                        studentsId,
                        createdate,
                        createbyuser,
                        createbyuser,
                        createdate,
                        createbyuser,
                        createbyuser
                    ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: "add students success"

        })
    } catch (error) {
      console.log(error)
      res.status(500).json({
          status: 500,
          message: 'Unknow internal server error.'
      })
    }
}

const getstudentsubject = async (req,res) => {
    try {
        const response = await pg.query('SELECT * FROM subjectstudent')
        res.status(200).json(response.rows)
    } catch (error) {
      console.log(error)
      res.status(500).json({
          status: 500,
          message: 'Unknow internal server error.'
      })
    }
}

const updatestudentsubject = async (req,res) => {
    try {
        const subjectstudentID = req.params.subjectstudentID
        const { studentsId } = req.body
        const sql = `UPDATE subjectstudent SET student_id = $1 WHERE subject_student_id = $2`
        const value = [studentsId,subjectstudentID]
        await pg.query(sql,value)
        res.status(200).json({
            status:200,
            message:'update success '
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({
          status: 500,
          message: 'Unknow internal server error.'
      })
    }
}

const deletestudentsubject = async (req,res) => {
    try {
        const subjectstudentID = req.params.subjectstudentID
        const sql = 'DELETE FROM subjectstudent WHERE subject_student_id = $1'
        const value = [subjectstudentID]
        await pg.query(sql,value)
        res.status(200).json({
            status: 200,
            message: 'delete success'
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
    addstudentsubject,
    getstudentsubject,
    updatestudentsubject,
    deletestudentsubject
}