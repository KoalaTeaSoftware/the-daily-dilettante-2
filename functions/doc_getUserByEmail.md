# Get User By Email

Give it an email address (a String), and get back a **Promise** that will tell you if the user could be found.

* Note that (barring a fatal error), this will always succeed.
* If a suitable user can't be found, then you will get back an empty object.
* a call without a parameter is not going to get in to the function, but you may get an error like this (what you get if
  you just use a browser and get the expected URL )

> {"error":{"message":"Bad Request","status":"INVALID_ARGUMENT"}}

Here is an example of usage.

```
const functions = firebase.functions();
const getUserByEmail = functions.httpsCallable('getUserByEmail')

getUserByEmail({email: this.formData.selectedUser})
  .then(response => {
    if (response.data.uid){
      getUserAuthority(response.data)
          .then(userAuthObject => {
```

Alternatively, you don't really need a constant, and could just use

> functions.httpsCallable('getUserByEmail')('{email:joe@blogs.com}')

