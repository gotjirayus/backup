const { check } = require('express-validator');

const verifydataInstitution = [ 
    check('institutionCode').not().isEmpty().withMessage('verify institutionCode.'),
    check('institutionName').not().isEmpty().withMessage('verify institutionName.'),
    check('installationCode').not().isEmpty().withMessage('verify installationCode.'),
    check('username').not().isEmpty().withMessage('verify username.'),
    check('password').not().isEmpty().withMessage('verify password.').isLength({ min: 6 }).withMessage('should you password 6 Alphabet.'),
    check('email').not().isEmpty().withMessage('verify email.').isEmail().withMessage('checkemail'),
    check('preferenceLanguage').not().isEmpty().withMessage('verify preferenceLanguage'),
]
module.exports = {
    verifydataInstitution
}