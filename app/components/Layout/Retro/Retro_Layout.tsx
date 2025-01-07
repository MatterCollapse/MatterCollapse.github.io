'use client'

import { ReactNode } from "react";

export default function Retro_Layout (props: {children?: ReactNode | undefined}) {
    return (
    <div className="flex h-full flex-col retro" style={{overflowY: 'auto'}}>
        <div style={{margin: 50}}>
            {props.children}
        </div>
    </div>);
}