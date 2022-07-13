'use strict';

const admin = require('firebase-admin');
admin.initializeApp();

// in order to modularize this area of functionality, this file does nothing more than pull them all together
const sendMail = require('./manageMail');
exports.sendMail = sendMail.sendMail
