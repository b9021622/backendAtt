module.exports = mongoose => {
    var Student= mongoose.model(
        "student",
        mongoose.Schema({
            StudentID: {
                type: String,
                required: true,
                lowercase: true,
            },
            StudentFName: {
                type: String,
                required: true,
                lowercase: true,
            },
            StudentSName: {
                type: String,
                required: true,
                lowercase: true,
            },
            StudentPassword: {
                type: String,
            },
            Course: [{
                type: String,
                required: true,
                lowercase: true,
            }],
            ModulesStudied: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            SessionsScheduled: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }],
            SessionsAttended: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }]


        
        })

    );
    return Student;
};
