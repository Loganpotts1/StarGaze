import React from "react";
import Navbar from "./NavBar";
import axios from "axios";
import {Link} from "react-router-dom";
import Masonry from "react-masonry-component";
import {TextField} from "@material-ui/core";
import red from '@material-ui/core/colors/red';
import {
    makeStyles, createMuiTheme, ThemeProvider
} from "@material-ui/core/styles";
// import Masonry from "./Masonry";

export default function PhotosPage() {
    const [photos, setPhotos] = React.useState([]);
    const [isMounted, setIsMounted] = React.useState(false);
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
        axios.get("https://images-api.nasa.gov/search", {params: { q: query, media_type: "image"}})
        .then(res => {
            console.log(res);
            res.data.collection.items.map((data, index) => {
                let imageInfo = {
                    key: index,
                    thumbnail: data.links[0].href,
                    highres: ""
                };
                if (index<50) {
                    axios.get(data.href)
                    .then(secondRes => {
                        imageInfo.highres = secondRes.data[0];
                        setPhotos(prevPhotos => [...prevPhotos, imageInfo]);
                    });
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

    if (!isMounted){
        getImage('""');
    }

    React.useEffect(() => {
        setIsMounted(true);
        console.log(photos);
    }, [photos]);
    


    return (
        <div className="photos-page">
            <Navbar/>
            <main>
                <div className="content mt-4">
                    <div className="heading mb-2">
                        <h3>Type in a search<br/>to look through NASA's photos</h3>
                        <form className="search" onSubmit={handleSearch}>
                            <ThemeProvider theme={searchTheme}>
                                <TextField
                                color="primary"
                                type="text"
                                variant="outlined"
                                label="Search (e.g.'Saturn')"
                                value={search} onChange={(event) => {setSearch(event.target.value)}}
                                />
                            </ThemeProvider>
                        </form>
                    </div>
                    <div className='images'>
                        {isMounted && photos.map(photo => (
                            <img
                            className="grid-image"
                            alt="nasa"
                            key={photo.key}
                            src={photo.thumbnail}
                            onClick={()=> window.open(`${photo.highres}`, "_blank")}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}