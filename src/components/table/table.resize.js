import {$} from '../../core/dom'

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const resize = $resizer.data.resize
    const coords = $parent.getCoords()
    const resizeLine = resize === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
        opacity: 1,
        [resizeLine]: '-5000px',
    })

    const cursor = document.body.style.cursor
    document.body.style.cursor = 'col-resize'

    document.onmousemove = (e) => {
        if (resize === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta

            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta

            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        document.body.style.cursor = cursor

        if (resize === 'col') {
            // $parent.css({width: value + 'px'})
            $root
                .findAll(`[data-number-col="${$parent.data.numberCol}"]`)
                .forEach((cell) => {
                    cell.style.width = value + 'px'
                })
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            right: 0,
            bottom: 0,
        })
    }
}
