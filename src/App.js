//TODO: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [message, setMessage] = useState("New game started. Scoreboard is live.");
  const [messagesBackground, setMessagesBackground] = useState("defaultBg");

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">00:03</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>

      <section className="messages">
        <h3 className={messagesBackground}>{message}</h3>
      </section>

      <section className="buttons">
        <div className="homeButtons">
        <h3>Add Points for Home Team</h3>
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => {
              
              setScoreHistory(scoreHistory.concat([["home", 6, "touchdown"]]));
              setHomeScore(homeScore + 6); setMessage("The home team scored a touchdown!");
              setMessagesBackground("homeBg");
              
              }}>Touchdown</button>

          <button className="homeButtons__touchdown" onClick={() => {
            setScoreHistory(scoreHistory.concat([["home", 1, "one-point conversion"]]));
            setHomeScore(homeScore + 1); setMessage("The home team scored a one-point conversion!");
            setMessagesBackground("homeBg");

            }}>One-point conversion</button>

          <button className="homeButtons__touchdown" onClick={() => {
            setScoreHistory(scoreHistory.concat([["home", 2, "two-point conversion"]]));
            setHomeScore(homeScore + 2); setMessage("The home team scored a two-point conversion!");
            setMessagesBackground("homeBg");

            }}>Two-point conversion</button>

          <button className="homeButtons__fieldGoal" onClick={() => {
            setScoreHistory(scoreHistory.concat([["home", 3, "field goal"]]));
            setHomeScore(homeScore + 3); setMessage("The home team scored a field goal!");
            setMessagesBackground("homeBg");

            }}>Field Goal</button>

          <button className="homeButtons__fieldGoal" onClick={() => {
            setScoreHistory(scoreHistory.concat([["home", 2, "safety"]]));
            setHomeScore(homeScore + 2); setMessage("The home team was awarded 2 points for a safety.");
            setMessagesBackground("homeBg");

            }}>Safety</button>

        </div>
        
        <div className="undoResetButtons">
        <h3>Controls</h3>
          <button className="undo" onClick={() => {

              if (scoreHistory.length > 0)
              {
                let [lastTeam, lastScore, lastMoveType] = scoreHistory.pop();
                
                // subtract points from current score
                if (lastTeam === "home")
                  { setHomeScore(homeScore - lastScore); }
                else
                  { setAwayScore(awayScore - lastScore); }

                setScoreHistory(scoreHistory);

                // update CSS background
                setMessagesBackground(lastTeam + "Bg");

                // add "s" if more than one point
                let pointsText = "point";
                if (lastScore > 1)
                  { pointsText += "s"; }

                setMessage(`Undo successful: Removed ${lastScore} ${pointsText} (${lastMoveType}) from the ${lastTeam} team.`);
              }
              else
              {
                setMessage(`No moves left to undo. Score is already 0-0.`);
                setMessagesBackground("defaultBg");
              }

              }}>Undo</button>
          <button className="reset" onClick={() => {
              setScoreHistory([]); setHomeScore(0); setAwayScore(0);
              
              setMessage(`Reset scores to 0-0.`);
              setMessagesBackground("defaultBg");

              }}>Reset</button>
        </div>
        
        <div className="awayButtons">
          <h3>Add Points for Away Team</h3>
          <button className="awayButtons__touchdown" onClick={() => {
            
            setScoreHistory(scoreHistory.concat([["away", 6, "touchdown"]]));
            setAwayScore(awayScore + 6); setMessage("The away team scored a touchdown!");
            setMessagesBackground("awayBg")
            
            }}>Touchdown</button>

          <button className="awayButtons__touchdown" onClick={() => {
            setScoreHistory(scoreHistory.concat([["away", 1, "one-point conversion"]]));
            setAwayScore(awayScore + 1);
            setMessage("The away team scored a one-point conversion!");
            setMessagesBackground("awayBg")
            
            }}>One-point conversion</button>

          <button className="awayButtons__touchdown" onClick={() => {
            setScoreHistory(scoreHistory.concat([["away", 2, "two-point conversion"]]));
            setAwayScore(awayScore + 2);
            setMessage("The away team scored a two-point conversion!");
            setMessagesBackground("awayBg")
            
            }}>Two-point conversion</button>

          <button className="awayButtons__fieldGoal" onClick={() => {
            setScoreHistory(scoreHistory.concat([["away", 3, "field goal"]]));
            setAwayScore(awayScore + 3);
            setMessage("The away team scored a field goal!");
            setMessagesBackground("awayBg")
            
            }}>Field Goal</button>

          <button className="awayButtons__fieldGoal" onClick={() => {
            setScoreHistory(scoreHistory.concat([["away", 2, "safety"]]));
            setAwayScore(awayScore + 2);
            setMessage("The away team was awarded 2 points for a safety.");
            setMessagesBackground("awayBg")
            
            }}>Safety</button>
        </div>

       
      </section>
    </div>
  );
}

export default App;
