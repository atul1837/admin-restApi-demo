const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/adminRestApiDemo");
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});
