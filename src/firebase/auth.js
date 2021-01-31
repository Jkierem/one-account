import { Either, Union, Effect, Functor } from "jazzi"
import { profile } from "../core/models"
import { checkUserRegistry, registerUser } from "./database"
import { auth } from "./firebase"

const LoginResult = Union({
  name: "LoginResult",
  cases: {
    NewUser: x => x,
    OldUser: x => x,
  },
  constructors: {
    fromProfile(p){
      return p.username ? this.OldUser(p) : this.NewUser(p);
    }
  },
  extensions: [
    Functor({ trivials: ["NewUser", "OldUser"], identities: [] }),
    Effect({ trivials: ["NewUser", "OldUser"], identities: [] }),
  ]
})

const withGoogle = () =>
    auth.instance
      .signInWithPopup(auth.provider)
      .then((result) => ({
            token: result.credential.accessToken,
            uid: result.user.uid,
            profile: result?.additionalUserInfo?.profile,
          })
      )

const loginOrRegister = () => {
  let data;
  return withGoogle().then((d) => {
    data = d;
    const uid = d.uid
    return checkUserRegistry(uid)
  })
  .then((snap) => {
    return Either
    .fromPredicate(snap => snap.exists(), snap)
    .map(snap => snap.val())
    .onLeft(() => registerUser(data.uid,profile({
      id: data.uid,
      fullName: data.profile?.name,
      picture: data.profile?.picture || "",
    })))
  }).then(LoginResult.fromProfile)
}

const logout = () => auth.instance.signOut()

const authentication = {
  loginOrRegister,
  logout,
}

export default authentication
