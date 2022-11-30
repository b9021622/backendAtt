module.exports = mongoose => {
    var AttCode = mongoose.model(
      "attcode",
      mongoose.Schema(
        {
          Code: String
        }
      )
    );
      return AttCode;
   };