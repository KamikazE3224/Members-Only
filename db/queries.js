const pgPool = require('./pool');

async function getUserByUsername(username) {
    const { rows } = await pgPool.query(
        'SELECT * FROM clubhouse_members WHERE username = $1',
        [username]
    );

    return rows[0];
}

async function createUser(first_name, last_name, username, password) {
    await pgPool.query(
        `INSERT INTO clubhouse_members
        (first_name, last_name, username, password)
        VALUES ($1, $2, $3, $4)`,
        [first_name, last_name, username, password]
    );
}
async function makeMember(id){
        await pgPool.query('UPDATE clubhouse_members SET is_member = true WHERE id = $1',[id]);

}

async function getAllMessages() {
    const { rows } = await pgPool.query(`
        SELECT
            messages.id,
            messages.title,
            messages.message,
            messages.created_at,
            clubhouse_members.first_name,
            clubhouse_members.last_name
        FROM messages
        JOIN clubhouse_members
            ON messages.user_id = clubhouse_members.id
        ORDER BY messages.created_at DESC
    `);

    return rows;
}
async function addMessage(title, user_id, message) {

    await pgPool.query(
        `INSERT INTO messages (title, user_id, message)
         VALUES ($1, $2, $3)`,
        [title, user_id, message]
    );

}
async function updateMemberStatus(id, column) {

    const allowedColumns = ['is_member', 'admin'];

    if (!allowedColumns.includes(column)) {
        throw new Error('Invalid column name');
    }

    await pgPool.query(
        `UPDATE clubhouse_members
         SET ${column} = true
         WHERE id = $1`,
        [id]
    );
}
async function deleteMessage(id){
        await pgPool.query('DELETE FROM messages WHERE id=$1',[id]);
}

module.exports = {
    getUserByUsername,
    createUser,
    makeMember,
    getAllMessages,
    addMessage,
    updateMemberStatus,
    deleteMessage
    
};