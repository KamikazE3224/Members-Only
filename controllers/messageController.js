const db = require('../db/queries');

async function messages(req, res) {

    const { title, message } = req.body;

    const user_id = req.user.id;

    await db.addMessage(title, user_id, message);

    res.redirect('/');
}

module.exports = messages;