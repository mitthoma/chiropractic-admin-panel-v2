import { getUserByFirebaseUid } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res : any = await getUserByFirebaseUid(body.firebaseUid);
    if (res instanceof Error) { 
        return {
          error: res // return the error message
        }
      } else {
        return {
            data: res.firebaseUid
          }
      }
      
})