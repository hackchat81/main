/*
  Description: Legacy stats output, kept for compatibility, outputs user and channel count
*/

'use strict';

exports.run = async (core, server, socket, data) => {
  let ips = {};
  let channels = {};
  for (let client of server.clients) {
    if (client.channel) {
      channels[client.channel] = true;
      ips[client.remoteAddress] = true;
    }
  }

  let uniqueClientCount = Object.keys(ips).length;
  let uniqueChannels = Object.keys(channels).length;

  ips = null;
  channels = null;

  server.reply({
    cmd: 'info',
    text: `${uniqueClientCount} unique IPs in ${uniqueChannels} channels`
  }, socket);

  core.managers.stats.increment('stats-requested');
};

exports.info = {
  name: 'stats',
  description: 'Sends back legacy server stats to the calling client'
};
