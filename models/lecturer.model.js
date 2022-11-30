module.exports = mongoose => {
    var Lecturer= mongoose.model(
        "lecturer",
        mongoose.Schema({
            LecturerID: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            LecturerFName: {
                type: String,
                required: true,
                lowercase: true,
            },
            LecturerSName: {
                type: String,
                required: true,
                 lowercase: true,
            },
            LecturerPassword: {
                type: String
            },
            CoursesLed: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }],
            ModulesLed: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            SessionsScheduled: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }],
        
        })

    );
    return Lecturer;
};
