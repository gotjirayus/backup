import pg from '../../../postgres-connect'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config  = require('config')

let refreshtokens = []

const login = (req,res) => {
   try {
     const { institutionCode,username, password } = req.body  
     const query = {
        text: `SELECT * FROM institution WHERE institution_code = $1`,
        values: [institutionCode],
      }
     pg.query(query, async (error, response) => {
        if (!response.rows[0]) {
            res.status(400).json({ 
                status: 200, 
                message: 'institution not found'
            });
        } else {
            if(username !== response.rows[0].username){
                res.status(400).json({
                    status:400,
                    message: 'Account not found'
                })
            }
            const decode = await bcrypt.compare(password, response.rows[0].password);
            if(!decode){
                res.status(400).json({ 
                    status: 200, 
                    message: 'password is meatch'
                });
            }
            const payload ={
                            institutionId: response.rows[0].institution_id,
                            institutionCode: response.rows[0].institution_code,
                            institution_name: response.rows[0].institution_name,
                            logo: response.rows[0].logo,
                            installationCode: response.rows[0].installation_code,
                            username: response.rows[0].username,
                            password: response.rows[0].password,
                            email: response.rows[0].email,
                            preferenceLanguage: response.rows[0].preference_language,
                
            }
            const accesstoken = generateaccesstoken(payload)
            const genrefreshtoken = jwt.sign(payload, config.get('jwt.refresh'))
            refreshtokens.push(genrefreshtoken)
            res.status(200).json({ accessToken:accesstoken, refreshToken:refreshtokens })
        } 
      })
   } catch (error) {
       console.log(error)
       res.status(500).json({
        status: 500,
        message: 'Unknown internal server error.'
       })
   }
}

const token = (req, res) => {
    try {
        const refreshtoken = req.body.token
        if (refreshtoken == null){
            res.sendStatus(401)
        }
        if (!refreshtoken.includes(refreshtoken)){
            res.sendStatus(403)
        }
        jwt.verify(refreshtoken, config.get('jwt.refresh'), (err, payload) => {
            if (err){
                res.sendStatus(403)
            } 
            const accessToken = generateaccesstoken({user: payload.username})
            res.json({ accessToken: accessToken })
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
           })
    }
  
}

const logout = (req, res) => {
    try {
        refreshtokens = refreshtokens.filter(token => token !== req.body.token)
        res.status(200).json('logout')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: 'Unknown internal server error.'
        })
    }
 }

function generateaccesstoken(payload) {
    return jwt.sign(payload, config.get('jwt.secret'), { expiresIn: 360000})
}

module.exports = {
    login,
    token,
    logout,
}