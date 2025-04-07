import fs from 'fs'

export function readDataFile(dataFile) {
    try {
        const raw = fs.readFileSync(dataFile, 'utf-8')
        return JSON.parse(raw)
    } catch (err) {
        console.error(`Error reading file ${dataFile}:`, err.message)
        return []
    }
}

export function writeDataFile(dataFile, data) {
    try {
        const formatted = JSON.stringify(data, null, 2)
        fs.writeFileSync(dataFile, formatted)
        console.log(`File saved: ${dataFile}`)
    } catch (err) {
        console.error(`Error writing file ${dataFile}:`, err.message)
    }
}
