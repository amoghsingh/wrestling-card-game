import { MouseEvent, useEffect, useState } from "react";
import "./style.scss";
import cardData from "../../utils/data.json";

const Dashboard = () => {
  const [cards, setCards] = useState(cardData ? cardData : []);
  const [playerOneCards, setPlayerOneCards] = useState([]);
  const [playerTwoCards, setPlayertwoCards] = useState([]);
  const [autoPlayer, setAutoPlayer] = useState(null);

  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at index i and j
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  useEffect(() => {
    const shuffledCards = shuffleCards(cards);
    const middleIndex = cards.length / 2;

    setPlayerOneCards(shuffledCards.slice(0, middleIndex));
    setPlayertwoCards(shuffledCards.slice(middleIndex));

    // const arr1 = shuffledCards.slice(0, middleIndex);
    // const arr2 = shuffledCards.slice(middleIndex);

    // console.log("arr1 : ", arr1);
    // console.log("arr2 : ", arr2);
  }, []);

  const revealWrestler = () => {
      setAutoPlayer(`images/${playerTwoCards[0]?.url}`);
  }

const selectValue = (e:MouseEvent) => {
  const name = e.currentTarget.dataset.name;
  const val = e.currentTarget.dataset.value;
  const opponentValue = playerTwoCards[0][name];
  console.log("opp value : ", opponentValue);
  if(name === "rank" && val<opponentValue){
    console.log("You win the card");
    setPlayerOneCards(prev => [...prev, playerTwoCards[0]]);
   // const res = playerTwoCards.filter(x =>  x?.rank !== parseInt(opponentValue));
    //setPlayertwoCards(res);
    setPlayertwoCards(prev=> prev.filter(x =>  x?.rank !== parseInt(opponentValue)));
  }
}

console.log("playa 1 : ", playerOneCards);
console.log("playa 2 : ", playerTwoCards);


  return (
    <>
      <div className="wrapper">
        <div className="card ">
          <img
            className="photo"
            src={`images/${playerOneCards[0]?.url}`}
            alt="photo"
          />
          <div className="name">{playerOneCards[0]?.name}</div>
          <div className="row" onClick={selectValue} data-value={`${playerOneCards[0]?.rank}`} data-name="rank">
            <div >Rank</div>
            <div >{playerOneCards[0]?.rank}</div>
          </div>
          <div className="row" onClick={selectValue} data-value={`${playerOneCards[0]?.matches}`} data-name="matches">
            <div>Matches</div>
            <div>{playerOneCards[0]?.matches}</div>
          </div>
          <div className="row" onClick={selectValue} data-value={`${playerOneCards[0]?.chest}`} data-name="chest">
            <div>Chest</div>
            <div>{playerOneCards[0]?.chest}</div>
          </div>
          <div className="row" onClick={selectValue} data-value={`${playerOneCards[0]?.biceps}`} data-name="biceps">
            <div>Biceps</div>
            <div>{playerOneCards[0]?.biceps}</div>
          </div>
          <div className="row" onClick={selectValue} data-value={`${playerOneCards[0]?.height}`} data-name="height">
            <div>Height</div>
            <div>{playerOneCards[0]?.height}</div>
          </div>
        </div>
        <div className="vs">VS</div>
        <div className="card2 swirl-in-right-bck" onClick={revealWrestler}>
          
          <img
            className={autoPlayer?"photo":"photo1"}
            src={autoPlayer? autoPlayer:`images/card_logo.png`}
            alt="photo"

          />
          {autoPlayer?(<>
           <div className="name">{playerTwoCards[0]?.name}</div>
          <div className="row">
            <div>Rank</div>
            <div>{playerTwoCards[0]?.rank}</div>
          </div>
          <div className="row">
            <div>Matches</div>
            <div>{playerTwoCards[0]?.matches}</div>
          </div>
          <div className="row">
            <div>Chest</div>
            <div>{playerTwoCards[0]?.chest}</div>
          </div>
          <div className="row">
            <div>Biceps</div>
            <div>{playerTwoCards[0]?.biceps}</div>
          </div>
          <div className="row">
            <div>Height</div>
            <div>{playerTwoCards[0]?.height}</div>
          </div> </>):null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
