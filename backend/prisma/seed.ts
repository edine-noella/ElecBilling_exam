import prisma from "../src/client";

async function main() {
  // for (const user of users) {
  //   await  prisma.user.create({data: user})
  // }
  //  for (const post of posts) {
  //     await prisma.post.create({data: post})
  //  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
