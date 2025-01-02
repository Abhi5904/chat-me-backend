export default class ApiResponse {
  status: string;
  message: string;
  code: number;
  data?: any;

  constructor(message: string, code: number = 200, data: any = null) {
    this.status = 'success';
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
