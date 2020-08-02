<template>
  <div>
    <span id="speedometer"></span>
  </div>
</template>

<script>
export default {
  props: ["carInfo"],

  mounted() {
    /* eslint-disable */
    var svg = d3
      .select("#speedometer")
      .append("svg:svg")
      .attr("width", 400)
      .attr("height", 400);

    var gauge = iopctrl
      .arcslider()

      .radius(120)
      .events(false)
      .indicator(iopctrl.defaultGaugeIndicator);
    gauge
      .axis()
      .orient("in")
      .normalize(true)
      .ticks(12)
      .tickSubdivide(3)
      .tickSize(10, 8, 10)
      .tickPadding(5)
      .scale(
        d3.scale
          .linear()
          .domain([0, 160])
          .range([(-3 * Math.PI) / 4, (3 * Math.PI) / 4])
      );

    var segDisplay = iopctrl
      .segdisplay()
      .width(80)
      .digitCount(3)
      .negative(false)
      .decimals(0);

    svg
      .append("g")
      .attr("class", "segdisplay")
      .attr("transform", "translate(130, 200)")
      .call(segDisplay);

    svg
      .append("g")
      .attr("class", "gauge")
      .call(gauge);

    // segDisplay.value(this.carInfo.temp);
    // gauge.value(this.carInfo.temp);

    setInterval(() => {
      const value = Math.floor(Math.random() * 160);
      segDisplay.value(value);
      gauge.value(value);
    }, 100);
  }
};
</script>

<style>
/* css formats for the gauge */
.gauge .domain {
  stroke-width: 2px;
  stroke: #fff;
}

.gauge .tick line {
  stroke: #fff;
  stroke-width: 2px;
}

.gauge line {
  stroke: #fff;
}

.gauge .arc,
.gauge .cursor {
  opacity: 0;
}

.gauge .major {
  fill: #fff;
  font-size: 20px;
  font-family: "Play", verdana, sans-serif;
  font-weight: normal;
}

.gauge .indicator {
  stroke: #ee3311;
  fill: #000;
  stroke-width: 4px;
}

/* css formats for the segment display */
.segdisplay .on {
  fill: #00ffff;
}

.segdisplay .off {
  fill: #00ffff;
  opacity: 0.15;
}
</style>
