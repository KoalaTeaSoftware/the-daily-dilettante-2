// in order to modularize this area of functionality, index.js does nothing more than pull them all together
'use strict';

const admin = require('firebase-admin');

// a no-parameters call as listed at https://firebase.google.com/docs/admin/setup#initialize-without-parameters
// ensure that there is no environment variable called GOOGLE_APPLICATION_CREDENTIALS
admin.initializeApp();

const sendMail = require('./manageMail');
exports.sendMail = sendMail.sendMail

const userManagement = require('./manageUsers');
exports.getUserByEmail = userManagement.getUserByEmail
exports.getUserAuthority = userManagement.getUserAuthority
exports.setUserRole = userManagement.setUserRole
exports.updateUserRoles = userManagement.updateUserRoles
