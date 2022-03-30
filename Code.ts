function refresh() {
  var user = Session.getActiveUser().getEmail();
  if (user != "dpaight@hemetusd.org"){
    return;
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var me = SpreadsheetApp.openById("1Ogw5y2nTRXDa0we376EPr6-Xz2ssJKkG_7CXhnaOiPE");
  var sheet = ss.getSheetByName('master');
  var sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    var el = sheets[i];
    if (el.getName() !== "master" && el.getName() != "data") {
      ss.deleteSheet(el);
      if (!sheets[i]) {
        break;
      }
    }
  }
  for (let i = 0; i < 20; i++) {

    var newSheet = sheet.copyTo(me);
    newSheet.setName('c' + i);
    var protection = newSheet.protect().setDescription('Sample protected range');
    var range2 = newSheet.getRange('A2:C2');
    protection.setUnprotectedRanges([range2]);

    // Ensure the current user is an editor before removing others. Otherwise, if the user's edit
    // permission comes from a group, the script throws an exception upon removing the group.
    var dan = Session.getEffectiveUser();
    protection.addEditor(dan);
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }
  }
}