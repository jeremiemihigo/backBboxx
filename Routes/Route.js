const express = require("express");
const router = express.Router();
const { Zone, ReadZone, AffecterZone } = require("../Controllers/Zone");
const { protect } = require("../MiddleWare/protect");
const {
  AddAgent,
  ReadAgent,
  BloquerAgent,
  UpdateAgent,
  InsertManyAgent,
} = require("../Controllers/Agent");
const { login, resetPassword,LoginAgentAdmin, UpdatePassword } = require("../Controllers/Login");
const {
  demande,
  DemandeAttente,
  ToutesDemande,
  ToutesDemandeAgent,
  updateOneDemande,
  lectureDemandeBd,
  lectureDemandeMobile,
  ToutesDemandeAttente,
  deleteDemande,
} = require("../Controllers/Demande");
const { Parametre, ReadParametre, ReadPeriodeActive, deleteParams } = require("../Controllers/Parametre");

const multer = require("multer");
const {
  reponse,
  OneReponse,
  updateReponse,
  ReponseDemandeLot,
} = require("../Controllers/Reponse");
const { Rapport, StatZone } = require("../Controllers/Rapport");
const {
  Reclamation,
  ReadMessage,
  DeleteReclamation,
} = require("../Controllers/Reclamation");
const { readPeriodeGroup, demandePourChaquePeriode } = require("../Controllers/Statistique");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/");
  },
  filename: (req, file, cb) => {
    const image = file.originalname.split(".");

    cb(null, `${Date.now()}.${image[1]}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});
var upload = multer({ storage: storage });
//Read
const { ReadUser, readUserAdmin } = require("../Controllers/Read");

router.get("/zone", ReadZone);
router.get("/agent", ReadAgent);
router.get("/user", ReadUser);
router.get("/userAdmin", readUserAdmin);
router.get("/message/:codeAgent", ReadMessage);

router.get("/parametreRead", ReadParametre);
router.get("/touteDemande", ToutesDemande);
router.get("/toutesDemandeAttente", ToutesDemandeAttente)
//Rapport visite ménage
router.post("/rapport", Rapport);
router.get("/oneReponse/:id", OneReponse);
//Create

router.post("/paramatre", Parametre);
router.post("/postzone", Zone);
router.post("/postAgent", AddAgent);
router.post("/reponsedemande", reponse);
router.post("/reclamation", Reclamation, ReadMessage);
//Update
router.put("/zone", AffecterZone);
router.put("/reponse", updateReponse);
router.put("/bloquer", BloquerAgent);
router.put("/reset", resetPassword);
router.delete("/deleteReclamation/:id", DeleteReclamation);
router.put("/modifierDemandeData", updateOneDemande);
router.put("/agent", UpdateAgent);
router.post("/manyAgent", InsertManyAgent)
router.put("/userId", UpdatePassword)
//Mobiles
router.get("/demandeReponse/:id", ToutesDemandeAgent);
router.get("/readDemande", DemandeAttente);
router.post("/demande", upload.single("file"), demande);

router.post("/demandeImage", upload.single("file"));
router.post("/demandeAgentAll", lectureDemandeBd);

router.post("/login", login);
router.post("/loginUserAdmin", LoginAgentAdmin);

//Lien après presentation du systeme
router.get("/demandeAll/:lot/:codeAgent", lectureDemandeMobile);
router.get("/paquet/:codeAgent", readPeriodeGroup)
router.get("/periodeActive", ReadPeriodeActive)
router.get("/demandePourChaquePeriode", demandePourChaquePeriode)
router.get("/statZone", StatZone)
router.delete("/deleteParams", deleteParams)

router.delete("/demande/:id", deleteDemande)
router.get("/reponseAll",  ReponseDemandeLot)


//Raison
const { AddRaison, ReadRaison,DeleteRaison, UpdateRaison } = require("../Controllers/Raison");
const { AddAdminAgent, ResetPasswords, ReadAgentAdmin, BloquerAgentAdmin } = require("../Controllers/AgentAdmin");

router.post("/raison", AddRaison)
router.get("/raison", ReadRaison)
router.delete("/raison", DeleteRaison)
router.put("/raison", UpdateRaison)

//Agent
router.post("/addAdminAgent", protect, AddAdminAgent)
router.put("/resetPasswordAgentAdmin", protect, ResetPasswords)
router.get("/readAgentAdmin", protect, ReadAgentAdmin)
router.put('/bloquerAgentAdmin', protect, BloquerAgentAdmin)

module.exports = router;
