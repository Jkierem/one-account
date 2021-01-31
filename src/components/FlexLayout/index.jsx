import React from 'react'
import getClassName from "getclassname"
import { toCSSVars, purge } from "../../core/utils"
import "./FlexLayout.scss"

/**
 * @typedef {{
 *  direction?: "column" | "row";
 *  align?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
 *  justify?:  "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "initial" | "inherit";
 *  width?: string;
 *  height?: string;
 *  padding?: string;
 *  paddingLeft?: string;
 *  paddingRight?: string;
 *  paddingBottom?: string;
 *  paddingTop?: string;
 *  fullscreen?: boolean;
 *  backgroundColor?: string;
 *  className?: string;
 * }} FlexProps
 * @param {FlexProps} props 
 */
const FlexLayout = ({
  direction = "column",
  align = "center",
  justify = "center",
  fullscreen = false,
  backgroundColor = "transparent",
  padding = '',
  paddingLeft = '',
  paddingRight = '',
  paddingBottom = '',
  paddingTop = '',
  className = '',
  width = '',
  height = '',
  style: rawStyle = {},
  children,
}) => {
  const style = toCSSVars({
    flexDirection: direction,
    flexAlign: align,
    flexJustify: justify,
    backgroundColor,
    width,
    height
  })

  const rootClass = getClassName({
    [className]: className?.length > 0,
    base: "layout",
    "&__fullscreen": fullscreen,
  })

  const extras = purge({
    padding,
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingTop,
  })

  return (
    <div className={rootClass} style={{...style, ...extras, ...rawStyle}}>
      {children}
    </div>
  )
}

export default FlexLayout
