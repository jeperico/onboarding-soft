import { transactionSerializer } from "./serializer.js";
const createTransaction = async (event) => {
    console.log("aasdas");
    // I - Environment
    event.preventDefault();
    // II - Inputs
    const payload = await transactionSerializer();
    console.log(payload);
};
export { createTransaction };
