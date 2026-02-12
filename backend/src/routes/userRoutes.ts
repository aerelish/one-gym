import express from 'express';

const router = express.Router();

// test endpoint to verify that the route is working
router.get('/test', (req, res) => {
	res.json({ msg: 'User route works!' });
});

export default router;
