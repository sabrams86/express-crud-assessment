var Error = function () {
  this._errors = [];
}

Error.prototype.exists = function (input, message) {
  if(!input || input.trim() === ''){
    this._errors.push(message);
  }
}

module.exports = Error;
