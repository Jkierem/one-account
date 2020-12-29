import { Either } from "jazzi"
import { profile } from "../core/models"
import { checkUserRegistry, registerUser, Snapshot } from "./database"
import { auth } from "./firebase"

export type LoginResponse = {
  token: string;
  uid: any;
  profile: any;
}

const withGoogle = (): Promise<LoginResponse> =>
    auth.instance
      .signInWithPopup(auth.provider)
      .then((result: any) => ({
            token: result.credential.accessToken,
            uid: result.user.uid,
            profile: result?.additionalUserInfo?.profile,
          })
      )

const loginOrRegister = () => {
  let data: LoginResponse;
  return withGoogle().then((d: LoginResponse) => {
    data = d;
    const uid = d.uid
    return checkUserRegistry(uid)
  })
  .then((snap: Snapshot) => {
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
