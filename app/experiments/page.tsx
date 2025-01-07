//'use client'

import DecoDark_Content from "../components/Layout/DecoDark/DecoDark_ContentBlock";
import DecoDark_Layout from "../components/Layout/DecoDark/DecoDark_Layout";
import Preview from "../components/Preview";

export default function Experiments() {
    
    return (
        <DecoDark_Layout name="Experiments">
            <DecoDark_Content>
                <Preview img="/Textures/noiseTexture.png" href="/experiments/textGame" text="Text Based Game" alt="A monochrome room"/>
                <Preview img="/Textures/noiseTexture.png" href="/experiments/wilderMagic" text="Wilder Magic Table" alt="Wilder Magic"/>
                <Preview img="/Textures/noiseTexture.png" href="/experiments/wandNamer" text="Wand and Wizard Namer" alt="Wand and Wizard Namer"/>
                <Preview img="/Textures/noiseTexture.png" href="/experiments/chatAvatar" text="Chatbot Avatar" alt="Chatbot Avatar"/>
            </DecoDark_Content>
        </DecoDark_Layout>
    );
}
