import { IO, Maybe } from "jazzi"
import {
  toPairs,
  fromPairs,
  compose,
  toLower,
  replace,
  split,
  join,
  concat,
  map,
  filter
} from "ramda"


export const mapKeys = (fn, obj) =>
  compose(
    fromPairs,
    map(([key,value]) => [fn(key,value),value]),
    toPairs
  )(obj)

export const toCSSCase = compose(
  concat("--"),
  join("-"),
  map(toLower),
  split(","),
  replace(/[A-Z]/g, (x) => `,${x}`)
)

export const purge = (obj) => compose(
  fromPairs,
  filter(([,val]) => val),
  toPairs,
)(obj)

export const toCSSVars = (obj) => mapKeys(toCSSCase, obj)

export const toPromise = (a) => new Promise(res => res(a))

export const randomInt = (min, max) => IO.of(() => Math.floor(Math.random() * (max - min) ) + min)

export const randomPositiveInt = (max) => Maybe.fromPredicate(x => x > 0 , max).map(x => randomInt(0,x));

export const randomPositiveByDigits = (digits) => Maybe.fromPredicate(x => x > 0, digits).map(x => randomInt(0,10**x));