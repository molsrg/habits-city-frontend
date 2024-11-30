export const endPoints = {
  auth: {
    login: '/auth/login',
    registration: '/auth/registration',
  },
  user: {
    fetchInfo: 'user/getInfo',
    changeInfo: 'user/changeData',
    changePassword: 'user/changePassword',
    sendEmailCode: 'user/sendEmailCode',
    verifyEmailCode: 'user/verifyCode',
    deleteAccount: 'user/deleteAccount',
    validUsername: 'user/isValidUsername',
  },
  friend: {
    searchUsers: 'user/searchUsers',
    fetchInfo: 'user/getUserInfo',
    addFriend: 'user/addFriend',
    friendStat: 'user/getFriendStat',
  },
};
