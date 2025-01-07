'use client'

import Image from 'next/image'

/* eslint-disable react/no-unescaped-entities */
export default function Preview(props: {img: string, href: string, text: string, alt: string}) {

    return (
        <button className="button-deco-dark-grow"
        onClick={(e) => window.location.href = props.href}
        >
            <Image className="image-rounded"
                unoptimized={true}
                src={props.img}
                //priority={true}
                width={200}
                height={200}
                alt={props.alt}
            />
            {props.text}
        </button>
    );
  }