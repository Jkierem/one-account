export interface Tab {
  owner: string;
  participants: string[];
  balances: Record<string,Record<string,number>>;
}

export const tab = (userId: string) => ({
  owner: userId,
  participants: [userId],
  balances: {
    [userId]: {
      [userId]: 0
    }
  },
})

export interface UserProfile {
  userId: string;
  fullName: string;
  picture: string;
  subscriptions: string[];
}

type UserData = {
  userId: string;
  fullName?: string;
  picture?: string;
}

export const profile = ({
  userId, fullName = "", picture = ""
}: UserData): UserProfile => ({
  userId,
  fullName,
  picture,
  subscriptions: []
})
