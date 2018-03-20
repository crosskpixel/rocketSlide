/*import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import * as lodash from 'lodash';

export const LOAD_MODEL = () => {

    const { url, database, user, password, dialect } = (process.env.NODE_ENV.trim() == 'production' ? require("./../../package.json").production : require("./../../package.json").dev);

    const sequelize = new Sequelize(database, user, password, {	//configuracao do banco de dados
        host: url,
        dialect: dialect,
        pool: {
            max: 20,
            min: 0,
            idle: 10000
        }
    });

    var db = {};
    fs.readdirSync(__dirname)					//le todos arquivos dentro da pasta atual ou seja model
        .filter(file => file != 'index.js')
        .forEach(function (file, key) {			//para cada arquivo, importa para model e lança a variavel db
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db)							//faz uma verificacao em cada model, caso haja associacao q seja devidamente tratada
        .forEach(function (model) {
            if (!db[model].hasOwnProperty('associate')) {
                return;
            }
            return db[model].associate(db);
        });

    return lodash.extend({		//exporta estes parametros para todos os model para que sejam inicializados
        Sequelize: Sequelize,
        sequelize: sequelize,
    }, db);

}*/ 
