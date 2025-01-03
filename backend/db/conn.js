import mongoose from "mongoose";
const uri = 'mongodb://localhost:27017/getapet'

export async function main() {
    await mongoose.connect(uri)
    console.log('Connected in db')
}

main().catch(e => console.log(e))