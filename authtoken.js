const mongoose = require("mongoose");

const authorizationTokenSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  clientID: { type: String, required: true },
  clientSecret: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  rollNo: { type: String, required: true },
});

const AuthorizationToken = mongoose.model(
  "AuthorizationToken",
  authorizationTokenSchema
);

module.exports = AuthorizationToken;
