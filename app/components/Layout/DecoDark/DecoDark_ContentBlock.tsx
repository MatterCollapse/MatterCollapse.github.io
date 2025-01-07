'use client'

import { ReactNode } from "react";

export default function DecoDark_Content (props: {children?: ReactNode | undefined}) {
    return (
    <div className="flex flex-row items-center" style={{flexWrap: 'wrap'}}>
        {props.children}
    </div>);
}