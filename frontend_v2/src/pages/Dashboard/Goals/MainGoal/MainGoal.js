import "./MainGoal.css";

const MainGoal = ({ goal, handleClick }) => {
  return (
    <div className="main-goal">
      <h1>Carbon fotprint goal</h1>
      <div className="carbon-footprint-goal">
        <h3>{goal} kg CO2</h3>
        <button onClick={handleClick}>Change</button>
      </div>
    </div>
  );
};
export default MainGoal;
