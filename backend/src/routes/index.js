const { Router } = require("express");

const router = Router();

router.get("/students", (req, res) => {
	res.send({ success: true });
});
router.post("/init", (req, res) => {
	res.send({ success: true });
});

module.exports = router;
