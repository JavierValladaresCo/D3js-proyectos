async function label(d) {
    return d
}

const data = [10, 20, 30, 40, 50]

const el = d3.select('ul')
    .selectAll('li')
    .data(data)
    .join(
        enter => {
            return enter.append('li')
                .style('color', 'blue')
        },
        update => update.style('color', 'green'),
        exit => exit.remove()
    ) // retorna selecciones 
    .text(function (d) {
        label(d).then(val => {
            this.textContent = `El valor es ${val}`
        })
    });

