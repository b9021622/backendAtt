module.exports = mongoose => {
    var Course = mongoose.model(
        "course",
        mongoose.Schema({
            CourseID: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            CourseName: {
                type: String,
                required: true,
                lowercase: true,
            },
            CourseLeader: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer",
            },
            Modules: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Module"
            }],
            StudentsEnrolled: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]

        
        })

    );
    return Course;
};