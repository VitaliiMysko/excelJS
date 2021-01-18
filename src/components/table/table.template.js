const CODES = {
    A: 'A'.charCodeAt(0),
    Z: 'Z'.charCodeAt(0),
}

function toCell(numberRow) {
    return function toCells(_, numberCol) {
        return `<div class="cell" 
        data-number-col="${numberCol}"
        data-type="cell"
        data-id="${numberRow}:${numberCol}"  
        contenteditable>
    </div>`
    }
}

function toChar(_, index) {
    return String.fromCodePoint(CODES.A + index)
}

function toColumn(col, numberCol) {
    return `
        <div class="column" 
            data-type="resizable" 
            data-number-col=${numberCol}>
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
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(numberRow))
            .join('')

        rows.push(createRow(numberRow + 1, cells))
    }

    return rows.join('')
}


