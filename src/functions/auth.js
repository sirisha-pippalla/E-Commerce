import axios from "axios";
//request from backend
export const createOrUpdateUser = async (authtoken) => {
    //here make a request to backend through header not a body thats why we put empty object
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );
  };

  export const currentUser = async(authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authtoken: authtoken,
        },
      }
    );
  };