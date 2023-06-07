import {
  randBetweenDate,
  randNumber,
  randProduct,
  randProductAdjective,
} from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Delete all the categories & product using deleteMany()
  try {
    await prisma.category.deleteMany();
    await prisma.product.deleteMany();

    const fakeProducts = randProduct({
      length: 1000,
    });

    for (let index = 0; index < fakeProducts.length; index++) {
      const product = fakeProducts[index];
      const productAdjective = randProductAdjective();

      // using upsert to prevent repetitions
      await prisma.product.upsert({
        where: {
          title: `${productAdjective} ${product.title}`,
        },
        create: {
          title: `${productAdjective} ${product.title}`,
          description: product.description,
          price: product.price,
          image: `${product.image}/tech`,
          quantity: randNumber({ min: 10, max: 100 }),
          // creating/associating the category with the product
          category: {
            connectOrCreate: {
              where: {
                name: product.category,
              },
              create: {
                name: product.category,
                createAt: randBetweenDate({
                  from: new Date("10/06/2020"),
                  to: new Date(),
                }),
              },
            },
          },
          createAt: randBetweenDate({
            from: new Date("10/07/2020"),
            to: new Date(),
          }),
        },
        update: {},
      });
    }
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error while generating seed: \n", err);
});
