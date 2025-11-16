import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStats } from "../../../reducers/statsSlice";
import {
  getTransportFootprint,
  getFoodFootprint,
  getOtherFootprint,
  getCompensatedFootprint,
} from "../../../reducers/dailyFootprintSlice";
import { createUseStyles } from "react-jss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
    minWidth: "400px",
    maxWidth: "600px",
  },
  chartContainer: {
    width: "100%",
    minHeight: "500px",
    height: "500px",
    marginTop: "1rem",
  },
  chartTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "rgb(17, 20, 48)",
    marginBottom: "1rem",
    textAlign: "center",
    width: "100%",
  },
});

const Stats = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats } = useSelector((store) => store.stats);
  const { transport, food, other, compensated } = useSelector(
    (store) => store.footprint
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getStats());
      dispatch(getTransportFootprint());
      dispatch(getFoodFootprint());
      dispatch(getOtherFootprint());
      dispatch(getCompensatedFootprint());
    }
  }, [dispatch, user?.id]);

  // Green shades color palette
  const greenShades = [
    "#2d8659", // Dark green
    "#4a9d6e", // Medium-dark green
    "#6bb884", // Medium green
    "#8dd19f", // Light-medium green
    "#a8e4b8", // Light green
  ];

  const chartData =
    stats && user
      ? [
          {
            name: "Average Footprint",
            value: stats.avgDailyFootprint || 0,
            color: greenShades[0],
          },
          {
            name: "Your Footprint",
            value: stats.userDailyFootprint || 0,
            color: greenShades[1],
          },
          {
            name: "Your Goal",
            value: user.mainGoal || 0,
            color: greenShades[2],
          },
        ]
      : [];

  // Calculate totals for each footprint type
  const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (item.footprint || 0), 0);
  };

  const footprintTypesData = [
    {
      name: "Transport",
      value: calculateTotal(transport),
      color: greenShades[0],
    },
    {
      name: "Food",
      value: calculateTotal(food),
      color: greenShades[1],
    },
    {
      name: "Other",
      value: calculateTotal(other),
      color: greenShades[2],
    },
    {
      name: "Compensated",
      value: calculateTotal(compensated),
      color: greenShades[3],
    },
  ];

  return (
    <section className={classes.stats}>
      <div className={classes.statsContainer}>
        {stats && user && chartData.length > 0 && (
          <div className={classes.chartWrapper}>
            <h2 className={classes.chartTitle}>Carbon Footprint Comparison</h2>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: "rgb(17, 20, 48)" }}
                  />
                  <YAxis
                    label={{
                      value: "kg CO2",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "rgb(17, 20, 48)" },
                    }}
                    tick={{ fill: "rgb(17, 20, 48)" }}
                  />
                  <Tooltip
                    formatter={(value) => {
                      const numValue =
                        typeof value === "number"
                          ? value
                          : parseFloat(value) || 0;
                      return [`${numValue.toFixed(2)} kg CO2`, "Value"];
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Carbon Footprint (kg CO2)"
                    radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {footprintTypesData.some((item) => item.value > 0) && (
          <div className={classes.chartWrapper}>
            <h2 className={classes.chartTitle}>Daily Footprint by Category</h2>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={footprintTypesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: "rgb(17, 20, 48)" }}
                  />
                  <YAxis
                    label={{
                      value: "kg CO2",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "rgb(17, 20, 48)" },
                    }}
                    tick={{ fill: "rgb(17, 20, 48)" }}
                  />
                  <Tooltip
                    formatter={(value) => {
                      const numValue =
                        typeof value === "number"
                          ? value
                          : parseFloat(value) || 0;
                      return [`${numValue.toFixed(2)} kg CO2`, "Value"];
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Carbon Footprint (kg CO2)"
                    radius={[8, 8, 0, 0]}>
                    {footprintTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Stats;
