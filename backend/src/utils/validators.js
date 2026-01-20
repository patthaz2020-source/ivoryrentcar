function isValidPhone(phone) {
    // simple check; you can improve later
    return typeof phone === "string" && phone.length >= 9 && phone.length <= 16;
  }
  
  module.exports = { isValidPhone };
  