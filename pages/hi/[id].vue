<script setup lang="ts">
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { useUserStore } from "~/stores/user";
import type VueECharts from "vue-echarts";

type VueEChartsInstance = InstanceType<typeof VueECharts>;
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const pieBaseOptions = {
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

const barChartRef = ref<VueEChartsInstance | null>(null);
const route = useRoute();
const user = useUserStore();
const name = route.params.id;
watchEffect(() => {
  console.log(user);
});

onMounted(async () => {
  await nextTick();
  pieBaseOptions.series[0].data.forEach((item) => {
    item.value = Math.random() * 500;
  });
  // lineChartRef.value?.setOption(pieBaseOptions);
  setTimeout(() => {
    barChartRef.value?.setOption(pieBaseOptions);
  }, 5000);
});
</script>

<template>
  <div m-3>
    <h3>Hi, {{ name }}!</h3>
    <v-chart ref="barChartRef" class="chart" :option="pieBaseOptions" />

    <Counter />

    <div>
      <NuxtLink to="/">Back</NuxtLink>
    </div>
  </div>
</template>
<style lang="scss">
.chart {
  width: 400px;
  height: 400px;
}
</style>
