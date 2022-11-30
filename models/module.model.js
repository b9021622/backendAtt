module.exports = mongoose => {
    var Module = mongoose.model(
        "module",
        mongoose.Schema({
            ModuleID: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            ModuleName: {
                type: String,
                required: true,
                lowercase: true,
            },
            ModuleLeader: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            },
            ModuleLecturers: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecturer"
            }],
            Sessions: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }],
            StudentsEnrolled: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            }]
        
        })

    );
    return Module;
};