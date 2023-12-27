import { prismaClient } from "../../lib/db.js"

const Mutation = {
    createUser:async (_,{firstName, lastName, email, password})=>{
        await prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                password,
                salt:"Random"
            }
        })
        return true
    }
}

const Query = {
    hello:()=>"hello everyone"
}

export const resolvers = {Mutation, Query}