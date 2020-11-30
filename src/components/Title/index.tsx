import React from 'react'
import { Size } from "../../core/types"

interface TitleProps {
    size: Size;
}

const Title: React.FC<TitleProps> = ({ size, children }) => {
    const Comp: any = {
        small: "h3",
        medium: "h2",
        big: "h1"
    }[size];
    return <Comp>{children}</Comp>
}

export default Title