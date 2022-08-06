# Get User Authority

This Function is required when we are trying to get the custom claims of a user other that the current user,because you
can only see your own custom claims on the client-side.

The following examples are what you get back **within the server-side code** in the userRecord from

```
admin.auth().getUser(data.uid).then((userRecord) => {
```

## Example Response to a known peasant

Here you can see that there is no custom claims element : Not a null one, but no such element

```
const knownNPC = {
    "uid": "XdGVAZE8cJQjlJ9xLw7gp8gR74s1",
    "email": "a@b.com",
    "emailVerified": false,
    "disabled": false,
    "metadata": {"lastSignInTime": "Tue, 29 Jun 2021 12:34:57 GMT", "creationTime": "Mon, 11 Jan 2021 10:57:21 GMT"},
    "tokensValidAfterTime": "Mon, 11 Jan 2021 10:57:21 GMT",
    "providerData": [{"uid": "a@b.com", "email": "a@b.com", "providerId": "password"}]
}
```

## Response to a known editor

Here, you can see that there is a custom claims element

```
const knownEdi = {
    "uid": "swtjOeDqicXE3Ru598NH9zfP2EG3",
    "email": "editor@partypackages.net",
    "emailVerified": false,
    "displayName": "eddy",
    "disabled": false,
    "metadata": {"lastSignInTime": "Tue, 29 Jun 2021 13:24:51 GMT", "creationTime": "Wed, 26 May 2021 13:09:11 GMT"},
    "customClaims": {"editor": true},
    "tokensValidAfterTime": "Wed, 26 May 2021 13:09:11 GMT",
    "providerData": [{
        "uid": "editor@partypackages.net",
        "displayName": "eddy",
        "email": "editor@partypackages.net",
        "providerId": "password"
    }]
}

```
