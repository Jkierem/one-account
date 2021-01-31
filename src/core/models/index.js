export const tab = (tabId,{ id: userId, fullName },name) => ({
  id: tabId,
  owner: userId,
  members: [userId],
  name: name?.length > 0 ? name : `${fullName}'s tab`, 
  balances: {
    [userId]: {
      [userId]: 0
    }
  },
})

export const createTab = tab

export const profile = ({
  id, fullName = "", picture = ""
}) => ({
  id,
  fullName,
  picture,
  subscriptions: []
})
