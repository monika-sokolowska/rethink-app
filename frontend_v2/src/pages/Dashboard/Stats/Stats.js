import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStats, getAveragePerson } from "../../../reducers/statsSlice";
import {
  getTransportFootprint,
  getFoodFootprint,
  getOtherFootprint,
  getCompensatedFootprint,
} from "../../../reducers/dailyFootprintSlice";
import { getHouseholdFootprint } from "../../../reducers/householdFootprintSlice";
import { createUseStyles } from "react-jss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

const useStyles = createUseStyles({
  stats: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "2rem 0",
  },
  statsContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1400px",
    height: "auto",
    backgroundColor: "white",
    padding: "2rem",
    gap: "2rem",
  },
  chartWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 45%",
    minWidth: "300px",
    maxWidth: "600px",
    width: "100%",
  },
  chartContainer: {
    width: "100%",
    minHeight: "400px",
    height: "400px",
    marginTop: "1rem",
    position: "relative",
  },
  doughnutContainer: {
    width: "100%",
    minHeight: "300px",
    height: "300px",
    position: "relative",
    maxWidth: "400px",
    margin: "1rem auto",
  },
  chartTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "rgb(17, 20, 48)",
    marginBottom: "1rem",
    textAlign: "center",
    width: "100%",
  },
  overviewSection: {
    width: "100%",
    maxWidth: "1400px",
    padding: "2rem",
    backgroundColor: "white",
    marginBottom: "0.5rem",
  },
  overviewText: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#2d8659",
    textAlign: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: "400",
    letterSpacing: "-0.01em",
  },
  overviewTextMobile: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#2d8659",
    textAlign: "center",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: "400",
    letterSpacing: "-0.01em",
  },
  "@media (max-width: 1200px)": {
    statsContainer: {
      flexDirection: "column",
      alignItems: "center",
      padding: "1.5rem",
    },
    chartWrapper: {
      flex: "1 1 100%",
      minWidth: "350px",
      maxWidth: "100%",
    },
  },
  "@media (max-width: 768px)": {
    stats: {
      padding: "1rem 0",
      paddingBottom: "5rem",
    },
    statsContainer: {
      padding: "1rem",
      gap: "1.5rem",
    },
    overviewSection: {
      padding: "1rem",
      marginBottom: "0.25rem",
    },
    chartWrapper: {
      minWidth: "100%",
      maxWidth: "100%",
      marginBottom: "2rem",
    },
    chartContainer: {
      minHeight: "350px",
      height: "350px",
    },
    doughnutContainer: {
      minHeight: "300px",
      height: "300px",
      maxWidth: "350px",
    },
    chartTitle: {
      fontSize: "1.25rem",
    },
  },
  "@media (max-width: 480px)": {
    stats: {
      padding: "0.5rem 0",
      paddingBottom: "5rem",
    },
    statsContainer: {
      padding: "0.5rem",
      gap: "1rem",
    },
    chartWrapper: {
      minWidth: "100%",
      maxWidth: "100%",
      marginBottom: "2rem",
    },
    chartContainer: {
      minHeight: "280px",
      height: "280px",
    },
    doughnutContainer: {
      minHeight: "250px",
      height: "250px",
      maxWidth: "300px",
    },
    chartTitle: {
      fontSize: "1rem",
    },
  },
});

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats, averagePerson } = useSelector((store) => store.stats);
  const { transport, food, other, compensated } = useSelector(
    (store) => store.footprint
  );
  const { householdFootprint } = useSelector(
    (store) => store.householdFootprint
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStats());
      dispatch(getAveragePerson());
      dispatch(getTransportFootprint());
      dispatch(getFoodFootprint());
      dispatch(getOtherFootprint());
      dispatch(getCompensatedFootprint());
      dispatch(getHouseholdFootprint());
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const greenShades = ["#2d8659", "#4a9d6e", "#6bb884", "#8dd19f", "#a8e4b8"];

  const chartData =
    stats && user
      ? {
          labels: ["Average Footprint", "Your Footprint", "Your Goal"],
          datasets: [
            {
              label: "Carbon Footprint (kg CO2)",
              data: [
                stats.avgDailyFootprint || 0,
                stats.userDailyFootprint || 0,
                user.mainGoal || 0,
              ],
              backgroundColor: [greenShades[0], greenShades[1], greenShades[2]],
              borderRadius: 8,
            },
          ],
        }
      : null;

  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (item.footprint || 0), 0);
  };

  const footprintTypesData = {
    labels: ["Transport", "Food", "Other", "Compensated"],
    datasets: [
      {
        label: "Carbon Footprint (kg CO2)",
        data: [
          calculateTotal(transport),
          calculateTotal(food),
          calculateTotal(other),
          calculateTotal(compensated),
        ],
        backgroundColor: [
          greenShades[0],
          greenShades[1],
          greenShades[2],
          greenShades[3],
        ],
        borderRadius: 8,
      },
    ],
  };

  const avgHouseholdFootprintValue = averagePerson?.householdFootprint;
  const avgHouseholdFootprint =
    typeof avgHouseholdFootprintValue === "number"
      ? avgHouseholdFootprintValue
      : parseFloat(avgHouseholdFootprintValue) || 0;

  const userHouseholdFootprintValue = householdFootprint?.footprint;
  const userHouseholdFootprint =
    typeof userHouseholdFootprintValue === "number"
      ? userHouseholdFootprintValue
      : parseFloat(userHouseholdFootprintValue) || 0;

  const householdFootprintChartData =
    averagePerson && householdFootprint
      ? {
          labels: ["Average Household Footprint", "Your Household Footprint"],
          datasets: [
            {
              label: "Household Carbon Footprint (kg CO2)",
              data: [avgHouseholdFootprint, userHouseholdFootprint],
              backgroundColor: [greenShades[0], greenShades[1]],
              borderRadius: 8,
            },
          ],
        }
      : null;

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 10,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value =
              typeof context.parsed.y === "number"
                ? context.parsed.y
                : parseFloat(context.parsed.y) || 0;
            return `${value.toFixed(2)} kg CO2`;
          },
        },
        backgroundColor: "white",
        titleColor: "rgb(17, 20, 48)",
        bodyColor: "rgb(17, 20, 48)",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgb(17, 20, 48)",
          callback: function (value) {
            return value + " kg";
          },
        },
        title: {
          display: true,
          text: "kg CO2",
          color: "rgb(17, 20, 48)",
        },
      },
      x: {
        ticks: {
          color: "rgb(17, 20, 48)",
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 12,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value =
              typeof context.parsed === "number"
                ? context.parsed
                : parseFloat(context.parsed) || 0;
            const total = context.dataset.data.reduce(
              (a, b) =>
                (typeof a === "number" ? a : parseFloat(a) || 0) +
                (typeof b === "number" ? b : parseFloat(b) || 0),
              0
            );
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value.toFixed(2)} kg CO2 (${percentage}%)`;
          },
        },
        backgroundColor: "white",
        titleColor: "rgb(17, 20, 48)",
        bodyColor: "rgb(17, 20, 48)",
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  const fullOverviewText = (
    <>
      <p
        style={{
          marginBottom: "0.5rem",
          fontWeight: "600",
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
        }}>
        Track your carbon footprint effortlessly, and make every day count.
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        Our app helps you understand and reduce your environmental impact by
        letting you log your daily carbon footprint across key areas like
        transport, food, and household habits.
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        Get instant insights with clear, easy-to-read stats that show how your
        daily footprint compares to the average person and to the personal goals
        you set in the Goals tab.
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        Whether you're taking your first steps toward sustainable living or
        striving to hit ambitious eco-targets, our app gives you the tools and
        motivation to stay on track.
      </p>
      <p>
        Start today and see how small changes can lead to a lighter, greener
        future.
      </p>
    </>
  );

  const mobileOverviewText = (
    <>
      <p
        style={{
          marginBottom: "0.5rem",
          fontWeight: "600",
          fontSize: "1.15rem",
          letterSpacing: "-0.02em",
        }}>
        Track your carbon footprint effortlessly — and make every day count.
      </p>
      <p>
        Our app helps you understand and reduce your environmental impact by
        letting you log your daily carbon footprint
      </p>
    </>
  );

  return (
    <section className={classes.stats}>
      <div className={classes.overviewSection}>
        <div
          className={
            isMobile ? classes.overviewTextMobile : classes.overviewText
          }>
          {isMobile ? mobileOverviewText : fullOverviewText}
        </div>
      </div>
      <div className={classes.statsContainer}>
        {stats && user && chartData && (
          <div className={classes.chartWrapper}>
            <h2 className={classes.chartTitle}>Carbon Footprint Comparison</h2>
            <div
              className={
                isMobile ? classes.doughnutContainer : classes.chartContainer
              }>
              {isMobile ? (
                <Doughnut data={chartData} options={doughnutChartOptions} />
              ) : (
                <Bar data={chartData} options={barChartOptions} />
              )}
            </div>
          </div>
        )}

        {footprintTypesData.datasets[0].data.some((value) => value > 0) && (
          <div className={classes.chartWrapper}>
            <h2 className={classes.chartTitle}>Daily Footprint by Category</h2>
            <div
              className={
                isMobile ? classes.doughnutContainer : classes.chartContainer
              }>
              {isMobile ? (
                <Doughnut
                  data={footprintTypesData}
                  options={doughnutChartOptions}
                />
              ) : (
                <Bar data={footprintTypesData} options={barChartOptions} />
              )}
            </div>
          </div>
        )}

        {householdFootprintChartData && (
          <div className={classes.chartWrapper}>
            <h2 className={classes.chartTitle}>
              Household Footprint Comparison
            </h2>
            <div
              className={
                isMobile ? classes.doughnutContainer : classes.chartContainer
              }>
              {isMobile ? (
                <Doughnut
                  data={householdFootprintChartData}
                  options={doughnutChartOptions}
                />
              ) : (
                <Bar
                  data={householdFootprintChartData}
                  options={barChartOptions}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Stats;
