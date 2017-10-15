const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:9998'

const headers = {
   'Accept': 'application/json'
};


export const doLogin = (payload) =>
fetch(`${api}/doLogin`, {
   method: 'POST',
   headers: {
      ...headers,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
}).then(res => {
   return res;
})
.catch(error => {
   console.log("This is error");
   return error;
});

export const doSignUp = (payload) =>
fetch(`${api}/doSignUp`, {
   method: 'POST',
   headers: {
      ...headers,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
}).then(res => {
   if(res.status === 201){
      return res.json();
   }
   else if(res.status === 401 || res.status === 404){
      return res.json();
   }
})
.catch(error => {
   console.log("This is error");
   return error;
});

export const changeUserData = (payload) =>
fetch(`${api}/changeUserData`, {
   method: 'POST',
   headers: {
      ...headers,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
}).then(res => {
   return res;
})
.catch(error => {
   console.log("This is error");
   return error;
});


export const fetchAbout  = (payload) =>
fetch(`${api}/getUserData`, {
   method: 'POST',
   headers: {
      ...headers,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
}).then(res => {
   return res;
})
.catch(error => {
   console.log("This is error");
   return error;
});

export const fetchFiles  = (payload) =>
fetch(`${api}/getFiles`, {
   method: 'POST',
   headers: {
      ...headers,
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(payload)
}).then(res => {
   return res;
})
.catch(error => {
   console.log("This is error");
   return error;
});

export const fetchstarFiles  = (payload) =>
      fetch(`${api}/getstarFiles`, {
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      }).then(res => {
          return res;
      })
        .catch(error => {
           console.log("This is error");
           return error;
          });













/*
export const createGroup = (groupName, email, members) =>
fetch(`${api}/createGroup`, {
method: 'POST',
headers: {
...headers,
'Content-Type': 'application/json'
},
body: JSON.stringify({groupName, email, members})
}).then(response => response);

export const getUsers = (GID) =>
fetch(`${api}/group/` + GID, {
method: 'GET',
headers: {
...headers,
'Content-Type': 'application/json'
}
}).then( response => response.json() );

export const getGroups = (username) =>
fetch(`${api}/user/` + username, {
method: 'GET',
headers: {
...headers,
'Content-Type': 'application/json'
}
}).then( response => response.json() );

export const doSignUp = (userdata) =>
fetch(`${api}/signUp`, {
method: 'POST',
headers: {
...headers,
'Content-Type': 'application/json'
},
body: JSON.stringify(userdata)
}).then (res => res)
.catch(error => {
console.log(error);
console.log("This is error");
return error;
});



export const doLogin = (credentials) =>
fetch(`${api}/login`, {
method: 'POST',
headers: {
...headers,
'Content-Type': 'application/json'
},
body: JSON.stringify(credentials)
}).then (res => res)
.catch(error => {
console.log(error);
console.log("This is error");
return error;
});

export const getCount = () =>
fetch(`${api}/count`, {
method: 'GET',
headers: {
...headers,
'Content-Type': 'application/json'
},
}).then(res => {
return res.json();
})
.catch(error => {
console.log(error);
console.log("This is error");
return error;
});

export const setCount = () =>
fetch(`${api}/count`, {
method: 'POST',
headers: {
...headers,
'Content-Type': 'application/json'
},
body: JSON.stringify({count: 2})
}).then(res => {
return res.json();
})
.catch(error => {
console.log(error);
console.log("This is error");
return error;
});
*/
