import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import SpotifyClient from './Spotify';
import ProgressBar from './ProgressBar';
import Track from './Track';
import { Component } from 'react';

interface AppState {
  data: Track | undefined;
}

export default class App extends Component<any, AppState> {
  private theSpotifyClient = new SpotifyClient();
  private intervalNumber: number = 0;
  constructor(props: {}) {
    super(props);
    this.state = {
      data: undefined,
    }
  }

  componentDidMount() {
    if (!window.location.hash.includes("access_token")) {
      window.location.href = this.theSpotifyClient.generateRedirect();
    } else {
      let params = {} as any;
      window.location.hash.slice(1).split('&').map(hk => { 
        let temp = hk.split('='); 
          params[temp[0]] = temp[1] 
      });
      this.theSpotifyClient.setTokens(params.access_token, params.expires_in, params.token_type);
    }
    // useEffect(() => {
      this.intervalNumber = setInterval(async () => {
        this.theSpotifyClient.getCurrentlyPlaying().then((track: Track) => { this.setState({ data: track }); });
      }, 1000);
      

      
      // return () => clearInterval(interval);
    // }, []);
  }

  componentWillUnmount() {
    clearInterval(this.intervalNumber);
  }
  // private [ data: Track, setData: ] = useState<Track | undefined>(undefined);
  render() {
    return (
      <div className="container" data-tauri-drag-region>
        <ProgressBar progress={(100*(this.state.data?.progress_ms ?? 0))/(this.state.data?.item?.duration_ms ?? 1)}></ProgressBar>
        <div className="flex-item " data-tauri-drag-region>
          <img src={this.state.data?.item?.album?.images[0].url ?? ""} data-tauri-drag-region />
          <div className='text'>
            <b>{ this.state.data?.item?.name }</b>
            <p className='author'>{ this.state.data?.item?.artists.map(author => author.name).join(",") }</p>
          </div>
        </div>
      </div>
    )
  }
}
// function App() {
//   const theSpotifyClient = new SpotifyClient();
//   const [data, setData] = useState<Track | undefined>(undefined);
  
//   if (!window.location.hash.includes("access_token")) {
//     window.location.href = theSpotifyClient.generateRedirect();
//   } else {
//     let params = {} as any;
//     window.location.hash.slice(1).split('&').map(hk => { 
//       let temp = hk.split('='); 
//         params[temp[0]] = temp[1] 
//     });
//     theSpotifyClient.setTokens(params.access_token, params.expires_in, params.token_type);
//   }

//   theSpotifyClient.getCurrentlyPlaying().then(data => {
//     setData(data);
//   });

  
// }

// function updateDataAndProgressBar() {

// }

// export default App;