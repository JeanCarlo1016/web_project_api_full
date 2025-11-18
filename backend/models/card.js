const mongoose = require('mongoose');

const avatarUrlRegex = /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/][\w\-._~:/?%#\[\]@!$&'()*+,;=]*)?#?$/;
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return avatarUrlRegex.test(v);
      },
      message: props => `${props.value} no es un enlace de avatar válido`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('card', cardSchema);
