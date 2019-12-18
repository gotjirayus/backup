import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const datecreate = new Date()
const usercreate = 'Gotham'


const addholiday = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const {date,description} = req.body
        const sql = `INSERT INTO calendar(
                     institution_id,
                     date,
                     description,
                     created_date,
                     created_by_user,
                     created_by_program,
                     updated_date,
                     updated_by_user,
                     updated_by_program
                    )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`
        const values = [
                     institutionId,
                     date,   
                     description, 
                     datecreate,
                     usercreate,
                     usercreate,
                     datecreate,
                     usercreate,
                     usercreate
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status : 200,
            message : 'Add Holiday Suceess'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const getholiday = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const sql = `SELECT calendar_id,
                            institution_id,
                            TO_CHAR(date, 'dd-mm-yyyy')date,
                            description,
                            TO_CHAR(updated_date, 'dd-mm-yyyy')created_date,
                            created_by_user,
                            created_by_program,
                            TO_CHAR(updated_date, 'dd-mm-yyyy')updated_date,
                            updated_by_user,
                            updated_by_program 
                    FROM calendar WHERE institution_id = $1`
        const value = [institutionId]
        const response = await pg.query(sql, value)
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const updateholiday = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const calendarID = req.params.id
        const {date,description} = req.body
        const sql = `UPDATE calendar SET 
                            institution_id = $1,
                            date = $2,
                            description = $3,
                            updated_date = $4,
                            updated_by_user = $5,
                            updated_by_program = $6
                    WHERE calendar_id = $7`
        const values = [
                institutionId,
                date,
                description,
                datecreate,
                usercreate,
                usercreate,
                calendarID
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'Update Holiday Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const deleteholiday = async (req,res) => {
    try {
        const calendarID = req.params.id
        const sql = `DELETE FROM calendar WHERE calendar_id = $1`
        const value = [calendarID]
        await pg.query(sql, value)
        res.status(200).json({
            status:200,
            message: 'Delete Holiday success'
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
    addholiday,
    getholiday,
    updateholiday,
    deleteholiday
}