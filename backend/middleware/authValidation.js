const validateEmailAndPassword = (req, res, next) => {
  const email = req.body.email?.trim();
  const password = req.body.password;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  req.body.email = email.toLowerCase();

  return next();
};

module.exports = {
  validateEmailAndPassword,
};
