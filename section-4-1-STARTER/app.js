async function draw() {
    // Data
    const dataset = await d3.json('data.json')

    const xAccessor = (d) => d.currently.humidity
    const yAccessor = (d) => d.currently.apparentTemperature

    // Dimension
    let dimension = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            rigth: 50
        }
    }

    dimension.ctrwidth = dimension.width - dimension.margin.left - dimension.margin.rigth
    dimension.ctrheight = dimension.height - dimension.margin.top - dimension.margin.left

    // Draw Image
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimension.width)
        .attr('height', dimension.width)

    const ctr = svg.append('g')
        .attr('transform',
            `translate(${dimension.margin.left}, ${dimension.margin.top})`)

    // Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimension.ctrwidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .rangeRound([dimension.ctrheight, 0])
        .nice();

    // Draw circles
    ctr.selectAll('circle')
        .data(dataset)
        .join('circle')
        .attr('cx', d => xScale(xAccessor(d)))
        .attr('cy', d => yScale(yAccessor(d)))
        .attr('r', 5)
        .attr('fill', 'blue')
        .attr('hum', xAccessor)

    // Axes
    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat((d) => d * 100 + '%')
    //.tickValues([0.4, 0.5, 0.8])

    const xAxisGroup = ctr.append('g')
        .call(xAxis)
        .style('transform', `translateY(${dimension.ctrheight}px)`)
        .classed('axis', true)

    xAxisGroup.append('text')
        .attr('x', dimension.ctrwidth / 2)
        .attr('y', dimension.margin.bottom - 10)
        .attr('fill', 'black')
        .text('Humidity')

    const yAxis = d3.axisLeft(yScale)

    const yAxisGroup = ctr.append('g')
        .call(yAxis)
        .classed('axis', true)

    yAxisGroup.append('text')
        .attr('x', -dimension.ctrheight / 2)
        .attr('y', -dimension.margin.left + 15)
        .attr('fill', 'black')
        .html('Temperature &deg; F')
        .style('transform', 'rotate(270deg)')
        .style('text-anchor', 'middle')


}

draw()