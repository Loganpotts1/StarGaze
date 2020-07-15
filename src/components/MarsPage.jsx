import React from "react";
import Navbar from "./NavBar";
import axios from "axios";
import Masonry from "react-masonry-component";
import {TextField} from "@material-ui/core";
import red from '@material-ui/core/colors/red';
import {
    makeStyles, createMuiTheme, ThemeProvider
} from "@material-ui/core/styles";

export default function MarsPage() {
    const [isMounted, setIsMounted] = React.useState(false);
    const [photos,setPhotos] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const white = red[50];

    const masonryOptions = {
        transitionDuration: 0,
        // itemSelector: '.grid-item',
        columnWidth: 1,
        // gutter: 0,
        // isOriginLeft: true
    };
    const searchTheme = createMuiTheme({
        palette: {
            primary: {
                main: white
            }
        }
    });
    
    function getImage(query) {
        axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos", {params: {sol: query, api_key: "DEMO_KEY"}})
        .then(res => {
            console.log(res);
                res.data.photos.map((data,index) => {
                    let imageInfo = {
                        key: index,
                        highres: data.img_src
                    };
                    if (index<50)   {
                        setPhotos(prevPhotos => [...prevPhotos, imageInfo]);
                    }
                })
        })
    }

    function handleSearch(event) {
        setPhotos([]);
        getImage(`${search}`);
        console.log(search);
        setSearch("");
        event.preventDefault();
    }

    if (!isMounted) {
        getImage('2500');
    }

    React.useEffect(() => {
        setIsMounted(true);
    })

    return (
        <div className="mars-page">
            <Navbar/>
            <main>
                <div className="content mt-4">
                    <div className="heading mb-2">
                        <h3>Type in a "sol"<br/>to look through Mars' photos</h3>
                        <form className="search" onSubmit={handleSearch}>
                            <ThemeProvider theme={searchTheme}>
                                <TextField color="primary" type="text" variant="outlined" label="Search (e.g.'1000')" value={search} onChange={(event) => {setSearch(event.target.value)}}/>
                            </ThemeProvider>
                        </form>
                    </div>
                    <Masonry options={masonryOptions} updateOnEachImageLoad="true" className="masonry">
                        {isMounted && photos.map(photo => (
                            <div className="grid-item">
                                    <img className="grid-image" key={photo.key} src={photo.highres} onClick={()=> window.open(`${photo.highres}`, "_blank")}></img>
                            </div>
                        ))}
                    </Masonry>
                </div>
            </main>
        </div>
    );
}