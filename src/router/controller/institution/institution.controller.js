import pg from '../../../postgres-connect'
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const date = new Date()
const usercreate = 'Gotham'

const addinstitution = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status:422,
            msg:errors.errors[0].msg
        })
    }
    try { 
        const {
            institutionCode,
            institutionName,
            logo,
            installationCode,
            username,
            password,
            email,
            preferenceLanguage
        } = req.body
        const sqlcheckcode = `SELECT institution_code FROM institution WHERE institution_code = $1`
        const valuecode = [institutionCode]
        const responseinstitutioncode = await pg.query(sqlcheckcode,valuecode)
        const sqlcheckuser = `SELECT username FROM institution WHERE username = $1`
        const valueuser = [username] 
        const responseuser = await pg.query(sqlcheckuser,valueuser)
        const sqlcheckemail = `SELECT email FROM institution WHERE email = $1`
        const valueemail = [email]
        const responseemail = await pg.query(sqlcheckemail,valueemail)
        if (responseinstitutioncode.rows[0]){
            res.status(422).json({ 
                status: 422,
                errors: { msg: 'institution is already used.' } 
            });
        }else if (responseuser.rows[0]){
            res.status(422).json({
                status: 422,
                error: {msg: 'username is already used.'}
            })
        }else if (responseemail.rows[0]){
            res.status(422).json({
                status: 422,
                error: {msg: 'email is already used.'}
            })
        }else {
            const hashedpassword = await bcrypt.hash(password,12)
            const sqladdinstitution = `INSERT INTO institution (
                                institution_code,
                                institution_name,
                                logo,
                                installation_code,
                                username,
                                password,
                                email,
                                preference_language,
                                created_date,
                                created_by_user,
                                created_by_program,
                                updated_date,
                                updated_by_user,
                                updated_by_program
                            )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`
            const values = [
                        institutionCode,
                        institutionName,
                        logo,
                        installationCode,
                        username,
                        hashedpassword,
                        email,
                        preferenceLanguage,
                        date,
                        usercreate,
                        usercreate,
                        date,
                        usercreate,
                        usercreate,
            ]
            await pg.query(sqladdinstitution,values)
            res.status(200).json({
                status: 200,
                message: 'Registration completed'
            })        
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.',
        })
    }
}

const getinstitution = async (req,res) => {
   try {
        const response = await pg.query(`SELECT institution_id,
                                                institution_code,
                                                institution_name,
                                                logo,
                                                installation_code,
                                                username,
                                                password,
                                                email,
                                                preference_language,
                                                TO_CHAR(created_date, 'dd-mm-yyyy')created_date,
                                                created_by_user,
                                                created_by_program,
                                                TO_CHAR(updated_date, 'dd-mm-yyyy')updated_date,
                                                updated_by_user,
                                                updated_by_program
                                          FROM institution`)
        res.status(200).json(response.rows)
   } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
   }
}

const getinstitutionbyid = async (req,res) => {
    try {
        const institutionID = req.params.id
        const sql = `SELECT * FROM institution WHERE institution_id = $1`
        const value = [institutionID]
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

const updateinstitution = async (req,res) => {
    try {
        const institutionID = req.params.id
        const {
            institutionCode,
            institutionName,
            logo,
            installationCode,
            username,
            password,
            email,
            preferenceLanguage
        } = req.body
        const hashedpassword = await bcrypt.hash(password,12)
        const sql = `UPDATE institution SET
                            institution_code = $1,
                            institution_name = $2,
                            logo = $3,
                            installation_code = $4,
                            username = $5,
                            password = $6,
                            email = $7,
                            preference_language = $8,
                            updated_date = $9,
                            updated_by_user = $10,
                            updated_by_program = $11
                    WHERE institution_id = $12`    
        const values = [
                            institutionCode,
                            institutionName,
                            logo,
                            installationCode,
                            username,
                            hashedpassword,
                            email,
                            preferenceLanguage,
                            date,
                            usercreate,
                            usercreate,
                            institutionID
                       ]
        await pg.query(sql,values)
        res.json({
            status: 200,
            message: 'update success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.',
        })
    }
}

const deleteinstitution = async (req,res) => {
    try {
        const institutionID = req.params.id
        const sql = `DELETE FROM institution WHERE institution_id = $1`
        const value = [institutionID]
        await pg.query(sql,value)
        res.json({
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
    addinstitution,
    getinstitution,
    getinstitutionbyid,
    updateinstitution,
    deleteinstitution
}