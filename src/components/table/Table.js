import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/dom'
import {matrix, isCell, shouldResize, nextSelected} from './table.functions'
import {resizeHandler} from './table.resize'
import {createTable} from './table.template'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="1:1"]')
        this.selection.select($cell)

        this.$on('formula:input', (text)=>{
            this.selection.current.text(text)
        })

        this.$on('formula:selected', ()=>{
            this.selection.current.focus()
        })
    }

    toHTML() {
        return createTable(35)
    }

    selectCell($cell) {
        this.selection.select($cell)

        this.$emit('table:cell:selected', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const cells = matrix(this.selection.current, $target).map(
                    (id) => {
                        return this.$root.find(`[data-id ="${id}"]`)
                    }
                )
                this.selection.selectGroup(cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Tab',
            'Enter',
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const {key} = event
            const id = this.selection.current.id(true)

            const newIdSelected = nextSelected(key, id)
            const $next = this.$root.find(`[data-id ="${newIdSelected}"]`)

            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:cell:selected', $(event.target))
    }
}


