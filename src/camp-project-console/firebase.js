// Initialize Firebase
var config = {
  apiKey: "AIzaSyCFrCY90QeV_F2vqI4ZNpCmtPu3TxttJ28",
  authDomain: "camp-project-ac382.firebaseapp.com",
  databaseURL: "https://camp-project-ac382.firebaseio.com",
  storageBucket: "camp-project-ac382.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function UpdateFirebase(TeamA, TeamB, success, failure, ms) {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('Promise timed out after ' + ms + ' ms');
    }, ms);
    UpdateData(TeamA, TeamB, resolve, reject);
  });
  p.then(() => { success(); }).catch(() => { failure(); });
}

function AddTeamData(Team, TeamData) {
  TeamData.money = Number(Team.money()) + TeamData["money"];
  TeamData.atk = Number(Team.atk()) + TeamData["atk"];
  TeamData.def = Number(Team.def()) + TeamData["def"];
  TeamData.sp = Number(Team.sp()) + TeamData["sp"];
}

function UpdateData(TeamA, TeamB, resolve, reject) {
  var TeamAData, TeamBData;
  var NewTeamAData, NewTeamBData;
  var ta = (TeamA.team() - 1), tb = (TeamB.team() - 1);
  // Caution: Call back hell below...
  // 1. Deal with TeamA.
  database.ref("teams/" + ta + "/").once("value").then(function (snapshot) {
    // Got TeamA Data from firebase.
    TeamAData = snapshot.val();
    Log("Old TeamA Data: " + JSON.stringify(TeamAData));
    AddTeamData(TeamA, TeamAData);
    firebase.database().ref("teams/" + ta + "/").set(TeamAData, function (error) {
      if (error) {
        reject("Failed to write TeamA.")
      } else {
        // Setted New TeamAData to firebase.
        database.ref("teams/" + ta + "/").once("value").then(function (snapshot) {
          // Got Modified TeamA Data from firebase.
          TeamAData = snapshot.val();
          Log("New TeamA Data: " + JSON.stringify(TeamAData));
          // 2. Deal with TeamB.
          database.ref("teams/" + tb + "/").once("value").then(function (snapshot) {
            // Got TeamB Data from firebase.
            TeamBData = snapshot.val();
            Log("Old TeamB Data: " + JSON.stringify(TeamBData));
            AddTeamData(TeamB, TeamBData);
            firebase.database().ref("teams/" + tb + "/").set(TeamBData, function (error) {
              if (error) {
                reject("Failed to write TeamB.")
              } else {
                // Setted New TeamBData to firebase.
                database.ref("teams/" + tb + "/").once("value").then(function (snapshot) {
                  // Got Modified TeamB Data from firebase.
                  TeamBData = snapshot.val();
                  Log("New TeamB Data: " + JSON.stringify(TeamBData));
                  // Done.
                  resolve();
                });
              }
            });
          });
        });
      }
    });
  });
}