import './App.css';
import { connect, describeScript } from "@aragon/connect";
import { Voting } from "@aragon/connect-thegraph-voting";
import { useState, useEffect } from 'react';
import * as jikanjs from 'jikanjs'

const VOTING_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/aragon/aragon-voting-rinkeby";
const DAO_ADDRESS = 'anirecdao.aragonid.eth';

const renderReccBox = (anime) => {
  console.log(anime.image)
  return (
    <div className='ReccBox'>
      <img src = {anime.image}></img>
      <h3>{anime.title}</h3>
    </div>
  );
}


function App() {
  const [anime, setAnime] = useState({
    title: 'Placeholder',
    url: 'Placeholder',
    image: 'http://placekitten.com/200/300',
    synopsis: 'Placeholder'
  });

  useEffect(() => {
    async function getVotes() {
      const org = await connect(DAO_ADDRESS, 'thegraph', { network: 4 })
      const { address: votingAppAddress } = await org.app('voting');
      const voting = new Voting(votingAppAddress, VOTING_SUBGRAPH_URL, true);
      const votes = await voting.votes();
    }

    async function makeBox(id) {
      const animeRes = await jikanjs.loadAnime(19815);
      console.log(`${animeRes.image_url}`)
      setAnime({
        title: `${animeRes.title}`,
        url: `${animeRes.url}`,
        image: `${animeRes.image_url}`,
        synopsis: `${animeRes.synopsis}`
      })
    }
    
    makeBox(19815);


  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>AniRec DAO</h1>
        {renderReccBox(anime)}
      </header>

    </div>
  );
}

export default App;
