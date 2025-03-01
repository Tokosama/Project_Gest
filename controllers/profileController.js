const returnUser = (req, res) => {
  res.json({
    user: {
      userId: req.user.userId,
      name: req.user.userName,
      email: req.user.email,
      role: req.user.role,
    },
  });
};
module.exports = {
  returnUser,
};
