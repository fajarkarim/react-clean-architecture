import {Credential, User, Email} from "../entities";

export interface SignUpService {
  signUpUser: (user: User, credential: Credential) => Promise<User>;
  verifyExistingEmail: (email: Email) => Promise<boolean>;
}

export class SignUpInteractor {
  signUpService: SignUpService;

  constructor(signUpService: SignUpService){
    this.signUpService =  signUpService;
  }

  async signInWithEmailAndPassword(firstName: string, lastName: string, credential: Credential): Promise<User> {
    if (this.signUpService.verifyExistingEmail(credential._email)) {
      throw new Error("There's an User with this email, if you forgot your pass...");
    }

    const user = new User(firstName, lastName, credential.email);
    return this.signUpService.signUpUser(user, credential);
  }
}
