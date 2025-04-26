export enum HttpStatusCodeEnum {
  Unknown = 0,
  Success = 200,
  LoggedIn = 201,
  NotLoggedIn = 201,
  BadCredentials = 400,
  Unauthorized = 401,
  BadPassword = 402,
  ServerError = 500,
  SystemUnavailable = 501,
}

export enum CookieEnum {
  Unknown = 0,
}
