const mysql = require('mysql');
const config = require('./config.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class Database {

    constructor() {
        this.conn = mysql.createPool(config);
    }

    // Select account data for /account
    selectAccountById(acc_id) {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT account.*
            FROM account
            WHERE account.acc_id = ?`, [acc_id], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result[0]); // by PK
            });
        });
    }

    // Select account for /login
    selectAccount(username) {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT account.acc_id,
                account.password
            FROM account
            WHERE username = ?`, [username], function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result[0]); // by PK
            });
        });
    }

    // Insert account for /register
    insertAccount(username, email, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds).then(hash => {
                this.conn.query(`INSERT INTO account (username, email, password) VALUES (?, ?, ?)`, [username, email, hash], function(err,result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }
}

const database = new Database();

module.exports = database;
