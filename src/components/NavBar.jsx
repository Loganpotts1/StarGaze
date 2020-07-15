import React from "react";
import MoonMenu from "./MoonMenu";

export default function NavBar() {

    React.useEffect(() => {
    //     const moon = document.querySelector(".moon-menu");
        const navLinks = document.querySelector(".nav-links");
    //     const navActive = document.querySelector(".navbar-active");
    //     moon.addEventListener("click", () => {
    //         navLinks.classList.toggle("navbar-active");
    //     });
        window.matchMedia("(min-width: 768px)").addListener(() => {
            navLinks.classList.remove("navbar-active");
        })
    })

    function dropDown() {
        const navLinks = document.querySelector(".nav-links");
        navLinks.classList.toggle("navbar-active");
    }

    return (
        <div className="navbar">
            <nav>
                <h1 className="logo ml-2"><a className="logo-text" href="/">StarGaze</a></h1>
                <div className="nav-div">
                    <ul className="nav-links">
                        <li><a href="/photos">Photos</a></li>
                        <li><a href="/audio">Audio</a></li>
                        <li><a href="/mars_rover">Mars Rover</a></li>
                    </ul>
                </div>
            </nav>
            <MoonMenu dropDown={() => dropDown()}/>
        </div>
    );
}