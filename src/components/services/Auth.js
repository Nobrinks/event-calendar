export async function signIn(user, pw) {
  // return userData.find(({user:{username, password}}) => {return username === user && password===pw})
  // fetch(`localhost:3030/users?username=${user}&password=${pw}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // }).then(function (response) {
  //   JSON.parse(response);
  // });
  
  const response = await fetch(`http://localhost:3030/users?username=${user}&password=${pw}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    const responseData = await response.json()
    return responseData[0]
}

export async function signUp(user) {
  const response = await fetch(`http://localhost:3030/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user)
  });
  const responseData = await response.json()
  return responseData
}
// const str = JSON.stringify(userData)
//     const json = JSON.parse(str)
//     const authenticated = json.filter((data) => {return data.user.name === user && data.user.password===password})
//     console.log(authenticated)
//     return authenticated;
