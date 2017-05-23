# Authentication and Authorization in Angular
[Learn Article](https://learn.galvanize.com/content/gSchool/angular-curriculum/master/90%20-%20Electives/Token-based%20Auth.md)

LOOK @ [auth_example](https://github.com/gSchool/angular-examples/tree/master/auth_example)
Got it in my angular-examples folder
### Objectives:

- Explain Authentication & Authorization:
  - **Authenticating**: Log in with a User-Name and Password.
  - **Authorization** : Gaining access to a resource (e.g. directory on a hard disk) because the permissions configured on it allow you access.

- 3 parts of jwt:
- Why jwt:
- What are interceptors?
- Diagram what happens in Ant & Arz Between Browser and Server

Cookies => allow access to certain things
Are stored in the Browser

#### Encrypt vs Encoding:
- Encoding is for maintaining data usability and can be reversed by employing the same algorithm that encoded the content, i.e. no key is used.
- Encryption is for maintaining data confidentiality and requires the use of a key (kept secret) in order to return to plaintext.

##### Encryption:
- Two way & One way
  - One way, Unknown plain text Encrypted Password is checked on one end
  - Two way, Password is made on both ends A key is generated so you can check and verify Authentication

##### Encoding:
- Changing data is able to be deciphered
- Changing data to another form of data
- Base64(is an example)
- Faster than Encryption

3 Parts of a JSON Web-Token:
SECRET IS STORED IN A .ENV file
- Header:
  - Describes the Algorithm used
  - Describes the type (JWT)
  - Base64 Encoded
- Payload:
  - info
  - Base64 Encoded
- Signature:
  - Takes Header
  - Payload & Secret
  - Encodes them into base64

jwt.sign

Authorization is sent in the header;
Accept is on server-side

DIAGRAM WHAT HAPPENS IN THE BROWSER AND WHAT HAPPENS IN THE SERVER
![](https://stormpath.com/wp-content/uploads/2016/05/Cookie-v-Token-Diagram-v1-3-1024x536.png)

### interceptors
- Built in array, you push a service into
- Middle ground before you return the error and shit
- comes before or after a request and response to manage the access/ stuff
ALL IN File: **app.js**

```js
app.config(function(dependencies....){
// states and other stuff
  $httpProvider.interceptors.push("AuthInterceptor");
}) // end of app.config.js

app.service("AuthInterceptor", function($window,$location){
  return {
    request: function(config){
      // prevent browser bar tampering for /api routes
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      var token = $window.localStorage.getItem("token");
      if(token)
        config.headers.Authorization = "Bearer " + token;
      return Promise.resolve(config);
    },
    responseError: function(err){
      // if you mess around with the token, log them out and destroy it
      if(err.data === "invalid token" || err.data === "invalid signature" || err.data === "jwt malformed"){
        $location.path("/logout");
        return Promise.reject(err);
      }
      // if you try to access a user who is not yourself
      if(err.status === 401){
        $location.path('/users');
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  };
});
```


### [ANGULAR-STORAGE](https://github.com/auth0/angular-storage):
in localStorage / sessionStorage
- get
- remove
- set stuff

### [Angular-JWT](https://github.com/auth0/angular-jwt)
- Angular JWT usage
