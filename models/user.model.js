const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  avatar: {
    type: String,
    default: 'https://rentnjoy.com/development/wp-content/uploads/1457/86/analyst-placeholder-avatar.png'
  },
  token: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

function generateToken() {
  return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.token = generateToken();
  }

  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;