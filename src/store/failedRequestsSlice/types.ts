import { UnknownAction } from "@reduxjs/toolkit";

export interface IFailedRequest {
  action: string;
  method: string;
  body?: string;
  sideEffect?: (arg: string | object | boolean) => UnknownAction;
}
