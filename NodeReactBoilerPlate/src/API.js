const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:9998'

const headers = {
   'Accept': 'application/json'
};

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
