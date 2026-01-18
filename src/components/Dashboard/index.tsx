import { useEffect, useState } from "react";
import "./style.scss";
import cardData from "../../utils/data.json";

interface Card {
   name: string,
   url: string,
   rank: number,
  matches: number
    chest: number,
    biceps: number,
    height: number
}

const Dashboard = () => {
  const [cards] = useState(cardData ? cardData : []);
  const [playerOneCards, setPlayerOneCards] = useState<Card[]>([]);
  const [playerTwoCards, setPlayertwoCards] = useState<Card[]>([]);
  const [autoPlayer, setAutoPlayer] = useState<string|null>(null);
  const [fadeIn , setFadeIn] = useState(false);

  const shuffleCards = (cards:Card[]) => {
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

  useEffect(()=>{
      if(autoPlayer){
        const timer = setTimeout(()=>{ setFadeIn(true)}, 1000)
        return ()=>{clearInterval(timer)}
      }
      
  },[autoPlayer])

  const revealWrestler = () => {
    
      setAutoPlayer(`images/${playerTwoCards[0]?.url}`);
      //setFadeIn(true);
  }

const selectValue = (e:React.MouseEvent<HTMLElement>) => {
  
  e.currentTarget.style.backgroundColor = "#4ec17c";
  e.currentTarget.style.color = "#fff";
  revealWrestler();
  const name = e.currentTarget.dataset.name as keyof Card;
  const val = e.currentTarget.dataset.value;
  const opponentValue = playerTwoCards[0][name];
  console.log("opp value : ", opponentValue);
  if(name === "rank" && val<opponentValue){
    console.log("You win the card");
    setPlayerOneCards(prev => [...prev, playerTwoCards[0]]);
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
        <div className="card2 swirl-in-right-bck" >
          
          <img
            className={autoPlayer? `photo3 ${fadeIn? "fade-in":"fade-out"}`:"photo1"}          
            src={autoPlayer && fadeIn? autoPlayer:`images/card_logo.png`}
            alt="photo"
          />
        {autoPlayer && fadeIn?(<>
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
