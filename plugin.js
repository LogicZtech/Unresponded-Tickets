// MasterZ - Modmail Plugin Pings X Roles when a channel goes unanswered for X Time

module.exports = function({ bot, knex, config, commands }) {
  const CHECK_INTERVAL = 10; // How often to check for unanswered channels

  function checkForUnansweredChannels() {
    const channels = bot.channels.cache.get('CHANNEL_ID');
    const excludedChannels = [
      1119349592467722321,
      1090629350929481826,
      1090629350929481825,
      1124172328822124594,
      1090629351269216278,
      1090629547403255918,
      1090629350929481819,
      1090629350447120428,
      1124130118168760361,
      1113447304813351052,
      1124085800104116385,
    ];

    channels.forEach((channel) => {
      if (channel.lastMessageAt < Date.now() - 60 * 60 && !excludedChannels.includes(channel.id)) {
        // The channel has not had any activity in the past 1 hour and is not excluded
        const ROLES = ['@Helper'];

        ROLES.forEach((role) => {
          bot.channels.fetch(role.id).then((helperChannel) => {
            helperChannel.send(`This ticket has had NO activity in 1 hour. Please Review!`);
          });
        });
      }
    });
  }

  // Start the timer to check for unanswered channels
  setInterval(checkForUnansweredChannels, CHECK_INTERVAL * 60);
};
