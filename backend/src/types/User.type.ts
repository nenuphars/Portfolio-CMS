export type UserType = {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
};

export type UserSignup = {
  username: string;
  password: string;
};

export type UserLogin = {
  username: string;
  password: string;
};
