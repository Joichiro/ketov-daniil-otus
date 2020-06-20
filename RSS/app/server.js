import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {rssChannelsModel, rssItemsModel} from '../models/index.js';
import {getChannelsList, getRssItems, saveChannel} from '../controllers/index.js';
import {parse} from '../parser/index.js';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// Create RSS subscription by URL
app.post('/subscribe', (req, res) => {
  if (!req.body.channelId) {
    res.status(400).send('error: channelId is not specified');
  }
  saveChannel(rssChannelsModel, req.body.channelId, req.body.url);
  parse.parse(req.body.url, rssItemsModel, req.body.channelId);
  res.status(201).send('created: ' + req.body.url);
});

// Show all RSS subscriptions with URL
app.get('/channels', (req, res) => {
  getChannelsList(rssChannelsModel.model, result => {
    res.status(201).send(result);
  });
});

// Show RSS feed by channelID
app.get('/feed/:channelId', (req, res) => {
  getRssItems(rssItemsModel.model, req.params.channelId, result => {
    res.status(201).send(result);
  });
});

app.listen(5000);
