import { Either } from "jazzi"
import { checkUserRegistry, registerUser } from "./database"
import type firebase from 'firebase'
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
  .then((snap: firebase.database.DataSnapshot) => {
    return Either
    .fromPredicate(snap => snap.exists(), snap)
    .map(snap => snap.val())
    .onLeft(() => registerUser(data.uid,{
      userId: data.uid,
      firstName: data.profile.given_name,
      lastName: data.profile.family_name,
      fullName: data.profile.name,
      picture: data.profile.picture
    }))
  })
  .catch(err => {
    console.error(err)
  })
}

const logout = () => auth.instance.signOut()

const authentication = {
  loginOrRegister,
  logout,
}

export default authentication
