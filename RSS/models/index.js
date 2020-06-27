import mongoose from 'mongoose';

export const rssItemsModel = mongoose.model('RssItems', {
  channelId: String,
  guid: String,
  title: String,
  link: String,
  description: String,
  pubDate: String,
  category: String
});

export const rssChannelsModel = mongoose.model('RssChannels', {
  channelId: String,
  url: String
});
