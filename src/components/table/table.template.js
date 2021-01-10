const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
}

function toCell() {
    return `<div class="cell" contenteditable></div>`
}

function toChar(_, index) {
    return String.fromCodePoint(CODES.A + index)
}

function toColumn(col) {
    return `<div class="column">${col}</div>`
}

function createRow(index, content) {
    return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div>

        <div class="row-data">
            ${content}
        </div>
    </div>
`
}

export function createTable(rowsCount = 25) {
    const colsCount = CODES.Z - CODES.A + 1

    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let numberRow = 0; numberRow < rowsCount; numberRow++) {
        const cells = new Array(colsCount).fill('').map(toCell).join('')

        rows.push(createRow(numberRow + 1, cells))
    }

    return rows.join('')
}
