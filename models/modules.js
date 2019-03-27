module.exports = function(sequelize, DataTypes) {
    var Modules = sequelize.define("modules", {
      moduleName : {
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    return Modules;
  };