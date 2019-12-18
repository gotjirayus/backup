//import library
const { Router } = require('express')
const expressjwt = require('express-jwt')
const config  = require('config')
const router = Router()

//import files
const { getinstitution,getinstitutionbyid,addinstitution,updateinstitution,deleteinstitution} = require('./controller/institution/institution.controller')
const { verifydataInstitution } = require('./controller/institution/institution.verification')
const {login,token,logout} = require('./controller/auth/auth.controller')

const { addholiday, getholiday, updateholiday, deleteholiday} = require('./controller/calendar/calendar.controller')

const { addsemester, getsemester, updatesemester, deletesemester} = require('./controller/yearsemester/yearsemester.controller')

const { addperson, getperson, updateperson, deleteperson} = require('./controller/person/person.controller')

const { addsubject, getsubject, updatesubject, deletesubject} = require('./controller/subject/subject.controller')

const { addsamestersubject, getsamestersubject, getsamestersubjectbyid, updatesamestersubject, deletesamestersubject} = require('./controller/samestersubject/samestersubject.controller')

const { addteachersubject, getteachersubject, updateteachersubject, deleteteachersubject } = require('./controller/teachersubject/teachersubject.controller')

const { addstudentsubject, getstudentsubject, updatestudentsubject, deletestudentsubject } = require('./controller/studentsubject/studentsubject.controller')

const { addsubjectschedule, getsubjectschedule, updatesubjectschedule, deletesubjectschedule } = require('./controller/subjectschedule/subjectschedule.controller')

const {getclassschedule} = require('./controller/classschedule/classschedule.controller')

const {getclassattendance} = require('./controller/classattendance/classattendance.controller')

// const {faces,recog} = require('./controller/app') 

const auth = expressjwt({secret: config.get('jwt.secret')})

// router.get('/faces',faces)
// router.post('/recog',recog)

// TODO @route       /institution
router.get('/institution', getinstitution)
router.get('/institution/:id', getinstitutionbyid)
router.post('/institution', verifydataInstitution, addinstitution)
router.put('/institution/:id', updateinstitution)
router.delete('/institution/:id', deleteinstitution)

//TODO               /login
router.get('/user',auth, (req, res) => {res.json('ok')})
router.post('/login',login)
router.post('/token',token)
router.delete('/logout',logout)

// TODO @route       /calendar
router.post('/calendar',auth,addholiday)
router.get('/calendar',auth,getholiday)
router.put('/calendar/:id',auth, updateholiday)
router.delete('/calendar/:id',auth,deleteholiday)

//TODO @route        /yearsemester
router.post('/yearsemester',auth, addsemester)
router.get('/yearsemester',auth, getsemester)
router.put('/yearsemester/:id',auth, updatesemester)
router.delete('/yearsemester/:id',auth, deletesemester)

//TODO @route        /person
router.post('/person',auth, addperson)
router.get('/person',auth, getperson)
router.put('/person/:id',auth, updateperson)
router.delete('/person/:id',auth, deleteperson)

//TODO @route        /subject
router.post('/subject', auth, addsubject)
router.get('/subject', auth, getsubject)
router.put('/subject/:id', auth, updatesubject)
router.delete('/subject/:id', auth, deletesubject)

//TODO               /samestersubject
router.post('/samestersubject',auth, addsamestersubject)
router.get('/samestersubject',auth, getsamestersubject)
router.get('/samestersubject/:id', getsamestersubjectbyid)
router.put('/samestersubject/:id', updatesamestersubject)
router.delete('/samestersubject/:id',deletesamestersubject)

//TODO               /samestersubject/personsuject
router.post('/samestersubject/:id/teachersubject',auth, addteachersubject)
router.get('/samestersubject/:id/teachersubject',auth, getteachersubject)
router.put('/samestersubject/:id/teachersubject/:subjectteacherId',auth, updateteachersubject)
router.delete('/samestersubject/:id/teachersubject/:subjectteacherId',auth, deleteteachersubject)

//TODO              /sudentsubject
router.post('/samestersubject/:id/sudentsubject',auth, addstudentsubject)
router.get('/samestersubject/:id/sudentsubject',auth, getstudentsubject)
router.put('/samestersubject/:id/sudentsubject/:subjectstudentID',auth, updatestudentsubject)
router.delete('/samestersubject/:id/sudentsubject/:subjectstudentID',auth, deletestudentsubject)

//TODO
router.post('/samestersubject/:id/subjectschedule',auth, addsubjectschedule)
router.get('/samestersubject/:id/subjectschedule',auth, getsubjectschedule)
router.put('/samestersubject/:id/subjectschedule/:subjectscheduleId',auth, updatesubjectschedule)
router.delete('/samestersubject/:id/subjectschedule/:subjectscheduleId',auth, deletesubjectschedule)

//TODO              /classschedule
router.get('/classschedule',auth,getclassschedule)

//TODO              //classsattendance
router.get('/classattendance',auth,getclassattendance)


module.exports = router
