module.exports = function(sequelize, DataTypes) {
    const Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Contact.associate = function(models) {
        // We're saying that a Post should belong to an 
        // A Post can't be created without an  due to the foreign key constraint
        Contact.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      return (Contact)
};
