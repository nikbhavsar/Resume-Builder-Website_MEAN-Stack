var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExperieceSchema = new Schema({

    companyName: {
        type: String,
        default: '',
        trim: true,
        required: 'Please Enter Your Company Name'
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
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },

    position: {
        type: String,
        default: '',
        trim: true,
        required: 'Please Enter Your Position'
    },
    detail: {
        type: String,
        default: '',
        trim: true,
        required: 'please Enter Your Job Detais'
    },

    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Experience', ExperieceSchema);