const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.adminPanel);
router.post('/updatesettings', adminController.isAdmin, adminController.updateSettings);
router.post('/blockuser', adminController.isAdmin, adminController.blockUser);
router.post('/unblockuser', adminController.isAdmin, adminController.unblockUser);

module.exports = router;
