const {create, getAllUsers, getUsersById, getUsersByEmail, updateUser} = require("./user.service");

const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Echec d'inscription",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    findUserById: (req, res) => {
        const id = req.params.id;
        getUsersById(id, (err, results) => {
                if (err) {
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "User introuvable"
                    })
                }
                return res.json({
                    success: 1,
                    data: results,
                })
            }
        )
    },
    findAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                return;
            }
            return res.json({
                success: 1,
                data: results,
            })
        })
    },
    updated: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Echec de modification",
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Modification effectué avec succés",

            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUsersByEmail(body.email, (err, results) => {
                if (err) {
                    return;
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        message: "Merci de vérifier votre email ou mot de passe",
                    })
                }
                const result = compareSync(body.password, results.password)
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({result: results},
                        process.env.SECRET_KEY,
                        {expiresIn: "24h",});
                    return res.json({
                        success: 1,
                        message: "Authentification réussie",
                        token: jsontoken,
                    })
                } else {
                    return res.json({
                        success: 0,
                        message: "Echec d'authentification",
                    })
                }
            }
        )
    },
}
;