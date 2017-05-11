import _ from 'lodash'
import $ from 'jquery'

function componment() {
    var elm = document.createElement('div')
    elm.innerHTML = _.join(['hello', 'webpack'], '')
    return elm
}
document.body.appendChild(componment())
$('body').append($('<p style="color: red">this is add by Jquery, and is hot refresh automatic</p>'))