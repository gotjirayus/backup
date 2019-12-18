const getclassschedule = (req,res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const decoed = jwt.verify(token, config.get('jwt.secret'))
        const institutionId = decoed.institutionId
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 500,
            message: 'Unknown internal server error.'
        })
    }
}

module.exports = {
    getclassschedule
}

