"use strict";
const createTransaction = async (event) => {
    // I - Environment
    event.preventDefault();
    // II - Inputs
    const payload = await transactionSerializer(event.target);
};
