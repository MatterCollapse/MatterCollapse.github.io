'use client'

import Image from 'next/image'

//Open the file on google drive
//At General Access select Anyone with the link and make sure the role is Viewer
//Copy Link
//Remove the file/d/ and replace it with uc?export=view&id= 
//Remove the /view?usp=sharing completely

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Divider from '../components/Layout/Divider';
import DecoDark_Layout from '../components/Layout/DecoDark/DecoDark_Layout';
import DecoDark_Content from '../components/Layout/DecoDark/DecoDark_ContentBlock';

function galleryImage(key: number, src: string, alt: string, size: number, setCurrent: Dispatch<SetStateAction<number>>) {
    return (
        <Image
            unoptimized={true}
            key={key} 
            src={src} 
            alt={alt} 
            width={size} height={size} 
            className='border-deco-dark' 
            onClick={() => setCurrent(key)}
        />
    );
}

function galleryVideo(key: number, src: string, size: number) {
    return (
        <video controls>
            <source src={src} type='video/mp4'/>
        </video>
    );
}

const imageLinks = [
    {
        id: 0,
        name: "Rain Woman",
        src: "https://drive.google.com/thumbnail?id=14HNtjSj1-IJX94GPmUrrTwQxH0Kh9Eqs&sz=w1000",
        Description: 'Miniature style city scene'
    },{
        id: 1,
        name: "Strands",
        src: "https://drive.google.com/thumbnail?id=1qIlBQRFeDlcQBG3oi4NpxaiQUEnbTz1z&sz=w1000",
        Description: 'Using bezier curves and lighting to create a chaotic pattern.'
    },{
        id: 2,
        name: "Sirenhead",
        src: "https://drive.google.com/thumbnail?id=16EmhvVWj2Javxvosv1krTVzOCKneg3Oq&sz=w1000",
        Description: 'Modelled, rigged, and textured horror character. Based on Sirenhead by Trevor Henderson.'
    },{
        id: 3,
        name: "Alien Planets",
        src: "/Gallery/Blender Planets.png",
        Description: 'The planets on the main page were first a shader study in Blender using nodes, then in Unity Engine using HLSL, then in GLSL.'
    },{
        id: 4,
        name: "Logrus",
        src: "https://drive.google.com/thumbnail?id=1CXtPLzn-DunqRSaKPjCTWtJkye9GoS3W&sz=w1000",
        Description: 'Fan art of the Logrus from the Amber Chronicles by Roger Zelazny.'
    },{
        id: 5,
        name: "Thorned Star Glyph",
        src: "https://drive.google.com/thumbnail?id=16i2Zzfipmr_I5lRO8J3ID368PAdQ0Gtb&sz=w1000",
        Description: 'Image of a thorned star using one continuous line.'
    },{
        id: 6,
        name: "Star Tiles",
        src: "/Gallery/Star_Tiles.PNG",
        Description: 'Tiles for a star-based magic system.'
    },{
        id: 7,
        name: "Glyphs",
        src: "/Gallery/Sheet_Glyphs.png",
        Description: 'Glyphs in the style of The Owl House.'
    },{
        id: 8,
        name: "Melvin",
        src: "https://drive.google.com/thumbnail?id=1KaVhlXGchkTRZKErD6kG3kw4yDJcgg-I&sz=w1000",
        Description: 'Hard surface model of an A.I. character.'
    },{
        id: 9,
        name: "Runeland Grass",
        src: "https://drive.google.com/thumbnail?id=14ykhOuayc5lsNUOubvTzV7a-GhmAtU3B&sz=w1000",
        Description: 'Fragment Grass Shader and Marching Cube Terrain in Runeland'
    },{
        id: 10,
        name: "Runeland Trees",
        src: "https://drive.google.com/thumbnail?id=1hnP0NI-nbqPNT2EO_74ItfsR1_w_e4A-&sz=w1000",
        Description: 'Trees, custom skybox, and day/night cycle in Runeland'
    },{
        id: 11,
        name: "Runeland Path",
        src: "https://drive.google.com/thumbnail?id=1k3-Twtm60gODlTr_PwokHYgaQJ3ry5Do&sz=w1000",
        Description: 'Biomes in Runeland'
    },{
        id: 12,
        name: "Fractal Tsunami",
        src: "https://drive.google.com/thumbnail?id=1y4-AAGUjPYOyFHNZBxYAWg0fpYm6ytNW&sz=w1000",
        Description: 'Made by path tracing fractals.'
    },{
        id: 13,
        name: "Fractal Tower",
        src: "https://drive.google.com/thumbnail?id=1Yj7SlGwFhchTev1oNcdngi2YoVCJBowY&sz=w1000",
        Description: 'Made by path tracing fractals.'
    },{
        id: 14,
        name: "Fractal Hive",
        src: "https://drive.google.com/thumbnail?id=1Whu4NQpyEojp-QzZMcvzDNBRs_6YKxYf&sz=w1000",
        Description: 'Made by path tracing fractals.'
    },{
        id: 15,
        name: "Fractal Horns",
        src: "https://drive.google.com/thumbnail?id=1gPLuy0trxvaCuqn-P2nsRcmfdpy4AjLB&sz=w1000",
        Description: 'Made by path tracing fractals.'
    },{
        id: 16,
        name: "Deep Scape",
        src: "https://drive.google.com/thumbnail?id=1ZvPaJLEXZOPyvJM8vnN2UnCk6MilAPsR&sz=w1000",
        Description: 'Tunnel and Cave noise patterns for Marching Cube terrain.'
    },{
        id: 17,
        name: "Star Magic",
        src: "https://drive.google.com/thumbnail?id=1AuciQ1ThlxwHgW93sjeXtztzHYIZGy5o&sz=w1000",
        Description: 'Random night sky generation with star data.'
    },{
        id: 18,
        name: "Elementalists",
        src: "https://drive.google.com/thumbnail?id=1YrAA7WjmLjDaDRBFaTQNpVx8s3S_PlKs&sz=w1000",
        Description: 'Mesa Level with custom terrain and terrain shader.'
    },{
        id: 19,
        name: "Black Hole",
        src: "https://drive.google.com/thumbnail?id=1GZaGmuZYi4M5yDXOJbqlOa6gnkw5apr6&sz=w1000",
        Description: 'Path traced black hole made in HLSL.'
    },{
        id: 20,
        name: "Nebulae",
        src: "https://drive.google.com/thumbnail?id=1_9IDVgTew0dcHV18GbgqDExYa2BW7bjd&sz=w1000",
        Description: ''
    },{
        id: 21,
        name: "Rose",
        src: "https://drive.google.com/thumbnail?id=1z79wRowHYntKdLgHm3RQJCozQRit99Eb&sz=w1000",
        Description: ''
    },{
        id: 22,
        name: "Morning Sun",
        src: "https://drive.google.com/thumbnail?id=15PteqHVpJ3M9CCecIPgGjNMu4e4mva4K&sz=w1000",
        Description: ''
    },{
        id: 23,
        name: "Traume",
        src: "https://drive.google.com/thumbnail?id=1JwkUSXzIOuyBs4bopVE82cXY3Uw8DhCn&sz=w1000",
        Description: ''
    },{
        id: 24,
        name: "Victorian",
        src: "https://drive.google.com/thumbnail?id=1KDwEo4Fx_kr-giQW3eLQ5_T44bvmIonC&sz=w1000",
        Description: 'Victorian architecture made of cube modules.'
    },{
        id: 25,
        name: "Tarot Cards",
        src: "/Gallery/Tarot_Cards.png",
        Description: ''
    },{
        id: 26,
        name: "Ascention Cards",
        src: "/Gallery/Ascention_Cards.png",
        Description: 'Vertically and horizontally tileable cards for a tower-climbing game.'
    },{
        id: 27,
        name: "Sylized Cell Shading",
        src: "https://drive.google.com/thumbnail?id=11-hq_4wwuHmRnu2YxxEQNysl4br3CMRT&sz=w1000",
        Description: ''
    },{
        id: 28,
        name: "Moonlit forest",
        src: "https://drive.google.com/thumbnail?id=1Z8SFm-gPS9Csr_FWp-y4NH5QGv-s4KCt&sz=w1000",
        Description: ''
    },{
        id: 29,
        name: "Atmosphere",
        src: "https://drive.google.com/thumbnail?id=1f2EEbBLcj3FZCMgGXBlH99p7wVOUz1qC&sz=w1000",
        Description: 'Planet and Sun Shaders with Blender Shader nodes.'
    },{
        id: 30,
        name: "Plant Silhuettes",
        src: "https://drive.google.com/thumbnail?id=1R52JNdryA4Cr9r_pgJ2pLW6KvStN_Enc&sz=w1000",
        Description: 'Layout and compositing in Blender.'
    },{
        id: 31,
        name: "Dark Home",
        src: "https://drive.google.com/thumbnail?id=1QD_szUEDEU6XOHKIeMHhqqdGoTlCuRoe&sz=w1000",
        Description: ''
    },{
        id: 32,
        name: "Fish Tank",
        src: "https://drive.google.com/thumbnail?id=18PF85eGGWN6ILozB4zNVpyXKlPSpAA8F&sz=w1000",
        Description: ''
    }
]

