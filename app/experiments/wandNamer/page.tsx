'use client'

import Retro_Layout from "@/app/components/Layout/Retro/Retro_Layout";
import { abstractNouns, adjectives, wands, wizardNames } from "@/app/components/Database/Words";
import { useState } from "react";



function wandName(): string {
    let wandTitle = "";

    if((Math.random() * 4) <= 2){
        wandTitle += wizardNames.at(Random(0, wizardNames.length))?.value;
        wandTitle += "'s ";
    }
    else{
        wandTitle += "The ";
    }

    if((Math.random() * 4) <= 1){
        wandTitle += adjectives.at(Random(0, adjectives.length))?.value;
        wandTitle += " ";
    }

    if((Math.random() * 5) > 1){
        wandTitle += wands.at(Random(0, wands.length))?.value;
    }
    else {
        wandTitle += abstractNouns.at(Random(0, abstractNouns.length))?.value;
    }

    if((Math.random() * 4) <= 1){
        wandTitle += " of ";
        if((Math.random() * 4) <= 1){
            wandTitle += adjectives.at(Random(0, adjectives.length))?.value;
            wandTitle += " ";
        }
        wandTitle += abstractNouns.at(Random(0, abstractNouns.length))?.value;
    }

    return wandTitle;
}

function wizardName(): string{
    let wizardTitle = "";

    if(Random(0,4) <= 1){
        wizardTitle += adjectives.at(Random(0, adjectives.length))?.value;
        wizardTitle += " ";
    }
    else{
        wizardTitle += "The ";
        wizardTitle += adjectives.at(Random(0, adjectives.length))?.value;
        wizardTitle += " ";
    }

    wizardTitle += wizardNames.at(Random(0, wizardNames.length))?.value;

    if(Random(0,4) <= 1){
        if(Random(0,4) <= 1){
            wizardTitle += " the ";
            //adjective
            wizardTitle += adjectives.at(Random(0, adjectives.length))?.value;
        }
        else{
            //dread seeker
            wizardTitle += ", ";
            wizardTitle += abstractNouns.at(Random(0, abstractNouns.length))?.value;
            wizardTitle += " ";
            wizardTitle += abstractNouns.at(Random(0, abstractNouns.length))?.value;
        }
    }

    return wizardTitle;
}

function Random( min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function randomizeContent(): string {
    return (
        [
            "Wizard Names: ",
            "     " + wizardName(),
            "     " + wizardName(),
            "     " + wizardName(),
            "     " + wizardName(),
            "     " + wizardName(),
            "Wand Names: ",
            "     " + wandName(),
            "     " + wandName(),
            "     " + wandName(),
            "     " + wandName(),
            "     " + wandName(),
        ].join('\n')
    );
}



export default function TextGame() {
    const [content, setContent] = useState('');
    
    return (
    <Retro_Layout>
        <button className="button-retro" onClick={() => setContent(randomizeContent())}>
            Randomize
        </button>
        <pre style={{margin: 50}}>
            {content}
        </pre>
    </Retro_Layout>
    );
}