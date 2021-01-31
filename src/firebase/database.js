import { Either, Maybe } from "jazzi"
import { assoc, compose } from "ramda"
import { tab } from "../core/models"
import { database } from "./firebase"
import { randomPositiveByDigits } from "../core/utils"

const _db = (path, callback = a => a, mapRef = a => a) => {
  return {
    map: (fn) => _db(path, (a) => fn(callback(a)), mapRef),
    mapRef: (fn) => _db(path, callback, compose(mapRef, fn)),
    mapPath: (fn) => _db(fn(path),callback,mapRef),
    step: (to) => _db(`${path}/${to}`,callback,mapRef),
    getRef: () => database.ref(path),
    listen: () => {
      const ref = mapRef(database.ref(path))
      ref.on("value", callback)
      return () => ref.off()
    },
    effect(fn) {
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
    read() {
      const ref = mapRef(database.ref(path));
      return ref.once("value").then(callback)
    },
    set(data) {
      return database.ref(path).set(data)
    },
    create(data) {
      return new Promise((resolve) => {
        const ref = database.ref(path)
        const key = ref.push().key
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
export const registerUser = (userId, data) => _db(`users/${userId}`).set(data).then(() => data)
export const checkUserRegistry = (userId) => _db(`users/${userId}`).read();

const uniqId = (idPool) => {
  const LIMIT = 10;
  const run = (tries = 0) => {
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
export const getTab = (tabId) => tabs.step(`${tabId}`).map(x => x.val()).read();

export const attemptCreateTab = async (user,name) => {
  const tabData = await getTabs()
  const id = await uniqId(Object.keys(tabData ?? []));
  const newTab = tab(id,user,name);
  return tabs.step(`${id}`).set(newTab).then(() => newTab)
}

export const subscribeToTab = (userId, tabId) => {
  return database.ref(`/users/${userId}`).transaction((user) => {
    return Maybe.fromNullish(user)
      .map(u => {
        u.subscriptions = [...(u.subscriptions || []), tabId]
        return u;
      })
      .onNone(() => user)
  })
}

export const inviteToTab = (userId, tabId) => {
  return database.ref(`/tabs/${tabId}`).transaction((tab) => {
    if( tab?.members?.some?.(x => x === userId) ){
      return tab
    }
    return Maybe.fromNullish(tab)
      .map(t => {
        t.members = [...(t.members || []), userId];
        t.balances[userId] = t.members.reduce((acc,user) => {
          return assoc(user,0,acc);
        },{})
        return t;
      })
      .onNone(() => tab)
  })
}

export const usernameTaken = (username) => {
  return database.ref(`/users`)
    .orderByChild("username")
    .equalTo(username)
    .once("value")
    .then(snap => snap.val());
}

export const saveUsername = (userId,username) => {
  return database.ref(`/users/${userId}/username`).set(username);
}

export const getUserInfo = (userId) => database.ref(`/users/${userId}`).once("value").then(snap => snap.val());

const db = (path) => _db(path)

export default db
