//here we use switch statement to update the taste

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;  //payload is nothing but it contain user info like name, mail, id, token...
    case "LOGOUT":
      return action.payload; //when the user logout the satate will be null linke this user = {}, it means there is no state
    default:
      return state;
  }
};
