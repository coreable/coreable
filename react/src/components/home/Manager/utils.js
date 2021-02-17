import { API_URL } from "../../../constants";
import { MANAGER_API } from "../../../queries";

export const fetchManagerData = async (jwt) => {
  const query = MANAGER_API;
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      JWT: jwt,
    },
    body: JSON.stringify(query),
  };

  const response = await fetch(API_URL, options).then((data) => data.json());
  const { data, errors } = response.data.manager;

  if (errors && data) {
    console.log(data);
  }

  if (errors) {
    console.error(errors[0]["message"]);
    return false;
  }

  let report = data.manager;
  console.log(report);
};
