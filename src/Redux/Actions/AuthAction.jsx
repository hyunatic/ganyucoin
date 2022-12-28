export const userLogin = (postData) => (dispatch) => {
  fetch("https://techtrekbackend.hyunatic.com/account/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: "EMAIL_LOGIN",
        payload: data,
      })
    );
};

export const validateNode = (postData) => (dispatch) => {
  fetch("https://techtrekbackend.hyunatic.com/blockchain/validate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: "VALIDATE_CHAIN",
        payload: data,
      })
    );
};
