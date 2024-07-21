export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest {
  body?: any;
}
