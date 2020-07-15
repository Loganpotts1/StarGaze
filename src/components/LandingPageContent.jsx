import React from "react";
import RocketShip from "./RocketShip";
import NavBar from "./NavBar";
import {Link} from "react-router-dom";

export default function LandingPageContent() {
    return (
        <div className="landing-page">
            <NavBar />
            <main>
                <div className="landing-page-header pt-4 pr-1">
                    <h1 className="pb-1">Explore with NASA</h1>
                    <p>
                        Look at pictures and podcasts
                        <br/>from behind the scenes 
                        <br/>at the international space station
                    </p>
                </div>
                <RocketShip className="rocket-ship"/>
                <div className="landing-page-content pt-3">
                    <h2 className="">
                        What will be
                        <br /> your destination?
                    </h2>
                    <Link to="/audio">
                        <button className="btn-primary mt-1 mr-1 ml-1">Earth</button>
                    </Link>
                    <Link to="/mars_rover">
                        <button className="btn-secondary mt-1 mr-1">Mars</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}