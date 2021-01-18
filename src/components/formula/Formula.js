import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div
                id="formula"
                class="input"
                contenteditable="true"
                spellcheck="false"
            ></div>
        `
    }

    init() {
        super.init()

        this.formulaInput = this.$root.find('#formula')

        this.$on('table:cell:input', ($cell) => {
            this.formulaInput.text($cell.text())
        })

        this.$on('table:cell:selected', ($cell) => {
            this.formulaInput.text($cell.text())
        })
    }


    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:selected')
        }
    }
}
