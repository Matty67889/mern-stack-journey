/**
 * @fileoverview About message functions.
 */

let aboutMessage = 'Issue Tracker API v1.0';

/**
 * Gets the about message.
 *
 * @returns the about message
 */
function getAboutMessage() {
  return aboutMessage;
}

/**
 * Sets the about message.
 * 
 * @type {object}
 * @property {string} message the message to set the about to
 */
function setAboutMessage(_, { message }) {
  aboutMessage = message;
}

module.exports = { setAboutMessage, getAboutMessage };