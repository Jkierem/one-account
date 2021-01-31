import { EnumType } from "jazzi"
import React from "react"

const Comp = EnumType("Heading",['small','medium','big']);
const fromString = (str, props) => {
  return Comp[str].match({
    small: () => <h3 {...props}>{props.children}</h3>,
    medium: () => <h2 {...props}>{props.children}</h2>,
    big: () => <h1 {...props}>{props.children}</h1>
  })
}

/**
 * @typedef {{ size: "small" | "medium" | "big" }} TitleProps
 * @param {TitleProps} props
 */
const Title = ({ size="medium", children, color }) => {
  return fromString(size,{ children, style:{ color }})
}

export default Title
