const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  aboutme: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Types.ObjectId,
      ref: "user",
    },
  ],
  favorites: [
    {
      type: Types.ObjectId,
      ref: "lobby",
    },
  ],
});

var friendSchema = new Schema({
  requester: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  friendList: [
    {
      friendId: { type: Types.ObjectId, ref: "User" },
      friendName: { type: String, default: "" },
    },
  ],
  totalRequest: { type: Number, default: 0 },
});

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
const Friend = model("friend", friendSchema);

module.exports = Friend;
module.exports = User;
