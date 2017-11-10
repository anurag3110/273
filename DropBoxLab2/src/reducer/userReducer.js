

const userReducer = (state = {
  isLoggedIn: false,
  firstname: '',
  lastname: '',
  username: '',
  password:'',
  token:'',
  contact:'',
  work:'',

  education:'',

  music:'',

  shows:'',

  sports:'',

  files:[],
  starredfiles:[],
  APIcall:0

}, action) => {
  switch(action.type){
    /*case "UPDATE_STORE":
      state = {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        password: action.payload.pass,
        token: action.payload.token

      };
      break;*/
    case "CHANGELOG":
        state={
          ...state,
          isLoggedIn : true,
          firstname : action.payload.firstname,
          lastname : action.payload.lastname
        };
        break;
    case "CHANGEUSER":
        state={
          ...state,
          username: action.payload.username
        };
        break;
    case "CHANGEPASS":
        state={
          ...state,
          password: action.payload.pass
        };
        break;
    case "SETTOKEN":
        state={
          ...state,
          token: action.payload.token
        };
        break;


    case 'CHANGEDATA':
       state={
         ...state,
         work : action.payload.data[0].Work,

         education : action.payload.data[0].Education,

         music : action.payload.data[0].Music,

         shows: action.payload.data[0].Shows,

         sports: action.payload.data[0].Sports,

       };
       break;

    case "RESTORE":
        state={
          ...state,
          isLoggedIn: false,
          firstname: '',
          lastname: '',
          username: '',
          password:'',
          token:'',
          contact:'',
          work:'',

          education:'',

          music:'',

          shows:'',

          sports:'',

          files:[],
          starredfiles:[],
          APIcall:0

        };
        break;

    case "ADDFILE":
        //console.log(action.payload.files);

        state={
          ...state,
          files: action.payload.files
        };

        break;

    case "REMOVEFILE":
        //console.log(action.payload.files);

        state={
          ...state,
          files: []
        };

        break;

    case "REMOVESTAR":

        state={
          ...state,
          starredfiles: []
        };

    break;

    case "REMOVE":

        state={
          ...state,
          files: state.files.filter((item) => { return action.payload.file !== item })
        };

        break;

    case "APICOUNT":
        //console.log(action.payload.files);

        state={
          ...state,
          APIcall: 1
        };

        break;

    case "STAR":

        state={
          ...state,
          starredfiles: action.payload.files
        };

        break;

    case "REMOVESTAR":

        state={
          ...state,
          starredfiles: state.starredfiles.filter((item) => { return action.payload.file !== item })
        };

        break;


  }
    //localStorage.reduxStore = state;
  return state;
};

export default userReducer;
