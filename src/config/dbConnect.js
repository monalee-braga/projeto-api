import mongoose from "mongoose";

mongoose.connect('mongodb+srv://monalee:0RvR02RW1cWRoaR2@cluster-mona.hrz1zpc.mongodb.net/projeto-node?');

let db = mongoose.connection; 

export default db;