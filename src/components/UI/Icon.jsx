import React from 'react'
import sprite from "./sprite.svg"

const Icon = ({ size = 20, icon, color = "white" }) => {
    return (
        <svg
            width={size}
            height={size}
            fill={color}
        >
            <use href={`${sprite}#${icon}`} height="100%" width="100%" />
        </svg>
    );
};

export default Icon