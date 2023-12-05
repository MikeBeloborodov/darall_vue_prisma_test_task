import express from "express";
import parser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 8080;

const jsonParser = parser.json();

app.use(cors());

app.get("/api/v1/items", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).send({ error: "Error with database, call admin." });
  }
});

app.post("/api/v1/user/signup", jsonParser, async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Error with database, call admin." });
  }
});

app.post("/api/v1/user/login", jsonParser, async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (user) {
      return res.status(200).send({ token: "token" });
    } else {
      return res
        .status(403)
        .send({
          message: "User with these credentials has not been registered.",
        });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error with database, call admin." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function main() {
  /*
  await prisma.user.create({
    data: {
      email: "admin@mail.ru",
      password: "admin",
      items: {
        create: {
          title: "MISO GLAZED SALMON",
          image:
            "https://downloads.ctfassets.net/eum7w7yri3zr/2Nmjt0Mqc4i9Rxi0mmJI4M/fae1ad1027a8b40210f3ca0d5662c7ab/20230808_MISO_GLAZED_SALMON.jpg",
          description:
            "Miso glazed salmon, avocado, cucumbers, pickled onions, crispy onions, white rice (x2), nori sesame seasoning, spicy cashew",
          calories: 860,
          protein: 33,
          carbs: 88,
          fat: 42,
        },
      },
    },
  });
  const allUsers = await prisma.user.findMany({
    include: {
      items: true,
    },
  });
  console.dir(allUsers, { depth: null });
    * */
}
