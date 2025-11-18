const mongoose = require('mongoose');

const avatarUrlRegex = /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/][\w\-._~:/?%#\[\]@!$&'()*+,;=]*)?#?$/;
const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return avatarUrlRegex.test(v);
      },
      message: props => `${props.value} no es una url de avatar válida`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return emailRegex.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  },
  password: {
    type: String,
    required: true,
    select: false // añadir el campo de selección
  }
});


module.exports = mongoose.model('User', userSchema);