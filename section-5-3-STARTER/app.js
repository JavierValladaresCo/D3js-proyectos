async function draw(el, scale) {
  // Data
  const dataset = await d3.json('data.json')
  dataset.sort((a, b) => a - b)

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30

  // Draw Image
  const svg = d3.select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  // Scales
  let colorScale;

  if (scale === 'linear') {
    colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset))
      .range(['white', 'red'])
  } else if (scale === 'quantize') {
    colorScale = d3.scaleQuantize()
      .domain(d3.extent(dataset))
      .range(['white', 'pink', 'red'])
  } else if (scale === 'quantile') {
    colorScale = d3.scaleQuantile()
      .domain(dataset)
      .range(['white', 'pink', 'red'])
  } else if (scale === 'threshold') {
    colorScale = d3.scaleQuantile()
      .domain([45200, 135600])
      .range(['white', 'pink', 'red'])
    console.log('Threshold:', colorScale)

  }

  // Rectangles
  svg.append('g')
    .attr('transform', 'translate(2,2)')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('stroke', 'black')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, i) => {
      return box * (i % 20) // 0, 30, 60.....
    })
    .attr('y', (d, i) => {
      return box * ((i / 20) | 0)
    })
    .attr('fill', (d) => colorScale(d))
}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
draw('#heatmap4', 'threshold')