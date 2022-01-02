export async function setEvent(events, idUser) {
  const response = await fetch(`http://localhost:3030/users/${idUser}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ events }),
  });
  const responseData = await response.json();
  console.log(responseData)
  return responseData;
}
