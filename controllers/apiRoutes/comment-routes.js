const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/comments
router.get('/', withAuth, (req, res) => {
	Comment.findAll({
		attributes : [ 'id', 'comment_text', 'user_id', 'post_id' ]
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/comments
router.post('/', withAuth, (req, res) => {
	// check the session to verify user is logged in
	if (req.session) {
		Comment.create({
			comment_text : req.body.comment_text,
			post_id      : req.body.post_id,
			// use the id from the session
			user_id      : req.session.user_id
		})
			.then((dbCommentData) => {
				req.flash('success', 'Comment added!');
				res.json(dbCommentData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});


// NOT USING DELETE COMMENTS ROUTE
// // DELETE /api/comments/1
// router.delete('/:id', withAuth, (req, res) => {
// 	Post.destroy({
// 		where : {
// 			id : req.params.id
// 		}
// 	})
// 		.then(() => {
// 			Comment.destroy({
// 				where : {
// 					id : req.params.id
// 				}
// 			}).then((dbCommentData) => {
// 				if (!dbCommentData) {
// 					res.status(400).json({ message: 'No comment found with this id' });
// 					return;
// 				}
// 				res.json(dbCommentData);
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });
// // DELETE /api/comments/1
// router.delete('/:id', withAuth, (req, res) => {
// 	Comment.destroy({
// 		where : {
// 			id : req.params.id
// 		}
// 	})
// 		.then((dbCommentData) => {
// 			if (!dbCommentData) {
// 				res.status(400).json({ message: 'No comment found with this id' });
// 				return;
// 			}
// 			res.json(dbCommentData);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		});
// });

module.exports = router;
