const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.json());

const User = require("./models").user;
const TodoItem = require("./models").todoItem;
const TodoList = require("./models").todoList;

app.get("/", (req, res, next) => {
  try {
    res.send("Welcome to my API");
  } catch (e) {
    console.log(e);
    next(e);
  }
});
app.post("/echo", (req, res) => {
  res.json(req.body);
});

// Show all users
app.get("/users", async (req, res, next) => {
  try {
    const allUsers = await User.findAll({ raw: true });
    res.send(allUsers);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Show a specific user by the id
app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const thisUser = await User.findByPk(userId);
    if (!thisUser) {
      res.status(404).send({ "user with this id": "not found" });
    } else {
      res.send(thisUser);
    }
  } catch (e) {
    console.log(e);
    res.send({ "user with this id": "not found" });
  }
});

// Create a new user
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === "") {
      res.status(400).send("Please provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Updates users' infos
app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const thisUser = await User.findByPk(userId);
    if (!thisUser) {
      res.status(404).send({ "the informed id": "does not match any user" });
    } else {
      const updated = thisUser.update(req.body);
      res.send(thisUser);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Create an endpoint that shows all lists from a specific user
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const thisUser = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (!thisUser) {
      res.status(404).send({ sorry: "this user was not found" });
    } else {
      res.send(thisUser);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Create a list to a specific user
app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const thisUser = await User.findByPk(userId);
    if (!thisUser) {
      res.send("The informed id does not match any user");
    } else {
      const newList = TodoList.create({ userId, ...req.body });
      res.send(newList);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Update an existing list by the user id
app.put("/users/:userId/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("This id does not match any todo list");
    } else {
      const updated = await listToUpdate.update(req.body);
      res.send(updated);
    }
  } catch (e) {
    console.log(e);
  }
});

// Delete all lists from a specific user
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const thisUser = await User.findByPk(userId, { include: [TodoList] });
    if (!thisUser) {
      res.status(404).send("User not found");
    } else {
      thisUser.todoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// Show all lists
app.get("/lists", async (req, res, next) => {
  try {
    const allLists = await TodoList.findAll({ raw: true });

    res.send(allLists);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Show a list by its id
app.get("/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const thisList = await TodoList.findByPk(listId);
    if (!thisList) {
      res.send({ problem: "the informed id does not exist" });
    } else {
      res.send(thisList);
    }
  } catch (e) {
    console.log(e);
    res.send({ problem: "the informed id does not exist" });
  }
});

// Create a new list
app.post("/lists", async (req, res, next) => {
  try {
    const newList = await TodoList.create(req.body);
    res.send(newList);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Updates an existing list
app.put("/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const thisList = await TodoList.findByPk(listId);
    if (!thisList) {
      res.status(404).send("error: list not found");
    } else {
      const updatedList = await thisList.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Delete a list
app.delete("/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToDelete = await TodoList.findByPk(listId);
    if (!listToDelete) {
      res.status(404).send({ "the list with this id": "not found" });
    } else {
      const deleted = listToDelete.destroy();
      res.send({ list: "deleted" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

app.listen(PORT, () => console.log("Listening on port:", PORT));
