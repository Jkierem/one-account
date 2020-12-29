export const tab = ({ userId, fullName },name) => ({
  owner: userId,
  participants: [userId],
  name: name ?? `${fullName}'s tab`, 
  balances: {
    [userId]: {
      [userId]: 0
    }
  },
})

export const profile = ({
  userId, fullName = "", picture = ""
}) => ({
  userId,
  fullName,
  picture,
  subscriptions: []
})
