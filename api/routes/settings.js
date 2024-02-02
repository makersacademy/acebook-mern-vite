const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const SettingsController = require("../controllers/settings");

router.put("/:id/updateName", SettingsController.updateName);
router.put("/:id/updateEmail", SettingsController.updateEmail);
// router.put("/:id/updateAboutMe", SettingsController.updateAboutMe);
router.delete("/:id/deleteAccount", SettingsController.deleteAccount);


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedUserData } = req.body;

  try {
    const updatedUser = await userController.updateUser(id, updatedUserData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user route
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userController.deleteUser(id);
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
