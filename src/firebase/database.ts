import { Either, Maybe } from "jazzi"
import { compose } from "ramda"
import { tab, Tab, UserProfile } from "../core/models"
import { database } from "./firebase"
import type firebase from 'firebase'
import { randomPositiveByDigits } from "../core/utils"

export type Snapshot = firebase.database.DataSnapshot
export type Ref = firebase.database.Reference;

type Mapper<A,B> = (a: A) => B
type InnerMapper<A> = (a: A) => A
type UnaryEffect<A> = (a: A) => void

const _db = <A = Snapshot>(path: string, callback: Mapper<Snapshot,A> = (a: Snapshot) => (a as unknown) as A, mapRef = (a: Ref) => a) => {
  return {
    map: <B>(fn: Mapper<A,B>) => _db<B>(path, (a: Snapshot) => fn(callback(a)), mapRef),
    mapRef: (fn: InnerMapper<Ref>) => _db(path, callback, compose(mapRef, fn)),
    mapPath: (fn: InnerMapper<string>) => _db(fn(path),callback,mapRef),
    step: (to: string) => _db(`${path}/${to}`,callback,mapRef),
    listen: () => {
      const ref = mapRef(database.ref(path))
      ref.on("value", callback)
      return () => ref.off()
    },
    effect(fn: UnaryEffect<A>) {
      return this.map((x) => {
        fn(x)
        return x
      })
    },
    getAll: () => {
      const ref = mapRef(database.ref(path))
      ref.once("value", callback)
      return () => ref.off()
    },
    run: () => {
      const ref = mapRef(database.ref(path))
      ref.once("value", callback)
      return () => ref.off()
    },
    read(): Promise<A> {
      const ref = mapRef(database.ref(path));
      return ref.once("value").then(callback)
    },
    set(data: any) {
      return database.ref(path).set(data)
    },
    create(data: any) {
      return new Promise((resolve) => {
        const ref = database.ref(path)
        const key: string = ref.push().key as string
        ref.child(key).update(data, (error) => {
          error
            ? resolve(Either.Left(error))
            : resolve(
                Either.Right({
                  key,
                  ...data,
                })
              )
        })
      })
    },
  }
}

export const tabs = _db("tabs")
export const users = _db("users")
export const registerUser = (userId: string | number, data: UserProfile) => _db(`users/${userId}`).set(data).then(() => data)
export const checkUserRegistry = (userId: string | number): Promise<Snapshot> => _db(`users/${userId}`).read();

const uniqId = (idPool) => {
  const LIMIT = 10;
  const run = (tries = 0): Either<number,number> => {
    return randomPositiveByDigits(12).map(ioId => {
      const newId = ioId.run();
      const res = Either.fromPredicate(id => !idPool.find(x => x === id), newId)
      if( res.isRight() ){
        return res;
      } else {
        return tries < LIMIT ? run(tries + 1) : res;
      }
    }).onNone(() => Either.Left(0));
  }
  return run().match({
    Right: Maybe.Just,
    Left: Maybe.None
  })
}

export const getTabs = () => tabs.map(x => x.val()).read()
export const getTab = (tabId: number | string) => tabs.step(`${tabId}`).map(x => x.val()).read();

export const attemptCreateTab = async (userId: string): Promise<Tab> => {
  const tabData = await getTabs()
  const id = await uniqId(Object.keys(tabData));
  const newTab = tab(userId);
  return tabs.step(`${id}`).set(newTab).then(() => newTab)
}

export const subscribeToTab = (userId: string, tabId: string) => {
  
}

const db = (path: string) => _db(path)

export default db
