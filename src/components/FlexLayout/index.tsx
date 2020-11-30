import React from 'react'
import getClassName from "getclassname"
import { toCSSVars } from "../../core/utils"
import "./FlexLayout.scss"

interface FlexProps {
  direction?: "column" | "row";
  align?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
  justify?:  "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "initial" | "inherit";
  fullscreen?: boolean;
  backgroundColor?: string;
 }

const FlexLayout: React.FC<FlexProps> = ({
  direction = "column",
  align = "center",
  justify = "center",
  fullscreen = false,
  backgroundColor = "transparent",
  children,
}) => {
  const style = toCSSVars({
    flexDirection: direction,
    flexAlign: align,
    flexJustify: justify,
    backgroundColor,
  })

  const rootClass = getClassName({
    base: "layout",
    "&__fullscreen": fullscreen,
  })

  return (
    <div className={rootClass} style={style}>
      {children}
    </div>
  )
}

export default FlexLayout
