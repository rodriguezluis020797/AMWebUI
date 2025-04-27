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

export enum TimeZoneEnum {
  Uknown,
  PST, // United States and Mexico
  MST, // United States and Mexico
  CST, // United States and Mexico
  EST, // United States and Mexico
  AKST, // United States
  HST, // United States
}

export enum CookieEnum {
  Unknown = 0,
}
