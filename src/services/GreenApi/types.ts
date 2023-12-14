export interface IGetStateInstanceData {
  stateInstance:
    | "notAuthorized"
    | "authorized"
    | "blocked"
    | "sleepMode"
    | "starting"
    | "yellowCard";
}
