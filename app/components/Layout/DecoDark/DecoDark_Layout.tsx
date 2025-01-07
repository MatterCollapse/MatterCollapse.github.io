'use client'

import { ReactNode } from "react";
import Footer from "../Footer"

export default function DecoDark_Layout (props: {name: string, children?: ReactNode | undefined}) {
    return (
    <div className="h-full deco-dark" style={{overflowY: 'auto'}}>
        <h1 className="flex h1-deco-dark">
            Experiments
        </h1>
        <div className="flex frame-deco-dark" style={{position: 'relative', flexDirection: 'column'}}>
            {props.children}
            <Footer />
        </div>
    </div>);
}