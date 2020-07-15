import React from "react";
import axios from "axios";
import ImagePage from "./ImagePage";

export default function Search(props) {
    const {query} = props;
    axios.get('https://images-api.nasa.gov/search', {params: {q: query}})
    .then(response => )


    <button onClick={getData}>Get NASA</button>

      {hasClicked && <img src={data[0].data.collection.items[0].links[0].href}></img>}
}