export function isAuthenticated() {
  return localStorage.getItem('currentUser');
}