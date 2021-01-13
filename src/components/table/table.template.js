const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
}

function toCell(_, numberCol) {
    return `<div class="cell" 
        data-number-col="${numberCol + 1}" 
        contenteditable>
    </div>`
}

function toChar(_, index) {
    return String.fromCodePoint(CODES.A + index)
}

function toColumn(col, numberCol) {
    return `
        <div class="column" 
            data-type="resizable" 
            data-number-col=${numberCol + 1}>
                ${col}
            <div class="col-resize" data-resize="col">
            </div>
        </div>
    `
}

function createRow(index, content) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''

    return `
    <div class="row" data-type="resizable">
        <div class="row-info">    
            ${index ? index : ''}
            ${resize}
        </div>
        
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
