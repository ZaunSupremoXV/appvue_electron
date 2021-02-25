<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ],
        datasets: [
          {
            label: "2020",
            backgroundColor: "#bd0000",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: "2021",
            backgroundColor: "#00adbd",
            data: [20, 60, 59, 39, 100, 48, 74, 80, 40, 50, 12, 11]
          },
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
