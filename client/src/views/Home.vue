<template>
  <section class="home">
    <h1 class="home_title">IOT F1 Dashboard</h1>
    <div class="dashboard">
      <div class="box">
        <Gauge :carInfo="carInfo" />
      </div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
    <h1 class="current_temp">
      <!-- <div v-for="{ _id, temp } in carInfo" :key="_id">
        Current Temp : {{ temp }}
      </div> -->
      <div>Current Temp : {{ carInfo.temp }}</div>
    </h1>
  </section>
</template>

<script>
import Gauge from "@/components/gauge2";
export default {
  name: "Home",
  components: {
    Gauge
  },
  data() {
    return {
      carInfo: []
    };
  },
  created() {
    fetch(this.$API_URL)
      .then(res => res.json())
      .then(({ carInfo }) => {
        const last = carInfo[carInfo.length - 1];
        this.carInfo = last;
      });
  }
};
</script>

<style lang="less">
@import "../assets/_variables.less";

.home_title {
  color: @lightTextColor;
  font-size: 2rem;
  margin: 1em 0;
  margin-left: 3em;
}

.dashboard {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  align-content: center;
  margin-top: 4em;

  .box {
    border: 1px solid @accentColor;
    background: @boxColor;
    width: 300px;
    height: 300px;
    border-radius: 15px;
    box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.1);
  }
}

.current_temp {
  color: @accentColor;
  text-align: center;
  margin-top: 1em;
}
</style>