const videoLinks = [
    {
        id: 100,
        name: "Sirenhead Clip",
        src: "https://drive.google.com/uc?id=1y325NDS_9oXStmx4aXApqKQS6iOgPCCU",
        Description: ''
    },{
        id: 101,
        name: "",
        src: "https://drive.google.com/uc?id=1nDreYb0xo0S7Flkvm-ncHXze2INQwbZF",
        Description: ''
    },
]

//TITLE: Blender
//several full renderings
//sirenhead video
//TITLE: techniques
//zahra: Taking as a base a generic anime model, I modeled hair using bezier curves and clothes using sculpting and manual modeling. A basic rig was fitted. The automatic vertex weights blender provides had to be adjusted on the hair and hard clothing items. 
//sirenhead: Modelled and rigged based on fanart of the popular internet character sirenhead. Veins across his body were made by shrinkwrapping many individual circles of vertices turned to cables with the skin modifier.
//Design for Modularity: I often use Unity Game Engine and Blender in tandem. Blender allows quickly prototyping and demoing game assets. In these examples, I design modular assets for the purpose of wave function collapse.
//runes: Blender is also my software of choice when I need simple 2d icons or shapes. Working with vertices allow for precise control of lines and bevels and subdivisions make smooth curves easy to produce. 

//TITLE: Unity
//underwater scene showing particles, chunk meshes, marching cube 
//elementalists showing mesa level
//
//raymarching fractal
//wave function islands showing individual meshes
//


