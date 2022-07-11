import { PassThrough } from "stream";

export async function validateToken(userId:string = "hello", token:string = "oooo"):Promise<boolean>{
  console.log("request arrived");
  return true;
}