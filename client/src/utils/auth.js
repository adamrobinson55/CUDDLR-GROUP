import decode from 'jwt-decode'

class AuthService {
    // get User Data
    getProfile() {
        return decode(this.getToken())
    }

    // Check if User is logged in
    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    // Check if Token has expired
    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
      }

      //Get Token from 'Local Storage'
      getToken() {
        return localStorage.getItem('id_token');
      }
    
      // Saves User Token to 'Local Storage'
      login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
      }

      logout() {
        // Clear User Token and profile Data from 'Local Storage'
        localStorage.removeItem('id_token');
        // reload stage and reset state
        window.location.assign('/');
      }
}