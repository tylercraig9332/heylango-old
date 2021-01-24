import 'express-session';

declare module 'express-session' {
  export interface Session {
    user: { [key: string]: any };
  }
  export interface SessionData {
    user: { [key: string]: any };
  }
}