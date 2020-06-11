const keys = require("../keys");

module.exports = function (email, token) {
  return {
    from: keys.EMAIL_FROM,
    to: email,
    subject: "Password reset",
    html: `
      <h1>You forgot your password</h1>
      <p>If not, just ignore this message</p>
      <p>else click to link below</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>
      <hr/> 
      <p>Your email ${email}</p>
      <a href=${keys.BASE_URL}>Go to shop</a>
      `,
  };
};
