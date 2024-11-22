const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.UserCompte;
const TypeCompte = db.TypeCompte;
const CompteEtat = db.CompteEtat;

exports.signup = async (req, res) => {
  try {
    const { nom, prenom, username, password, age, genre, pays, region } = req.body;

    // Create user
    const user = await User.create({
      nom,
      prenom,
      username,
      password: bcrypt.hashSync(password, 8),
      age,
      genre,
      pays,
      region
    });

    // Create type compte (free by default)
    await TypeCompte.create({
      id_users: user.id,
      etat: 0
    });

    // Create compte etat (non vérifié by default)
    await CompteEtat.create({
      id_users: user.id,
      etat: 0
    });

    res.status(201).send({
      message: "User registered successfully!"
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      },
      include: [
        { model: TypeCompte },
        { model: CompteEtat }
      ]
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      nom: user.nom,
      prenom: user.prenom,
      accountType: user.type_compte.etat,
      isVerified: user.compte_etat.etat,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};