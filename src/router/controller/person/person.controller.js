import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const datecreate = new Date()
const usercreate = 'Gotham'

const addperson = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const { 
            personCode, 
            prefixOfName, 
            firstName, 
            lastName, 
            type,
            mobilePoneNo,
            email,
            lineToken
        } = req.body
        const sql = `INSERT into PERSON(
                             institution_id,
                             person_code,
                             prefix_of_name,
                             first_name,
                             last_name,
                             type,
                             mobile_phone_no,
                             email,
                             line_token,
                             created_date,
                             created_by_user,
                             created_by_program,
                             updated_date,
                             updated_by_user,
                             updated_by_program
                )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`
        const values = [
            institutionId,
            personCode,
            prefixOfName,
            firstName,
            lastName,
            type,
            mobilePoneNo,
            email,
            lineToken,
            datecreate,
            usercreate,
            usercreate,
            datecreate,
            usercreate,
            usercreate
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status:200,
            message:'Add Person Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const getperson = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const sql = `SELECT person_id,
                            institution_id,
                            person_code,
                            prefix_of_name,
                            first_name,
                            last_name,
                            type,
                            mobile_phone_no,
                            email,
                            line_token,
                            TO_CHAR(updated_date, 'dd-mm-yyyy')created_date,
                            created_by_user,
                            created_by_program,
                            TO_CHAR(updated_date, 'dd-mm-yyyy')updated_date,
                            updated_by_user,
                            updated_by_program 
                    FROM person WHERE  institution_id =$1`
        const value = [institutionId]
        const response = await pg.query(sql,value)
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const updateperson = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const personID = req.params.id
        const {
            personCode, 
            prefixOfName, 
            firstName, 
            lastName, 
            type,
            mobilePoneNo,
            email,
            lineToken
        } = req.body
        const sql = `UPDATE person SET
                            institution_id = $1,
                            person_code = $2,
                            prefix_of_name = $3,
                            first_name = $4,
                            last_name = $5,
                            type = $6,
                            mobile_phone_no = $7,
                            email = $8,
                            line_token = $9,
                            updated_date = $10,
                            updated_by_user = $11,
                            updated_by_program = $12
                     WHERE person_id = $13`
        const values = [
            institutionId,
            personCode,
            prefixOfName,
            firstName,
            lastName,
            type,
            mobilePoneNo,
            email,
            lineToken,
            datecreate,
            usercreate,
            usercreate,
            personID
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'Update Person Suceess'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:500,
            message: 'Unknown internal server error.'
        })
    }
}

const deleteperson = async (req,res) => {
   try {
    const personID = req.params.id
    const sql = 'DELETE FROM person WHERE person_id = $1'
    const value = [personID]
    await pg.query(sql,value)
    res.status(200).json({
        status: 200,
        message: 'Delete Person Success'
    })
   } catch (error) {
    console.log(error)
    res.status(500).json({
        status:500,
        message: 'Unknown internal server error.'
    })
   }
}

module.exports = {
    addperson,
    getperson,
    updateperson,
    deleteperson
}