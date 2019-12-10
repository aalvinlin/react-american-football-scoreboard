//TODO: STEP 1 - Import the useState hook.
import React, {useState} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);

  const [currentDown, setCurrentDown] = useState(1);
  const [yardsToGo, setYardsToGo] = useState(10);
  const [ballOn, setBallOn] = useState(50);
  const [currentQuarter, setCurrentQuarter] = useState(1);
  
  const [message, setMessage] = useState("New game started. Scoreboard is live.");
  const [messagesBackground, setMessagesBackground] = useState("defaultBg");
  
  const [possessionTeam, setPossessionTeam] = useState("home");

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
        <BottomRow currentDown={currentDown} yardsToGo={yardsToGo} possessionTeam={possessionTeam} ballOn={ballOn} currentQuarter={currentQuarter}/>
      </section>

      <section className="messages">
        <h3 className={messagesBackground}>{message}</h3>
      </section>

      <section className="buttons">
        <div className="homeButtons">
          <h3>Add Points for Home Team</h3>
          <button className="homeButtons__button" onClick={() => { updateScoreboard("home", "touchdown"); }}>Touchdown</button>
          <button className="homeButtons__button" onClick={() => { updateScoreboard("home", "one-point conversion"); }}>1-point Conversion</button>
          <button className="homeButtons__button" onClick={() => { updateScoreboard("home", "two-point conversion"); }}>2-point Conversion</button>
          <button className="homeButtons__button" onClick={() => { updateScoreboard("home", "field goal")}}>Field Goal</button>
          <button className="homeButtons__button" onClick={() => { updateScoreboard("home", "safety"); }}>Safety</button>
        </div>
        
        <div className="controlButtons">
        <h3>Controls</h3>
          <button className="controlButtons__button" onClick={ () => undo() }>Undo</button>
          <button className="controlButtons__button" onClick={() => reset() }>Reset</button>
          <button className="controlButtons__button" onClick={() => nextDown() }>+1 Down</button>
          <button className="controlButtons__button" onClick={() => changePossession() }>Change Possession</button>
          <button className="controlButtons__button" onClick={() => nextQuarter() }>+1 Quarter</button>
        </div>
        
        <div className="awayButtons">
          <h3>Add Points for Away Team</h3>
          <button className="awayButtons__button" onClick={() => { updateScoreboard("away", "touchdown"); }}>Touchdown</button>
          <button className="awayButtons__button" onClick={() => { updateScoreboard("away", "one-point conversion"); }}>1-point Conversion</button>
          <button className="awayButtons__button" onClick={() => { updateScoreboard("away", "two-point conversion"); }}>2-point Conversion</button>
          <button className="awayButtons__button" onClick={() => { updateScoreboard("away", "field goal")}}>Field Goal</button>
          <button className="awayButtons__button" onClick={() => { updateScoreboard("away", "safety"); }}>Safety</button>
        </div>

      </section>
    </div>
  );

  function updateScoreboard(team, scoreType)
    {
      let scoreTypes = {"touchdown": 6, "one-point conversion": 1, "two-point conversion": 2, "field goal": 3, "safety": 2};
      let pointsToAdd = scoreTypes[scoreType];
      let isValidPlay = false;

      // make sure that the last move was a touchdown before adding a one-point or two-point conversion
      if (scoreType === "one-point conversion" || scoreType === "two-point conversion")
      {
        let [lastTeam, lastScore, lastMoveType] = scoreHistory[scoreHistory.length - 1];

        console.log("Attempting a ", scoreType, "with the last team, ", lastTeam, " scoring a ", lastMoveType);
        console.log(scoreHistory);

        // make sure that the previous move was a touchdown from the same team
        if (team === lastTeam && lastMoveType === "touchdown")
          { isValidPlay = true;}
        else if (scoreType === "one-point conversion")
          {
            setMessage(`Error: One-point conversions can only be scored directly after a touchdown.`);
            setMessagesBackground("errorBg");
            return;
          }
        else
          {
            setMessage(`Error: Two-point conversions can only be scored directly after a touchdown.`);
            setMessagesBackground("errorBg");
            return;
          }
      }

      // update score
      if (team === "away")
        { setAwayScore(awayScore + pointsToAdd); }
      else
        { setHomeScore(homeScore + pointsToAdd); }

      // add move to history of moves
      setScoreHistory(scoreHistory.concat([[team, pointsToAdd, scoreType]]));
      
      // update message status
      if (scoreType === "safety")
        { setMessage(`The ${team} team was awarded ${pointsToAdd} points for a ${scoreType}.`); }
      else
        { setMessage(`The ${team} team scored a ${scoreType}!`); }
      
      // change message background to team color
      setMessagesBackground(team + "Bg");

      return null;
    }

  function undo() {
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

  }

  function reset() {
    
    setScoreHistory([]); setHomeScore(0); setAwayScore(0);
              
    setMessage(`Reset scores to 0-0.`);
    setMessagesBackground("defaultBg");

    
  }

  function nextDown() {

    if (currentDown < 4)
      {
          let newDown = currentDown + 1;
          setCurrentDown(newDown);
          setMessage(`Down ${newDown} with ${yardsToGo} yards to go!`);
          setMessagesBackground(possessionTeam + "Bg");
      }
    else
      {
        setMessage(`No more downs available for this team!`);
        setMessagesBackground("errorBg");
      }
  }

  function nextQuarter() {

    if (currentQuarter < 4)
      {
          let nextQuarter = currentQuarter + 1;
          setCurrentQuarter(nextQuarter);
          setMessage(`Quarter ${nextQuarter} has started.`);
          setMessagesBackground("defaultBg");

          // reset other variables
          setPossessionTeam("home");
          setCurrentDown(1);
          setYardsToGo(10);
      }
    else
      {
        setMessage(`This is the final quarter of the game!`);
        setMessagesBackground("errorBg");
      }
  }


  function changePossession() {
    
    // switch teams
    let newTeam = undefined;
    
    if (possessionTeam === "home")
      { newTeam = "away"; }
    else
      { newTeam = "home"; }

    setPossessionTeam(newTeam);
    
      let newDown = 1;
      let newYardsToGo = 10;

      setCurrentDown(newDown);
      setYardsToGo(newYardsToGo);

      setMessage(`The ${newTeam} team has taken control of the ball. Down ${newDown} with ${newYardsToGo} yards to go!`);
      setMessagesBackground(newTeam + "Bg");
  }
  
}



export default App;
