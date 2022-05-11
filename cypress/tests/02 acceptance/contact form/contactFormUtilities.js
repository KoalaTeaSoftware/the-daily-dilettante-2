require('chance');

export const VALID_CHAR_POOL = "abcdefghijklmnopqrtsuvwxyz ABCDERGHIJKLMNONQRSTUVWXYZ1234567890.,-"
export const INVALID_CHAR_POOL = "<>{}[]^|\\"

export const randomEmailAddress = function(){
    return chance.email()
}
/**
 * Function that generates a blob of data that can be used to fill out the contact form
 * Note the name and subject.
 * This combination should cause the mailhandler to send back a 200
 * A subject that matches /^Give me a (\d+)$/i should result in the status value that you have asked for
 */
export const makeFormData = function () {
    /// get one that can be put into both holes
    const address = randomEmailAddress()

    return {
        name: "Teddy the special tester",
        address1: address,
        address2: address,
        subject: "Pretend that you liked this message",
        message: chance.sentence()
    }

}