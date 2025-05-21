import { UserPreference } from './../node_modules/.prisma/client/index.d';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUsers() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

async function createUser() {
   const newUser = await prisma.user.create({
    data : {
    name : 'Hosen',
    age : 24,
    email : "hosen@test.com",
    userPreference: {
        create: {
            emailUpdates: true
        }
    }
},
include: {
    userPreference: true
}
   });
   return newUser;
}

async function findUserById() {
    const user = await prisma.user.findUnique({
        where: {
            email: "hosen@test.com"
        }
    })

    console.log(user);
}

// createUser().then((result) => {
//     console.log(result);
// })
// .catch((err) => {
//     console.log(err);
// })

// getAllUsers()
// .catch((err) => {
//     console.log(err);
// })
// .finally(async ()=> {
//     await prisma.$disconnect();
// })

findUserById()
.catch((err) => {
    console.log(err);
})
.finally(async ()=> {
    await prisma.$disconnect();
})