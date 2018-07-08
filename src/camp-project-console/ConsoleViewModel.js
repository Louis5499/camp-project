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
  if (consoleViewModel.TeamA.team()[0] == consoleViewModel.TeamB.team()[0]) {
    alert("Team A is Team B");
    return false;
  }
  // TODO: Add more checks.
  return true;
}

function Submit() {
  if (Check()) {
    // Update database.
    Log("Trying to Submit");
    UpdateFirebase(consoleViewModel.TeamA, consoleViewModel.TeamB, () => { 
      Log("Submit Successfully");
      // Reset Team data.
      // Bug: Knockout bug not updating selected option.
      //consoleViewModel.TeamA.team(1);
      consoleViewModel.TeamA.money(0);
      consoleViewModel.TeamA.atk(0);
      consoleViewModel.TeamA.def(0);
      consoleViewModel.TeamA.sp(0);
      // Reset Team data.
      //consoleViewModel.TeamB.team(1);
      consoleViewModel.TeamB.money(0);
      consoleViewModel.TeamB.atk(0);
      consoleViewModel.TeamB.def(0);
      consoleViewModel.TeamB.sp(0);
    }, () => { Log("Submit Failed!!!"); }, 10000);
  }
}

// Apply ViewModel.
var consoleViewModel = new ConsoleViewModel();
ko.applyBindings(consoleViewModel);
Log("Initialized");
