/**
 * ORM数据类型集
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
var Sequelize = require('sequelize');

var DataTypes = Sequelize;

var String = (num, allowNull) => {
    if (!num) {
        num = 2048;
    }
    if (!allowNull) {
        allowNull = false;
    }
    return {
        type: DataTypes.STRING(num),
        allowNull
    }
};

var Double = (defaultValue) => {
    if (typeof defaultValue === 'undefined') {
        defaultValue = 0;
    }
    return {
        type: DataTypes.DOUBLE,
        defaultValue
    }
};

var Int = (defaultValue) => {
    if (typeof defaultValue === 'undefined') {
        defaultValue = 0;
    }
    return {
        type: DataTypes.INTEGER,
        defaultValue
    }
};

var Phone = (allowNull) => {
    if (typeof allowNull === 'undefined') {
        allowNull = false;
    }
    return {
        type: DataTypes.STRING(11),
        allowNull,
        validate: {
            is: /^\d{11}$/
        }
    }
};

var Url = () => {
    return {
        type: DataTypes.STRING,
        allowNull: false,
        vialidate: {
            isUrl: true
        }
    }
};

var Date = () => {
    return {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
};

var Bool = () => {
    return {
        type: Sequelize.BOOLEAN
    }
};

var Text = (allowNull) => {
    return {
        type: Sequelize.TEXT,
        allowNull
    }
};

var Array = (type,defaultValue) => {
    type = type || Sequelize.TEXT;
    defaultValue = defaultValue || [];
    return {
        type : Sequelize.ARRAY(type),
        defaultValue : []
    }
};

var val = (data) => {
    return data.map(function (item) {
        return item.dataValues;
    })
};

//var Enum = () => {
//    var args = [].slice.call(arguments);
//    return {
//        type:Sequelize.ENUM.apply(this,args)
//    }
//};

module.exports = {
    DataTypes: {
        String,
        Phone,
        Int,
        Url,
        Date,
        Double,
        Bool,
        Text,
        Array
        //Enum
    },
    Func: {
        //findById
        val
    }
};
