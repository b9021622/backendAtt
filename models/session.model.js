module.exports = mongoose => {
    var Session= mongoose.model(
        "session",
        mongoose.Schema({
            SessionID: {
                type: String,
                required: true,
                lowercase: true,
                unique: false
            },
            SessionName: {
                type: String,
                required: true,
                lowercase: true,
                unique: false
            },
            Lecturer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            },
            SessionType: {
                type: String,
                required: true,
                lowercase: true,
            },
            SessionDate:{
                type: Date,
                required: true,
                default: Date.now  
            },
            Length:{
                type: Number,
                required: true,
                default: 1 
            },
            SessionModule:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            },
            StudentsScheduled: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }],
            StudentsAttended: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }],
            AttendanceCode: {
                type: String,
                lowercase: true,
            },
        
        })

    );
    return Session;
};