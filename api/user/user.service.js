const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(`INSERT INTO utilisateur (prenom, nom, sexe, email, password, tel) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.tel,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getAllUsers: (callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM utilisateur`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        )
    },
    getUsersById: (id, callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM utilisateur WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        )
    },
    getUsersByEmail: (email, callBack) => {
        pool.query(`SELECT id, prenom, nom, sexe, email, password, tel FROM utilisateur WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(`UPDATE utilisateur SET prenom = ?, nom = ?, sexe = ?, email= ?, password = ?, tel = ? WHERE id = ?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.tel,
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

}