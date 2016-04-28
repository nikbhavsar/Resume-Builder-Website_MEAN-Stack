var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    username: {
        type: Number,
        default: '',
        trim: true,
        required: 'Please Enter Your Student Number'
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'First Name cannot be blank'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Last Name cannot be blank'
    },
    phoneNumber: {
        type: Number,
        default: '',
        trim: true,
        required: 'Please Enter Your Phone Number'
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    address: {
        type: String,
        default: '',
        trim: true,
        required: 'Please Enter Your Address'
    },
    city: {
        type: String,
        default: '',
        trim: true,
        required: 'Please Enter City'
    },
    country: {
        type: String,
        default: '',
        trim: true,
        required: 'please Enter Your Country'
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            }
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }
        else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);