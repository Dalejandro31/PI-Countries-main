const {DataTypes, } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('activity', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                min:1,
                max:5,
            },
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        season:{
            type: DataTypes.ENUM('Summer','Fall','Winter','Spring'),
            allowNull:false,
        },
        createdInDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },{timestamps: false});
} 