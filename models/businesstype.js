module.exports = function(sequelize, DataTypes) {
  var BusinessType = sequelize.define("business_type", {
    typeName : {
      allowNull: false,
      type: DataTypes.STRING
    },
    modules:DataTypes.STRING
  });
  return BusinessType;
};
