const keys = require("../keys");

module.exports = function (email) {
  return {
    from: keys.EMAIL_FROM,
    to: email,
    subject: "Account Was Created",
    html: `
      <h1>Welcome to Courses shop</h1>
      <p>You're on your way!</p>
      <hr/> 
      <p>Your email ${email}</p>
      <a href=${keys.BASE_URL}>Go to shop</a>
      `,
  };
};
