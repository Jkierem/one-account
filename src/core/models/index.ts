export interface Tab {
  owner: string;
  participants: string[];
  amount: number;
}

export const tab = (userId: string, amount = 0) => ({
  owner: userId,
  participants: [userId],
  amount,
})

export interface UserProfile {
  userId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export const profile = (
  userId: string,
  fullName = "",
  firstName = "",
  lastName = "",
  picture = ""
) => ({
  userId,
  fullName,
  firstName,
  lastName,
  picture,
})
