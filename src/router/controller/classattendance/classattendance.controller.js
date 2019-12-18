const getclassattendance = (req,res) => {
    try {
        res.send('getclassattendance')
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 500,
            message: 'Unknown internal server error.'
        })
    }
}

module.exports = {
    getclassattendance
}