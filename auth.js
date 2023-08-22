const axios = require("axios");
const Joi = require("joi");
const AuthorizationToken = require("../models/authtoken");

const API_BASE_URL = "http://20.244.56.144";
const AUTHORIZATION_ENDPOINT = "/train/auth";

const authorizationSchema = Joi.object({
  companyName: Joi.string().required(),
  clientID: Joi.string().required(),
  clientSecret: Joi.string().required(),
  ownerEmail: Joi.string().email().required(),
  rollNo: Joi.string().required(),
});

async function getAuthorizationToken(req, res) {
  try {
    const { error } = authorizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const authorizationData = {
      companyNam: req.body.companyName,
      clientID: req.body.clientID,
      clientSecret: req.body.clientSecret,
      ownerEmail: req.body.ownerEmail,
      rollNo: req.body.rollNo,
    };

    const response = await axios.post(
      `${API_BASE_URL}${AUTHORIZATION_ENDPOINT}`,
      authorizationData
    );

    if (response.status === 200) {
      const { token_type, access_token } = response.data;

      const authorizationInfo = new AuthorizationToken(
        authorizationData.companyNam,
        authorizationData.clientID,
        authorizationData.clientSecret,
        authorizationData.ownerEmail,
        authorizationData.rollNo
      );

      return res
        .status(200)
        .json({ token_type, access_token, authorizationInfo });
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAuthorizationToken,
};
