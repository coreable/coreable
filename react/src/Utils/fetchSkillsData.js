import { API_URL } from "../constants";
import { SKILLS_API } from "../queries";

export const fetchData = async () => {
  const query = SKILLS_API;
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      JWT: localStorage.getItem("JWT"),
    },
    body: JSON.stringify(query),
  };

  const res = await fetch(API_URL, options).then((data) => data.json());
  const { data, errors } = res.data.me;

  if (data === null) return false;

  if (errors) return false;

  return data.user.report;
};
