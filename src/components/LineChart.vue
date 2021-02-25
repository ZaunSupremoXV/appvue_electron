<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado"
        ],
        datasets: [
          {
            label: "Contábil",
            data: [2, 10, 5, 9, 1, 6, 20],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          },
          {
            label: "Fiscal",
            data: [7, 5, 16, 4, 10, 21, 4],
            backgroundColor: "transparent",
            borderColor: "rgba(51, 204, 0, 0.50)",
            pointBackgroundColor: "rgba(186, 68, 70, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );
  }
};
</script>