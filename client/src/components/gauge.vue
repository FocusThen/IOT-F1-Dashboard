<template>
  <div>
    <div class="container A">
      <svg class="typeRange" height="165" width="330" view-box="0 0 330 165">
        <g class="scale" stroke="red"></g>

        <path class="outline" d="" />
        <path class="fill" d="" />
        <polygon class="needle" points="220,10 300,210 220,250 140,210" />
      </svg>
    </div>
  </div>
</template>

<script>
var svg = document.querySelector(".typeRange");
var outline = document.querySelector(".outline");
var fill = document.querySelector(".fill");
var needle = document.querySelector(".needle");

export default {
  data() {
    return {
      rad: Math.PI / 180,
      NS: "http:www.w3.org/2000/svg",
      W: parseInt(window.getComputedStyle(svg, null).getPropertyValue("width")),
      offset: 40,
      cx: ~~(this.W / 2),
      cy: 160,
      r1: this.cx - this.offset,
      delta: ~~(this.r1 / 4),
      initVal: 20,
      isDragging: false,
      x1: this.cx + this.r1,
      y1: this.cy,
      r2: this.r1 - this.delta,
      x2: this.offset,
      y2: this.cy,
      x3: this.x1 - this.delta,
      y3: this.cy
    };
  },
  mounted() {
    function drawScale() {
      var sr1 = this.r1 + 5;
      var sr2 = this.r2 - 5;
      var srT = this.r1 + 20;
      var scale = document.querySelector(".scale");
      this.clearRect(scale);
      var n = 0;
      for (var sa = -180; sa <= 0; sa += 18) {
        var sx1 = this.cx + sr1 * Math.cos(sa * this.rad);
        var sy1 = this.cy + sr1 * Math.sin(sa * this.rad);
        var sx2 = this.cx + sr2 * Math.cos(sa * this.rad);
        var sy2 = this.cy + sr2 * Math.sin(sa * this.rad);
        var sxT = this.cx + srT * Math.cos(sa * this.rad);
        var syT = this.cy + srT * Math.sin(sa * this.rad);

        var scaleLine = document.createElementNS(this.NS, "line");
        var scaleLineObj = {
          class: "scale",
          x1: sx1,
          y1: sy1,
          x2: sx2,
          y2: sy2
        };
        this.setSVGAttributes(scaleLine, scaleLineObj);

        scale.appendChild(scaleLine);

        var scaleText = document.createElementNS(this.NS, "text");
        var scaleTextObj = {
          class: "scale",
          x: sxT,
          y: syT
        };
        this.setSVGAttributes(scaleText, scaleTextObj);
        scaleText.textContent = n * 10;
        scale.appendChild(scaleText);

        n++;
      }
    }

    function drawInput(cx, cy, r1, offset, delta, a) {
      var d1 = getD1(cx, cy, r1, offset, delta);
      var d2 = getD2(cx, cy, r1, offset, delta, a);

      drawScale();

      outline.setAttributeNS(null, "d", d1);
      fill.setAttributeNS(null, "d", d2);

      drawNeedle(cx, cy, r1, a);
    }

    function updateInput(p, cx, cy, r1, offset, delta) {
      var x = p.x;
      var y = p.y;
      var lx = cx - x;
      var ly = cy - y;

      var a = Math.atan2(ly, lx) / this.rad - 180;

      drawInput(cx, cy, r1, offset, delta, a);
    }

    function getD1(cx, cy, r1, offset, delta) {
      var x1 = cx + r1;
      var y1 = cy;
      var x2 = offset;
      var y2 = cy;
      var r2 = r1 - delta;
      var x3 = x1 - delta,
        y3 = cy;
      var d1 =
        "M " +
        x1 +
        ", " +
        y1 +
        " A" +
        r1 +
        "," +
        r1 +
        " 0 0 0 " +
        x2 +
        "," +
        y2 +
        " H" +
        (offset + delta) +
        " A" +
        r2 +
        "," +
        r2 +
        " 0 0 1 " +
        x3 +
        "," +
        y3 +
        " z";
      return d1;
    }

    function getD2(cx, cy, r1, offset, delta, a) {
      a *= this.rad;
      var r2 = r1 - delta;
      var x4 = cx + r1 * Math.cos(a);
      var y4 = cy + r1 * Math.sin(a);
      var x5 = cx + r2 * Math.cos(a);
      var y5 = cy + r2 * Math.sin(a);

      var d2 =
        "M " +
        x4 +
        ", " +
        y4 +
        " A" +
        r1 +
        "," +
        r1 +
        " 0 0 0 " +
        this.x2 +
        "," +
        this.y2 +
        " H" +
        (offset + delta) +
        " A" +
        r2 +
        "," +
        r2 +
        " 0 0 1 " +
        x5 +
        "," +
        y5 +
        " z";
      return d2;
    }

    function drawNeedle(cx, cy, r1, a) {
      var nx1 = cx + 5 * Math.cos((a - 90) * this.rad);
      var ny1 = cy + 5 * Math.sin((a - 90) * this.rad);

      var nx2 = cx + (r1 + 15) * Math.cos(a * this.rad);
      var ny2 = cy + (r1 + 15) * Math.sin(a * this.rad);

      var nx3 = cx + 5 * Math.cos((a + 90) * this.rad);
      var ny3 = cy + 5 * Math.sin((a + 90) * this.rad);

      var points =
        nx1 + "," + ny1 + " " + nx2 + "," + ny2 + " " + nx3 + "," + ny3;
      needle.setAttributeNS(null, "points", points);
    }

    var pa = this.initVal * 1.8 - 180;
    var p = {};
    p.x = this.cx + this.r1 * Math.cos(pa * this.rad);
    p.y = this.cy + this.r1 * Math.sin(pa * this.rad);
    updateInput(p, this.cx, this.cy, this.r1, this.offset, this.delta);
  },
  methods: {
    clearRect(node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    },
    setSVGAttributes(elmt, oAtt) {
      for (var prop in oAtt) {
        elmt.setAttributeNS(null, prop, oAtt[prop]);
      }
    }
  }
};
</script>

<style>
/*GREENS: #4ac4ac, #399988, #0f4534, #0a1a17;*/
* {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  margin: 100px auto 50px auto;
  height: 165px;
  width: 330px;
}

.initialValue {
  border: none;
  border-bottom: 1px solid #399988;
  color: #399988;
  display: block;
  width: 3em;
  background-color: transparent;
  margin: 1em auto;
  outline: none;
  font-size: 16px;
  text-align: center;
}
/*SVG*/

svg {
  margin: 0px;
  padding: 0;
  cursor: pointer;
  border: 1px solid #0a1a17;
}

svg.focusable {
  border: 1px solid #0f4534;
}

.outline,
.fill,
.center,
.needle,
.scale,
.outline {
  fill: #0f4534;
}

.fill {
  fill: #399988;
}

.needle {
  fill: #aa0000;
}

.scale {
  stroke: #aaa;
}

text {
  text-anchor: middle;
  dominant-baseline: alphabetic;
  font: 12px verdana, sans-serif;
  fill: #aaa;
}
</style>
