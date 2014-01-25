var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var poolSchema = new Schema({
    emailAddress:  String,
    babyName: String,
    parentName:   String,
    dueDate: { type: Date, default: Date.now }
});

mongoose.model("Pool", poolSchema);
