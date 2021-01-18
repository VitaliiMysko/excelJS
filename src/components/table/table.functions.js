import {range} from '../../core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($current, $targer) {
    const current = $current.id(true)
    const targer = $targer.id(true)

    const rows = range(current.row, targer.row)
    const cols = range(current.col, targer.col)

    return cols.reduce((acc, col) => {
        rows.forEach((row) => {
            acc.push(`${row}:${col}`)
        })
        return acc
    }, [])
}

export function nextSelected(key, {row, col}) {
    const MIN_VALUE = 0

    switch (key) {
    case 'Enter':
    case 'ArrowDown':

        row = row === (document.querySelectorAll(`[data-resize="row"]`)
            .length - 1) ? row : row + 1
        break

    case 'Tab':
    case 'ArrowRight':

        col = col === (document.querySelectorAll(`[data-resize="col"]`)
            .length - 1) ? col : col + 1

        break

    case 'ArrowLeft':
        col = col === MIN_VALUE ? col : col - 1

        break

    case 'ArrowUp':
        row = row === MIN_VALUE ? row : row - 1
        break
    }

    return `${row}:${col}`
}
