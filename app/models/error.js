

class Error {

  constructor(name, reason) {
    //wrap in an object named error for easy json responses
    this.error = {
      name : name,
      reason : reason
    };
  }

}

module.exports = Error;