import pg from '../../../postgres-connect'
const jwt = require('jsonwebtoken')
const config  = require('config')

const createdate = new Date()
const usercreate = 'Gotham'

const addsemester = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const {yearSemester,startDate,endDate} = req.body
        const sql = `INSERT INTO yearsemester(
                                    institution_id,
                                    year_semester,
                                    start_date,
                                    end_date,
                                    created_date,
                                    created_by_user,
                                    created_by_program,
                                    updated_date,
                                    updated_by_user,
                                    updated_by_program
                                 )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`
        const values = [
                    institutionId,
                    yearSemester,
                    startDate,
                    endDate,
                    createdate,
                    usercreate,
                    usercreate,
                    createdate,
                    usercreate,
                    usercreate
        ]   
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'add Yearsemester Success'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const getsemester = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const sql = `SELECT semester_id,
                            institution_id,
                            year_semester,
                            TO_CHAR(start_date, 'dd-mm-yyyy')start_date,
                            TO_CHAR(end_date, 'dd-mm-yyyy')end_date,
                            TO_CHAR(created_date, 'dd-mm-yyyy')created_date,
                            created_by_user,
                            created_by_program,
                            TO_CHAR(updated_date, 'dd-mm-yyyy')updated_date,
                            updated_by_user,
                            updated_by_program 
                     FROM yearsemester WHERE institution_id = $1`
        const value = [institutionId]
        const response = await pg.query(sql ,value)
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const updatesemester = async (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
        const semesterID = req.params.id
        const {yearSemester,startDate,endDate} = req.body
        const sql = `UPDATE yearsemester SET
                            institution_id = $1,
                            year_semester = $2,
                            start_date = $3,
                            end_date = $4, 
                            updated_date = $5,
                            updated_by_user = $6,
                            updated_by_program = $7
                     WHERE semester_id = $8`
        const values = [
            institutionId,
            yearSemester,
            startDate,
            endDate,
            createdate,
            usercreate,
            usercreate,
            semesterID
        ]
        await pg.query(sql,values)
        res.status(200).json({
            status: 200,
            message: 'Update Suceess'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

const deletesemester = async (req,res) => {
    try {
        const semesterID = req.params.id
        const sql = `DELETE FROM yearsemester WHERE semester_id = $1`
        const value = [semesterID]
        await pg.query(sql, value)
        res.status(200).json({
            status: 200,
            message:'Delete semester Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
}

module.exports = {
    addsemester,
    getsemester,
    updatesemester,
    deletesemester
}