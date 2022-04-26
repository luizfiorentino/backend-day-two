const { user, todoItem, todoList } = require("./models");

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [user],
  });
  return lists.map((list) => list.toJSON());
}

//listsWithUsers().then((lists) => console.log(lists));

async function newListsWithUsers() {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.toJSON());
}

//newListsWithUsers().then((user) => console.log(user));

// Here we get all information
async function getUsers() {
  const allUsers = await user.findAll({
    raw: true,
    include: { model: todoList, attributes: ["name"] },
  });
  console.log("users", allUsers);
  return allUsers;
}

//getUsers();

// // OR: (reader) - but does not return all the info! (testing)
// async function getUsers() {
//   const allUsers = await user.findAll({
//     include: { model: todoList, attributes: ["name"] },
//   });
//   return allUsers.map((user) => user.toJSON());
// }
// //getUsers().then((user) => console.log(user));

// Get one user by id with his lists.
async function userWithLists(id) {
  const userPlusLists = await user.findByPk(id, {
    raw: true,

    include: { model: todoList, attributes: ["name"] },
  });
  console.log("user with lists", userPlusLists);
  return userPlusLists;
}
//userWithLists(1);

// Get important TodoItems with the name of the list they belong to.
async function importantItems() {
  const itemsWithLists = await todoItem.findAll({
    raw: true,
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  console.log("important items", itemsWithLists);
}
//importantItems();

// Get one user by id with his lists, which also contain their belonging TodoItem's task attribute.
async function userIdLists(id) {
  const userListsItems = await user.findByPk(id, {
    raw: true,
    include: {
      model: todoList,
      attributes: ["name"],
      include: { model: todoItem, attributes: ["task"] },
    },
  });
  console.log(userListsItems);
}
userIdLists(4);
