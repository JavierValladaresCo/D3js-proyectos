//const PBrowser = document.querySelector('#fee')
const body = d3.select('body')

const p = body.append('p')
    .attr('class', 'foo')
    .text('Hellow World!')

const p2 = d3.select('.foo')

//console.log(PBrowser)
console.log(p2) 