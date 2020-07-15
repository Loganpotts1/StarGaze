import React from "react";
import axios from "axios";

export default function Test() {
    const data = [];
    async function getData() {


        try {const response = await axios.get("https://images-api.nasa.gov/search",{
            params: {
                q: "apollo"
            }});
            data.push(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    getData();

    return (<h1>{JSON.stringify(data)}</h1>);
}