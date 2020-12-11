const { Schema, model, mongo } = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');


const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: [{ type: Number, ref:'Comment' }],
    date: { type: Date, default: Date.now },
    author: {
        type: Number, ref:'UserDetails'
    },
});

const userDetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    n_name: {
        type: String,
        required: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true
    },
    birth_y: {
        type: Number,
        required: true
    },
    birth_m: {
        type: Number,
    },
    major: String,
    dream: String,
    region: {
        type: String,
        required: true
    },
    articles: [{ type: Number, ref:'Article' }],
    salt: {
        type: Number,
    }
});

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: Number,
    author: { type: Number, ref:'UserDetails' },
    date: { type: Date, default: Date.now },
    article: {type: Number, ref:'Article'}
});

articleSchema.plugin(mongooseAutoInc.plugin, 'Article');
userDetailsSchema.plugin(mongooseAutoInc.plugin, 'UserDetails');
commentSchema.plugin(mongooseAutoInc.plugin, 'Comment');


const articleModel = model('Article', articleSchema);
const userModel = model('UserDetails', userDetailsSchema);
const commentModel = model('Comment', commentSchema);

module.exports = {
    Article: articleModel,
    UserDetails: userModel,
    Comment: commentModel
}