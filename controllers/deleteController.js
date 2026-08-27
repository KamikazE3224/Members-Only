const db = require('../db/queries');

async function deleteMessageController(req,res){
        const messageId = req.params.id;
        console.log(req.params.id);
        await db.deleteMessage(messageId);
        res.redirect('/');
}

module.exports = deleteMessageController;