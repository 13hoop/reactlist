import _ from 'lodash'

function componment() {
    var elm = document.createElement('div')
    elm.innerHTML = _.join(['hello', 'webpack'], '')
    return elm
}
document.body.appendChild(componment())