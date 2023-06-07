import { getAllPatients } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    console.log('getAllPatients');
    const res = await getAllPatients();
    console.log('res is ', res);
    return {
        data: res
    }
})