// Simulate authentication service
const Auth = {
  _isAuthenticated: false,

  authenticate(name, pass, cb) {
    this._isAuthenticated = true;
    setTimeout(
      () =>
        cb({
          name: name
        }),
      100
    );
  },

  signout(cb) {
    this._isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default Auth;
