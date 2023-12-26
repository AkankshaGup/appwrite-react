import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const res = await this.account.create(ID.unique(), email, password, name);
      if (res) {
        return this.loginAccount({ email, password });
      } else {
        throw "somthing went wrong";
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      const res = await this.account.createEmailSession(email, password);
      if (res) {
        return res;
      } else {
        throw "somthing went wrong";
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(sessionId) {
    try {
      return await this.account.deleteSession(sessionId);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
