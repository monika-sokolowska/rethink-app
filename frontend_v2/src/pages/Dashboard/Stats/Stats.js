import "./Stats.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStats } from "../../../reducers/statsSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats } = useSelector((store) => store.stats);

  useEffect(() => {
    dispatch(getStats(user.id));
  }, []);

  return (
    <section className="stats">
      <div className="stats-container">
        {/* {stats && (
          <XYPlot
            margin={{ bottom: 200 }}
            xType="ordinal"
            width={500}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-90} />
            <YAxis />
            <VerticalBarSeries
              data={[
                { x: "Average footprint", y: stats.avgDailyFootprint },
                { x: "Your footprint", y: stats.userDailyFootprint },
                { x: "Your Goal", y: user.mainGoal },
              ]}
              color="#b4c1cc"
              colorType="linear"
            />
          </XYPlot>
        )} */}
      </div>
    </section>
  );
};
export default Stats;
