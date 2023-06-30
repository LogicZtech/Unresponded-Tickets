// This plugin pings a list of roles when a channel goes unanswered for X amount of time.

module.exports = function({ bot, knex, config, commands }) {
const INTERVAL_IN_MINUTES = 10; // How often to check for unanswered channels
const UNRESPONDED_TICKETS_ROLES = ['@Helper']; // The roles to ping when a channel goes unanswered

// This function is called every INTERVAL_IN_MINUTES minutes
function checkForUnansweredChannels() {
const channels = knex('channels').where('last_message_at', '<', Date.now() - INTERVAL_IN_MINUTES * 60);

channels.each((channel) => {
if (channel.last_message_at < Date.now() - 60 * 60) {
UNRESPONDED_TICKETS_ROLES.forEach((role) => {
bot.users.inRoles(role).forEach((user) => {
bot.chat.sendMessage(user, This ticket has had NO activity in 1 hour. Please Review!, { channel });
});
});
}
});

}

// Start the timer to check for unanswered channels
setInterval(checkForUnansweredChannels, INTERVAL_IN_MINUTES * 60);
};
