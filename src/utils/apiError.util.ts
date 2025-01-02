// apiError.ts
export default class ApiError extends Error {
  status: string;
  message: string;
  code: number;
  details?: any;

  constructor(message: string, code: number = 500, details: any = null) {
    super(message); // Call the parent constructor (Error) with the message
    this.status = 'error';
    this.message = message;
    this.code = code;
    this.details = details;

    // Set the prototype explicitly for TypeScript class inheritance to work properly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
