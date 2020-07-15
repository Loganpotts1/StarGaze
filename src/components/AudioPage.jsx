import React from "react";
import NavBar from "./NavBar";
import axios from "axios";
import red from '@material-ui/core/colors/red';
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    TextField
} from "@material-ui/core";
import {
    PlayArrow,
    Pause
} from "@material-ui/icons";
import {
    makeStyles, createMuiTheme, ThemeProvider
} from "@material-ui/core/styles";


const useStyles = makeStyles({
    card: {
        background: 'rgba(0,0,0,0)'
    }
  });


export default function AudioPage() {
    const [audios, setAudios] = React.useState([]);
    const [isMounted, setIsMounted] = React.useState(false);
    const sound = new Audio();
    const isPlaying = false;
    const [search, setSearch] = React.useState("");
    const classes = useStyles();
    const white = red[50];

    const searchTheme = createMuiTheme({
        palette: {
            primary: {
                main: white
            }
        }
    });


    function playAudio(audioLink) {
        if (isPlaying) {
            sound.pause();
        } else {
            sound.src = audioLink;
            sound.volume = .2;
            sound.play();
        }
        return (!isPlaying);

    }

    function getAudio(query) {
        axios.get("https://images-api.nasa.gov/search", { params: { q: query, media_type:"audio"}})
        .then(res => {
            console.log(res);
            res.data.collection.items.map((data, index) => {
                let audioInfo = {
                    key: index,
                    name: data.data[0].nasa_id,
                    link: ""
                };
                axios.get(data.href)
                .then(secondRes => audioInfo.link = secondRes.data[0])
                .then(() => {setAudios(prevAudio => [...prevAudio, audioInfo])});
            })      
        });
    }

    function handleSearch(event) {
        setAudios([]);
        getAudio(`${search}`);
        console.log(search);
        setSearch("");
        event.preventDefault();
    }

    if (!isMounted) {        
        getAudio('""');
    }


    React.useEffect(() => {
        setIsMounted(true);
    });


    return (
        <div className="audio-page">
            <NavBar />
            <main>
                <div className="l-gutter"></div>
                <div className="content mt-4">
                    <div className="heading mb-2">
                        <h3>Type in a search<br/>to look through NASA's audio</h3>
                        <form className="search" onSubmit={handleSearch}>
                            <ThemeProvider theme={searchTheme}>
                                <TextField color="primary" type="text" variant="outlined" label="Search (e.g.'Orion')" value={search} onChange={(event) => {setSearch(event.target.value)}}/>
                            </ThemeProvider>
                        </form>
                    </div>
                    { isMounted && audios.map(audio => (
                        <Card variant="outlined" className={classes.card + " mt-1"}>
                            <CardContent>
                                <Typography component="h5">{audio.name}</Typography>
                            </CardContent>
                            <IconButton onClick={() => {playAudio(audio.link)}}>
                                <PlayArrow />
                            </IconButton>
                            <IconButton onClick={() => {sound.pause()}}>
                                <Pause />
                            </IconButton>
                        </Card>
                        
                        // <Card variant="outlined" className={classes.card + " mt-1"}>
                        //     <ReactPlayer url={audio.link} controls="true" light={"https://www.transparenttextures.com/patterns/bedge-grunge.png"}/>
                        // </Card>
                        // <ReactAudioPlayer src={audio.link} id={audio.name} controls="true" volume={0.3}/>
                    ))}
                </div>
                <div className="r-gutter"></div>
            </main>
        </div>
    );
}



// <button onClick={() => {playAudio(audio.link)}}>{audio.name}</button>