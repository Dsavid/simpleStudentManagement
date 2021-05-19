import React from "react";
import { Bar } from "react-chartjs-2";
function BarChart({ students = 0, teachers = 0, courses = 0 }) {
  return (
    <div>
      <Bar
        data={{
          labels: ["Students", "Teachers", "Courses"],
          datasets: [
            {
              label: "# of people",
              data: [students, teachers, courses],
              backgroundColor: ["orange"],
            },
          ],
        }}
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

export default BarChart;
