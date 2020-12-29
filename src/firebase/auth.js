import { Either } from "jazzi"
import { profile } from "../core/models"
import { checkUserRegistry, registerUser } from "./database"
import { auth } from "./firebase"

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
      userId: data.uid,
      fullName: data.profile?.name,
      picture: data.profile?.picture || "",
    })))
  })
}

const logout = () => auth.instance.signOut()

const authentication = {
  loginOrRegister,
  logout,
}

export default authentication
