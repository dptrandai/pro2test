module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define("Notes", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },




    });

    Notes.associate = function(models) {
        // We're saying that a Post should belong to an 
        // A Post can't be created without an  due to the foreign key constraint
        Notes.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

      return(Notes)


};

