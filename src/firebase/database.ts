import { Either, Maybe } from "jazzi"
import { compose } from "ramda"
import { UserProfile } from "../core/models"
import { database } from "./firebase"

const _db = (path: string, callback = (a: any) => a, mapRef = (a: any) => a) => {
  return {
    map: (fn: any) => _db(path, compose(fn, callback), mapRef),
    mapRef: (fn: any) => _db(path, callback, compose(mapRef, fn)),
    mapPath: (fn: any) => _db(fn(path),callback,mapRef),
    step: (to: string) => _db(`${path}/${to}`,callback,mapRef), 
    effect: (fn: any) =>
      _db(
        path,
        compose((x: any) => {
          fn(x)
          return x
        }, callback),
        mapRef
      ),
    listen: () => {
      const ref = mapRef(database.ref(path))
      ref.on("value", callback)
      return () => ref.off()
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
export const checkUserRegistry = (userId: string | number): Promise<any> =>
  new Promise((res) => {
    _db(`users/${userId}`).map(res).run()
  })

const db = (path: string) => _db(path)

export default db
