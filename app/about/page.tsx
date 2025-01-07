//'use client'

import Footer from "../components/Layout/Footer";

export default function About() {
    return (
    <div className="h-full deco-dark">
        <div className="h-full frame-deco-dark" style={{marginBottom: 50}}>
            <div>
                I am Ivan Marozau, a programmer and mechanical engineer. 
                The purpose of this website is: 
            </div>
            <li> as a hobby project </li>
            <li> a place to store and share various generators and programming experiments I make </li>
            <li> an opportunity to learn typescript, html, css, and glsl </li>
            <li> a portfolio </li>
            <div>
                The website is made with react.js through next.js, and has three.js integrated using react-three-fiber.
                <br/>
                Explore the site by clicking on planets in the main page.
                <br/>
                (You&apos;re here so you must already know).
            </div>
        </div>
        <Footer />
    </div>
    );
}
