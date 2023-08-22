const axios = require("axios");
const Joi = require("joi");

const API_BASE_URL = "http://20.244.56.144";
const REGISTER_ENDPOINT = "/train/register";

const registrationSchema = Joi.object({
  companyName: Joi.string().required(),
  ownerName: Joi.string().required(),
  ownerEmail: Joi.string().email().required(),
  rollNo: Joi.string().required(),
  accessCode: Joi.string().required(),
});

async function registerCompany(req, res) {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const registrationData = {
      companyName: req.body.companyName,
      ownerName: req.body.ownerName,
      ownerEmail: req.body.ownerEmail,
      rollNo: req.body.rollNo,
      accessCode: req.body.accessCode,
    };

    const response = await axios.post(
      `${API_BASE_URL}${REGISTER_ENDPOINT}`,
      registrationData
    );

    if (response.status === 200) {
      const { companyName, clientID, clientSecret } = response.data;

      const registrationInfo = {
        companyName,
        clientID,
        clientSecret,
      };

      return res.status(200).json(registrationInfo);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerCompany };
