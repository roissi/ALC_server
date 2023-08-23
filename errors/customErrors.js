class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  class AuthenticationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthenticationError';
    }
  }
  
  // Exportez-les pour les utiliser dans d'autres parties de l'application
  export { ValidationError, AuthenticationError };