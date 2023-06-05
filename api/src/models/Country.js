const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
      id:{
        type: DataTypes.STRING(3),
        defaultValue:()=>{
          let id='';
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          for (let i=0; i <3; i++){
          id+=letters[Math.floor(Math.random()* letters.length)];
        }
          return id;
        },
          primaryKey: true,
          allowNull:false,
          unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      flag:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      region:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      capital:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      subregion:{
        type: DataTypes.STRING,
        allowNull:true,
      },
      area:{
        type: DataTypes.FLOAT,
        allowNull:true,
      },
      population:{
        type: DataTypes.INTEGER,
        allowNull:false,
      }
    },{timestamps: false }
  );
};
