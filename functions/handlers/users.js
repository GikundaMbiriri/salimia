const { admin, db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);


exports.signUp = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      name: req.body.name,
    };
    const { valid, errors } = validateSignUpData(newUser);
    if (!valid) return res.status(400).json(errors);
    const noImage = "avatar.png";
    let token, userId;
    db.doc(`/users/${newUser.name}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ name: "this name is already taken" });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          name: newUser.name,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId,
        };
        return db.doc(`/users/${newUser.name}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json({ email: "auth/email-already-in-use" });
        }
        return res
          .status(500)
          .json({ general: "something went wrong ,please try again later" });
      });
}

  