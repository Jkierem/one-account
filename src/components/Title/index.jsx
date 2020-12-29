import React from 'react'
import { Size } from "../../core/types"

const Title = ({ size, children }) => {
    const Comp = {
        small: "h3",
        medium: "h2",
        big: "h1"
    }[size];
    return <Comp>{children}</Comp>
}

export default Title