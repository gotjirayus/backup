import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const createdate = new Date()
const createbyuser = 'Gotham'

const addsubject = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const { subjectCode, subjectName, } = req.body
        const sql = `INSERT INTO subject(
            institution_id,
            subject_code,
            subject_name,
            created_date,
            created_by_user,
            created_by_program,
            updated_date,
            updated_by_user,
            updated_by_program
        )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`
        const values = [
             institutionId,
             subjectCode,
             subjectName,
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
            message: 'Add Subject Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const getsubject = async (req,res) => {
   try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const sql = `SELECT subject_id,
                            institution_id,
                            subject_code,
                            subject_name,
                            TO_CHAR(created_date, 'dd-mm-yyyy')created_date,
                            created_by_user,
                            created_by_program,
                            TO_CHAR(created_date, 'dd-mm-yyyy')updated_date,
                            updated_by_user,
                            updated_by_program
                    FROM subject WHERE institution_id = $1`
        const value = [institutionId]
        const response = await pg.query(sql,value)
        res.status(200).json(response.rows)
   } catch (error) {
       console.log(error)
       res.status(500).json({
           status: 500,
           message: 'Unknown internal server error.'
       })
   }
}

const updatesubject = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const subjectID = req.params.id
        const {subjectCode, subjectName, } = req.body
        const sql = `UPDATE subject SET 
                            institution_id = $1,
                            subject_code = $2,
                            subject_name = $3,
                            updated_date = $4,
                            updated_by_user = $5,
                            updated_by_program = $6
                    WHERE subject_id = $7` 
        const values = [
            institutionId,
            subjectCode,
            subjectName,
            createdate,
            createbyuser,
            createbyuser,
            subjectID
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'Update Subject Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const deletesubject = async (req,res) => {
   try {
    const subjectID = req.params.id
    const sql = `DELETE FROM subject WHERE subject_id = $1`
    const value = [subjectID]
    await pg.query(sql,value)
    res.status(200).json({
        status: 200,
        message: 'Delete Subject Success'
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
    addsubject,
    getsubject,
    updatesubject,
    deletesubject
}