export const userStateActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const userStateInit = {
  username: '',
  loggedIn: false,
};

export const userStateReducer = (state, action) => {
  switch (action.type) {
    case userStateActions.LOGIN: {
      const { username } = action.payload;
      return { ...state, username, loggedIn: true };
    }
    case userStateActions.LOGOUT: {
      return userStateInit;
    }
    default:
      return state;
  }
};
