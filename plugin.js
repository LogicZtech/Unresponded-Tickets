// This plugin pings a list of roles when a modmail ticket goes unanswered for X amount of time.

module.exports = function({ bot, knex, config, commands }) {
const INTERVAL_IN_MINUTES = 60; // How often to check for unanswered tickets
const UNRESPONDED_TICKETS_ROLES = ['Helper', 'Moderator']; // The roles to ping when a ticket goes unanswered

// This function is called every INTERVAL_IN_MINUTES minutes
function checkForUnrespondedTickets() {
const tickets = knex('tickets').where('last_message_at', '<', Date.now() - INTERVAL_IN_MINUTES * 60 * 60);

tickets.each((ticket) => {
  UNRESPONDED_TICKETS_ROLES.forEach((role) => {
    bot.users.inRoles(role).forEach((user) => {
      bot.chat.sendMessage(user, `A modmail ticket has gone unresponded for ${INTERVAL_IN_MINUTES} minutes: ${ticket.id}`);
    });
  });
});

}

// Start the timer to check for unanswered tickets
setInterval(checkForUnrespondedTickets, INTERVAL_IN_MINUTES * 60 * 60);
};
