
const DatabaseInstance = require("../database/Database");
const db = DatabaseInstance.getInstance();
var format = require("pg-format");

class Likes {

	static async unLike(req, res) {
		try {
			const post = req.params.postId;
            const user = req.params.userId;
			const sql = format(`DELETE FROM likePost WHERE postID=${post} AND acc='${user}';`);
			const data = await db.queryDb(sql);
			console.log(res.json(data));
		} catch (error) {
			console.error(error);
			res.status(500).send("Server Error");
		}
	}
    static async like(req, res) {
		try {
			const post = req.params.postId;
            const user = req.params.userId;
			const sql = format(`INSERT INTO likePost WHERE postID=${post} AND acc='${user}';`);
			const data = await db.queryDb(sql);
			console.log(res.json(data));
		} catch (error) {
			console.error(error);
			res.status(500).send("Server Error");
		}
	}
	static async getLikesByPost(req, res) {
		try {
			const post = req.params.postId;
			const data = await db.queryDb(`SELECT COUNT(*) FROM likePost WHERE postID=${post};`);
            res.json(data);
		} catch (error) {
			console.error(error);
			res.status(500).send("Server Error");
		}
	}
}

module.exports = Likes;
