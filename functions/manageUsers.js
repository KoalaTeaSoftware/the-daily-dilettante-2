'use strict';

const logger = require("firebase-functions/lib/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * See doc_getUserByEmail.md
 * input - data: Object {email:<String>}
 * Return: A Promise that will give the User object (from firebase) to match the given email address, or a null object
 */
exports.getUserByEmail = functions.https.onCall((data, context) => {
    // if ((context.auth.token.admin === true) || (context.auth.token.editor === true)) {
    return admin.auth().getUserByEmail(data.email)
        .then(user => {
            return user
        })
        .catch(err => {
            if (err.code === "auth/user-not-found")
                logger.info(`[getUserByEmail] Failed: ${JSON.stringify(err)}`)
            else
                logger.error(`[getUserByEmail] Failed: ${JSON.stringify(err)}`)
            return {}
        })
    // } else {
    //     // client-side should be preventing this, really, so I'm calling this a warning
    //     logger.warn('[getUserByEmail] Permission for action denied')
    //     return {}
    // }
})

/**
 * Returns a Promise that will give the custom claims for the given user
 * See the file doc_getUserAuthority.md
 * This has to operate on this side of the divide because you can only get your on claims on the client side
 * data: firebase User - a user object
 */
exports.getUserAuthority = functions.https.onCall((data, context) => {
        // if ((context.auth.token.admin === true) || (context.auth.token.editor === true)) {
        return admin.auth().getUser(data.uid)
            .then((userRecord) => {
                if (userRecord.customClaims) {
                    return userRecord.customClaims
                } else {
                    // logger.info('[getUserAuthority] the user has not custom claims at all')
                    return {}
                }
            })
            .catch(err => {
                logger.error(`[getUserAuthority] Failed: ${JSON.stringify(err)}`)
                return {}
            })
        // } else {
        //     // client-side should be preventing this, really, so I'm calling this a warning
        //     logger.warn('[getUserAuthority] Permission for action denied')
        //     return {}
        // }
    }
)

/**
 * data: {email: String, role: String, value: Boolean}
 * Note: the role's name has to be a reasonable number of chars long (just to try to make things more usable)
 * Compare this with the update. This one OVERWRITES existing claims, giving (or rescinding) just the one authority, and
 * rescinding all of the rest
 *
 * Find the user to go with the email, and set the specified custom claim accordingly
 * https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk
 */
exports.setUserRole = functions.https.onCall((data, context) => {
    // if ((context.auth.token.admin === true) || (context.auth.token.editor === true)) {
    const roleName = data.role
    const roleValue = !!data.value // convert it into a Boolean
    if (roleName.length > 1)
        return admin.auth().getUserByEmail(data.email)
            .then(user => {
                if (user.uid)
                    return admin.auth().setCustomUserClaims(user.uid, {[roleName]: roleValue})
                        .then(() => {
                            return {
                                code: 200,
                                message: `User ${user.email}'s ${roleName} authority should now be ${roleValue}. `
                            }
                        })
                        .catch(err => {
                            logger.error(`[setUserRole] Crashed setting custom claims: ${JSON.stringify(err)}.`)
                            return {
                                code: 500,
                                message: `Unable to set role for ${data.email}. `
                            }
                        })
                else {
                    // really this should not be called against an unknown user
                    logger.error(`[setUserRole] User ${data.email}'s details can not be found.`)
                    return {code: 404, message: `User ${data.email}'s details can not be found. `}
                }
            })
            .catch(err => {
                logger.error(`[setUserRole] Crashed finding for ${data.email}: ${JSON.stringify(err)}`)
                return {
                    code: 500,
                    message: `Unable to get a handle on ${data.email}}. `
                }
            })
    else {
        // client-side should be preventing this, really, so I'm calling this a warning
        logger.warn('[getUserAuthority] A more substantial role name is required')
        return {code: 400, message: `A more substantial role name is required. `}
    }
    // } else {
    //     // client-side should be preventing this, really, so I'm calling this a warning
    //     logger.warn('[getUserAuthority] Permission for action denied')
    //     return {code: 403, message: `Permission for action denied`}
    // }
})


/**
 * Find the user to go with the email, and UPDATE the specified custom claim accordingly
 * data: {email: String, role: String, value: Boolean}
 * cf. the set version. This one affects only 1 of the set of roles that the user may have. The rest remain unchanged
 * Note: the role's name has to be a reasonable number of chars long (just to try to make things more usable)
 *
 * https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk
 */
exports.updateUserRoles = functions.https.onCall((data, context) => {
    // if ((context.auth.token.admin === true) || (context.auth.token.editor === true)) {
    const roleName = data.role
    const roleValue = !!data.value // ensure that it is a Boolean
    if (roleName.length > 1)
        return admin.auth().getUserByEmail(data.email)
            .then(user => {
                if (user.uid) {
                    let currentRoles = user.customClaims ? user.customClaims : {}  // get what the user is already
                    currentRoles[roleName] = roleValue       // add/update the required claim
                    return admin.auth().setCustomUserClaims(user.uid, currentRoles)
                        .then(() => {
                            return {
                                code: 200,
                                message: `User ${user.email}'s authority should now be ${currentRoles}. `
                            }
                        })
                        .catch(err => {
                            logger.error(`[updateUserRoles] Error setting claims for ${data.email}: ${JSON.stringify(err)}`)
                            return {
                                code: 500,
                                message: `unable to get a handle on ${data.email}}. `
                            }
                        })
                } else {
                    // really this should not be called against an unknown user
                    logger.error(`[updateUserRoles.getUserByEmail] Unable to find user ${data.email}.`)
                    return {code: 404, message: `User ${data.email}'s details can not be found. `}
                }
            })
            .catch(err => {
                logger.error(`[updateUserRoles] Crashed finding user, or setting, or getting their custom claims. ${JSON.stringify(err)}`)
                return {
                    code: 500,
                    message: `Unable to get a handle on ${data.email}. `
                }
            })
    else {
        // client-side should be preventing this, really, so I'm calling this a warning
        logger.warn('[updateUserRoles] A more substantial role name is required')
        return {code: 400, message: `A more substantial role name is required. `}
    }
    // } else {
    //     // client-side should be preventing this, really, so I'm calling this a warning
    //     logger.warn('[updateUserRoles] Permission for action denied')
    //     return {code: 403, message: `Permission for action denied`}
    // }
})
