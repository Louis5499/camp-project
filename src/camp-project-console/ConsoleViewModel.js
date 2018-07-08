class TeamData {
  /**
   * Store the team data that we want to modify later.
   * @param  {number} team
   * @param  {number} money
   * @param  {number} atk
   * @param  {number} def
   * @param  {number} sp
   */
  constructor(team, money, atk, def, sp) {
    this.team = ko.observable(team);
    this.money = ko.observable(money);
    this.atk = ko.observable(atk);
    this.def = ko.observable(def);
    this.sp = ko.observable(sp);
  }
}
/**
 * ViewModel for index.html.
 */
function ConsoleViewModel() {
  var self = this;

  /**
   * All Items are created here.
   * Knockout.js will automatically draw these and
   * maintain the events ocurred and automatically
   * update the value here.
   */
  self.TeamA = new TeamData(1, 0, 0, 0, 0);
  self.TeamB = new TeamData(1, 0, 0, 0, 0);
  self.Messages = ko.observableArray();
}

function Log(msg) {
  consoleViewModel.Messages.push(msg + ". " + (new Date()).toLocaleTimeString());
}

/**
 * Check if inputs are valid.
 */
function Check() {
  /*if (consoleViewModel.TeamA.team() == consoleViewModel.TeamB.team()) {
    alert("Team A is Team B");
    return false;
  }*/
  // TODO: Add more checks.
  return true;
}

function Submit() {
  if (Check()) {
    // Update database.
    Log("Trying to Submit");
    UpdateFirebase(consoleViewModel.TeamA, consoleViewModel.TeamB, () => { Log("Submit Successfully"); }, () => { Log("Submit Failed!!!"); }, 10000);
  }
}

// Apply ViewModel.
var consoleViewModel = new ConsoleViewModel();
ko.applyBindings(consoleViewModel);
Log("Initialized");
