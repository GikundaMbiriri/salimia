// const { admin, db } = require("../Util/admin");

// exports.getDepartments=(req,res)=>{
//     db.collection('departments').get().then((data)=>{
//         let departments=[]
//         data.forEach((doc)=>{
//             departments.push(doc.data())
//         })
//         return res.json(departments)
//     }).catch(err=>console.error(err))

// }
// exports.getAuthenticatedUser = (req, res) => {
//     let userData = {};
//     db.doc(`/users/${req.user.name}`)
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           userData.credentials = doc.data();
//           return db.collection("likes").where("name", "==", req.user.name).get();
//         }
//       })
//       .then((data) => {
//         userData.likes = [];
//         data.forEach((doc) => {
//           userData.likes.push(doc.data());
//         });
  
//         return res.json(userData);
//       })
//       .catch((err) => {
//         console.error(err);
//         return res.status(500).json({ error: err.code });
//       });
//   };
  