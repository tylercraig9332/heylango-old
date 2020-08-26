const ReportResource = require('./report')

async function create(body) {
    let r = new ReportResource(body) 
    return await r.save()
}

module.exports = {
    create
}