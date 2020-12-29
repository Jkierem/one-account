// @ts-nocheck
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
  map
} from "ramda"

type Key = string | number | symbol

export const mapKeys = (fn:(str: Key, val?: any) => Key, obj: any ) =>
  compose(
    fromPairs,
    // @ts-ignore
    map(([key,value]:[Key,any]) => [fn(key,value),value]),
    toPairs
    // @ts-ignore
  )(obj)

export const toCSSCase = compose(
  concat("--"),
  join("-"),
  map(toLower),
  split(","),
  replace(/[A-Z]/g, (x:string) => `,${x}`)
)

export const toCSSVars = (obj: any) => mapKeys(toCSSCase, obj)

export const toPromise = (a: any): Promise<A> => new Promise(res => res(a))

export const randomInt = (min: number, max: number) => IO.of(() => Math.floor(Math.random() * (max - min) ) + min)

export const randomPositiveInt = (max: number) => Maybe.fromPredicate(x => x > 0 , max).map(x => randomInt(0,x));

export const randomPositiveByDigits = (digits: number) => Maybe.fromPredicate(x => x > 0, digits).map(x => randomInt(0,10**x));