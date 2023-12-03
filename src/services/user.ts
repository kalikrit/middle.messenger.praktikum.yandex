import HTTPTransport from '../utils/Fetch';
import { API_URL } from './constant';

export default class ApiUser {
  private headers: Record<string, any>;

  private fetch: HTTPTransport;

  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
    this.fetch = new HTTPTransport();
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // authorization
  login(data: Record<string, any>) {
    return this.fetch.post(
      `${this.baseUrl}/api/v2/auth/signin`,
      { headers: this.headers, data, withCredentials: true },
    );
  }

  // logout
  logout() {
    return this.fetch.post(
      `${this.baseUrl}/api/v2/auth/logout`,
      { headers: this.headers, withCredentials: true },
    );
  }

  // registration
  signup(data: Record<string, any>) {
    return this.fetch.post(
      `${this.baseUrl}/api/v2/auth/signup`,
      { headers: this.headers, data },
    );
  }

  // get user info
  user() {
    return this.fetch.get(
      `${this.baseUrl}/api/v2/auth/user`,
      { headers: this.headers, withCredentials: true },
    );
  }

  // edit user info
  profile(data: Record<string, any>) {
    return this.fetch.put(
      `${this.baseUrl}/api/v2/user/settings`,
      { headers: this.headers, data, withCredentials: true },
    );
  }

  // edit user password
  password(data: Record<string, any>) {
    return this.fetch.put(
      `${this.baseUrl}/api/v2/user/password`,
      { headers: this.headers, data, withCredentials: true },
    );
  }

  // set user avatar
  avatar(data: Record<string, any>) {
    return this.fetch.put(
      `${this.baseUrl}/api/v2/user/profile/avatar`,
      { headers: {}, data, withCredentials: true },
    );
  }
}