export default function Gallery() {
    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        if (current == -1) {
          return;
        }
    
        function keyDownHandler(e: globalThis.KeyboardEvent) {
          if (e.key === "Escape") {
            e.preventDefault();
            setCurrent(-1);
          }
        }
    
        document.addEventListener("keydown", keyDownHandler);
    
        return () => {
          document.removeEventListener("keydown", keyDownHandler);
        };
    }, [current]);
    
    return (
        <DecoDark_Layout name='Gallery'>
            <h2 className="h2-deco-dark" style={{marginTop: -20}}>
                Blender
            </h2>
            <DecoDark_Content>
                {galleryImage(imageLinks[0].id, imageLinks[0].src, imageLinks[0].name, 300, setCurrent)}
                {galleryImage(imageLinks[1].id, imageLinks[1].src, imageLinks[1].name, 300, setCurrent)}
                {galleryImage(imageLinks[2].id, imageLinks[2].src, imageLinks[2].name, 300, setCurrent)}
                {galleryImage(imageLinks[8].id, imageLinks[8].src, imageLinks[8].name, 300, setCurrent)}
                {galleryImage(imageLinks[20].id, imageLinks[20].src, imageLinks[20].name, 300, setCurrent)}
                {galleryImage(imageLinks[21].id, imageLinks[21].src, imageLinks[21].name, 300, setCurrent)}
                {galleryImage(imageLinks[22].id, imageLinks[22].src, imageLinks[22].name, 300, setCurrent)}
                {galleryImage(imageLinks[23].id, imageLinks[23].src, imageLinks[23].name, 300, setCurrent)}
                {galleryImage(imageLinks[24].id, imageLinks[24].src, imageLinks[24].name, 300, setCurrent)}
                {galleryImage(imageLinks[27].id, imageLinks[27].src, imageLinks[27].name, 300, setCurrent)}
                {galleryImage(imageLinks[28].id, imageLinks[28].src, imageLinks[28].name, 300, setCurrent)}
                {galleryImage(imageLinks[29].id, imageLinks[29].src, imageLinks[29].name, 300, setCurrent)}
                {galleryImage(imageLinks[30].id, imageLinks[30].src, imageLinks[30].name, 300, setCurrent)}
                {galleryImage(imageLinks[31].id, imageLinks[31].src, imageLinks[31].name, 300, setCurrent)}
            </DecoDark_Content>
            <Divider/>



            <DecoDark_Content>
                {galleryImage(imageLinks[32].id, imageLinks[32].src, imageLinks[32].name, 300, setCurrent)}
            </DecoDark_Content>
            <Divider/>



            <DecoDark_Content>
                <iframe key="vid1" src="https://drive.google.com/file/d/1TmJJaygOtXd9PCYyusyVLktkCQdwhGTO/preview" width="300" height="200"></iframe>
                <iframe key="vid2" src="https://drive.google.com/file/d/1ui2LC4ztB-oaMIwv_Bg_YAYqPsktSNS4/preview" width="300" height="200"></iframe>
                <iframe key="vid3" src="https://drive.google.com/file/d/1CU7RU3SHnZGOVe-4eY6qVWA6dyBCPcQj/preview" width="300" height="200"></iframe>
                <iframe src="https://drive.google.com/file/d/1nI-bHVXpli5WlqeG83H5R5VgWDtqNrjt/preview" width="300" height="200"></iframe>
                <iframe key="vid4"
                width="600"
                height="400"
                src={`https://www.youtube.com/embed/zw4hQL_bRdg`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
                <iframe key="vid5"
                width="600"
                height="400"
                src={`https://www.youtube.com/embed/kXBi7-Kegio`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </DecoDark_Content>
            <Divider/>



            <DecoDark_Content>
                {galleryImage(imageLinks[4].id, imageLinks[4].src, imageLinks[4].name, 300, setCurrent)}
                {galleryImage(imageLinks[5].id, imageLinks[5].src, imageLinks[5].name, 300, setCurrent)}
                {galleryImage(imageLinks[6].id, imageLinks[6].src, imageLinks[6].name, 300, setCurrent)}
                {galleryImage(imageLinks[7].id, imageLinks[7].src, imageLinks[7].name, 300, setCurrent)}
                {galleryImage(imageLinks[26].id, imageLinks[26].src, imageLinks[26].name, 300, setCurrent)}
            </DecoDark_Content>
            <Divider/>
            <div className="flex flex-row">
                2d icons or vector-style art. Working with vertices allows for precise control of lines. Bevels and subdivisions make smooth curves easy to produce. 
            </div>
            <Divider/>



            <h1 className="h2-deco-dark">
                Unity Engine
            </h1>
            <DecoDark_Content>
                {galleryImage(imageLinks[9].id, imageLinks[9].src, imageLinks[9].name, 235, setCurrent)}
                {galleryImage(imageLinks[10].id, imageLinks[10].src, imageLinks[10].name, 235, setCurrent)}
                {galleryImage(imageLinks[11].id, imageLinks[11].src, imageLinks[11].name, 235, setCurrent)}
                {galleryImage(imageLinks[12].id, imageLinks[12].src, imageLinks[12].name, 235, setCurrent)}
                {galleryImage(imageLinks[13].id, imageLinks[13].src, imageLinks[13].name, 235, setCurrent)}
                {galleryImage(imageLinks[14].id, imageLinks[14].src, imageLinks[14].name, 235, setCurrent)}
                {galleryImage(imageLinks[15].id, imageLinks[15].src, imageLinks[15].name, 235, setCurrent)}
                {galleryImage(imageLinks[16].id, imageLinks[16].src, imageLinks[16].name, 235, setCurrent)}
                {galleryImage(imageLinks[17].id, imageLinks[17].src, imageLinks[17].name, 235, setCurrent)}
                {galleryImage(imageLinks[18].id, imageLinks[18].src, imageLinks[18].name, 235, setCurrent)}
                {galleryImage(imageLinks[19].id, imageLinks[19].src, imageLinks[19].name, 235, setCurrent)}
            </DecoDark_Content>



            <Divider/>
            <h1 className="h2-deco-dark">
                Other
            </h1>
            <DecoDark_Content>
                {galleryImage(imageLinks[25].id, imageLinks[25].src, imageLinks[25].name, 300, setCurrent)}
            </DecoDark_Content>

            {(current >= 0) && <GalleryWindow id={current} />}
        </DecoDark_Layout>
    );
}

function GalleryWindow(props: {id: number}) {
    return (
        <div className='flex items-center' style={{flexDirection: 'column', objectFit: 'contain', position: 'fixed', left: 0, bottom: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className='border-deco-dark' style={{backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '5px'}}>
                <div style={{position: 'relative', height:'450px', width: '1000px'}}>
                    <Image
                        unoptimized={true}
                        key={imageLinks[props.id].id} 
                        src={imageLinks[props.id].src} 
                        alt={imageLinks[props.id].Description} 
                        sizes="100vw"
                        fill
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <div className='h2-deco-dark' style={{backgroundColor: 'rgba(100, 0, 0, 0.75)'}}>
                    {imageLinks[props.id].name}
                </div>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '5px'}}>
                    {imageLinks[props.id].Description}
                </div>
            </div>
        </div>
    );
}

/* <video 
    src="https://drive.google.com/uc?id=1TmJJaygOtXd9PCYyusyVLktkCQdwhGTO" controls>
</video>
<iframe
    style={{ height: "25rem", width: "100%" }}
    scrolling="no"
    src="https://drive.google.com/uc?id=1TmJJaygOtXd9PCYyusyVLktkCQdwhGTO"
    allowFullScreen={true}
    allow="autoplay; fullscreen;encrypted-media;"></iframe> */