const fs = require('fs');


//Making JSON file readable
const owner = JSON.parse(
    fs.readFileSync(`${__dirname}/../api/owner.json`)
)
const readings = JSON.parse(
    fs.readFileSync(`${__dirname}/../api/reading.json`)
)

exports.checkID = (req, res, next, val) => {
    console.log(`Reading id is: ${val}`);
    if (req.params.id * 1 > readings.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.reading) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Missing title or reading'
        })
    }
    next()
}

exports.getAllReadings = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: readings.length,
        data: {
            readings
        }
    })
}
exports.getReadings = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const reading = readings.find(el => el.id === id);
    if (!reading) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            reading
        }
    })
}
exports.createReadings = (req, res) => {
    //console.log(req.body)
    const newId = readings[readings.length - 1].id + 1;
    const newReadings = Object.assign({ id: newId }, req.body);

    readings.push(newReadings);
    fs.writeFile(`${__dirname}/api/reading.json`, JSON.stringify(readings), err => {
        res.status(201).json({
            status: 'success',
            data: { 
                reading: newReadings
            }
        })
    })
}
exports.updateReadings = (req, res) => {
    if (req.params.id * 1 > readings.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: { 
            reading: '<Updated reading here....'
        }
    })
}
exports.deleteReadings = (req, res) => {
    if (req.params.id * 1 > readings.length) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}