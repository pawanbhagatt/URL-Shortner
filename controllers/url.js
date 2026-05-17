const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  try {
    const {url, customId, expireDays} = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    let expiresAt = null;

    if(expireDays){
      expiresAt = new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000);
    }

    let shortID;

    if(customId){
      const exisiting = await URL.findOne({ shortId: customId});

      if(exisiting){
        return res.status(400).json({
          error: "Custom URL already taken",
        });
      }

      shortID = customId;
    }else{
      shortID = shortid.generate();
    }

    await URL.create({
      shortId: shortID,
      redirectURL: url,
      userId: req.user.id,
      visitHistory: [],
      expiresAt,
    });

    return res.json({ id: shortID });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
    handleGenerateNewShortURL,
};