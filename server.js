const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
let shoppingList = [];

const app = express();
//middlewares
app.use(cors());
app.use(express.json());

app.get("/data", (req, res) => {
  res.json(shoppingList);
});

app.post("/data", (req, res) => {
  console.log(req.body);
  shoppingList.push({
    id: uuid.v4(),
    item: req.body.item,
  });
  res.json({ msg: "item added successfully" });
});

app.delete("/data/:id", (req, res) => {
  shoppingList = shoppingList.filter((item, index, arr) => {
    return item.id != req.params.id;
  });
  res.json({ msg: "Item deleted successfully!!" });
});

app.listen(5000, () => {
  console.log("Server started listening at Port 5000!!");
});
