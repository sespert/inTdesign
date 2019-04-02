module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("users", {
      userName : {
        allowNull: false,
        type: DataTypes.STRING
      },
      yelpId: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        defaultValue: "business.info@email.com"
      },
      logo: {
        type: DataTypes.STRING,
        defaultValue: "https://baseload.com/wp-content/uploads/2018/07/logo-placeholder@2x.png"
      },
      coordinates: DataTypes.STRING,
      rating: DataTypes.STRING,
      pictures: DataTypes.STRING,
      schedule: DataTypes.STRING,
      services: {
        type: DataTypes. STRING,
        defaultValue: "../assets/images/menuDefault.png"
      },
      aboutUs: DataTypes.TEXT,
      businessType: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      modules: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
    return Users;
  };