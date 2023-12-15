import GreenApi from "@services/GreenApi";

export interface IUser {
  id: string;
  token: string;
  greenApi: GreenApi | null;
}
