jQuery.support.cors = true;

//------------------
// Global Constants
//------------------
var SYSTEM_REBOOT_TRUE            = "SysRbtRqt=1";
var SYSTEM_REBOOT_FALSE           = "SysRbtRqt=0";
var UPDATE_REMOTE_SERVER_WARNING  = "Depends on how many servers you select" +
      ", the process time may take long time.<br />" +
      "Please do <b>NOT</b> refresh this page.";

var DEFAULT_TAB_NAME              = "Main";


//------------------
// Global variables
//------------------
//
// Keep uninitializing global variables uninitialized, or it may occur errors
//
var gSysTimeIntervalFd;
var gSysTimeArray = new Number ();
gSysTimeArray["Year"] = "";
gSysTimeArray["Month"] = "";
gSysTimeArray["Day"] = "";
gSysTimeArray["Hour"] = "";
gSysTimeArray["Minute"] = "";
gSysTimeArray["Second"] = "";
var gSysTimeDiff = 0;
var gSysTimeFuture = false;
var gSysTimeUpdateCount;
var gIsSetSysTime                 = false;
var gIsInitSysTime                = false;
var gExitFun                      = 0;
//-[start-130118-IB10500006-add]
var gShowHelpMsg                  = false;
//-[end-130118-IB10500006-add]

//var gDefatultTabFormHeight = (parseInt (document.documentElement.clientHeight) > (330 + 170)) ? (parseInt (document.documentElement.clientHeight) - 170) : 330;
//
// Do not initialize this global variable!
// It would be changed when we use index.html to process xml and xslt,
// because this variable will be loaded twice, and the second time initialization would be the last result.
//
var gDefatultTabFormHeight;
var gTempFormId = null;

//
// Operate after popup a loading page
//
var gThisNode = null;
var gAjaxServerInfo = null;
var gRemoteServers = new Array();
var gUploadFilesInfo = null;
var gAjaxSubmitObjs = null;
var gIsSubmitOneByOne = false;
var gAjaxFormData = null;
var gStopAction = false;
var gIsTxtConfig = false;
var gThisServerInfo = null;

var gFormStack = new Array ();
var gFormNameStack = new Array ();
var SuppressType=0;

//------------------
// Initilaizing
//------------------

$.ajaxSetup ({
  //
  // Disable caching of AJAX responses or it may cause problem on IE
  //
  cache: false
});

//------------------
// Functions
//------------------

function AutoAdjustDateTime () {
  var Year, Month, Day, Hour, Minute, Second;
  var DateObj, DateVal;
  var OriginalTimeNum;

  DateObj = new Date ();
  DateVal = DateObj.getTime();

  // if (!gIsSetSysTime || ($('#EditSystime').css("display") != "none")) {
  if (gIsSetSysTime) {
    if (gSysTimeFuture) {
      DateVal += gSysTimeDiff;
    } else {
      DateVal -= gSysTimeDiff;
    }
    DateObj = new Date (DateVal);
  }

  Second = FillNumberWithZero (DateObj.getSeconds());
  Minute = FillNumberWithZero (DateObj.getMinutes());
  Hour = FillNumberWithZero (DateObj.getHours());
  Day = FillNumberWithZero (DateObj.getDate());
  Month = FillNumberWithZero (DateObj.getMonth() + 1);
  Year = DateObj.getFullYear();

//  alert (Month + "/" + Day +"/" + Year + " " + Hour + ":" +Minute + ":"+ Second);
  $('#SystemDate').html("[" + Month + "/" + Day + "/" + Year + "]");
  $('#SystemTime').html("[" + Hour + ":" + Minute + ":" + Second + "]");
}

function UrlReload () {
  //
  // javascript
  //
  // var url = window.location.href;
  // window.location.href = url;
//  window.location.reload (true);
  //
  // jquery
  //
  location.reload ();
  gIsSetSysTime = false;
}

function UpdateSystemFileds () {
  var DateObj, DateVal;

  DateObj = new Date ();
  DateVal = DateObj.getTime();

  if (gIsSetSysTime) {
    if (gSysTimeFuture) {
      DateVal += gSysTimeDiff;
    } else {
      DateVal -= gSysTimeDiff;
    }
    DateObj = new Date (DateVal);
  }
  
  $('#Year').val((gSysTimeArray["Year"] == "") ? DateObj.getFullYear() : gSysTimeArray["Year"]);
  $('#Month').val((gSysTimeArray["Month"] == "") ? (DateObj.getMonth() + 1) : gSysTimeArray["Month"]).focus();
  $('#Day').val((gSysTimeArray["Day"] == "") ? DateObj.getDate() : gSysTimeArray["Day"]);
  $('#Hour').val((gSysTimeArray["Hour"] == "") ? DateObj.getHours() : gSysTimeArray["Hour"]);
  $('#Minute').val((gSysTimeArray["Minute"] == "") ? DateObj.getMinutes() : gSysTimeArray["Minute"]);
  $('#Second').val((gSysTimeArray["Second"] == "") ? DateObj.getSeconds() : gSysTimeArray["Second"]);
}

function InitSystemTimer () {
  gSysTimeIntervalFd = setInterval (AutoAdjustDateTime, 1000);
  gSysTimeUpdateCount = 0;

  $("#Month, #Day, #Year, #Hour, #Minute, #Second").change (function () {
    var Year, Month, Day, Hour, Minute, Second;
    var ValStr, ValInt;
    var CurDate = new Date();

    gIsSetSysTime = false;

    ValStr = $('#Month').val();
    ValInt = parseInt (ValStr);
    if ((ValStr != "") && ((ValInt > 0) && (ValInt < 13))) {
      gSysTimeArray["Month"] = ValStr;
      Month = ValStr - 1;
      gIsSetSysTime = true;
    } else {
      Month = CurDate.getMonth();
    }
    ValStr = $('#Day').val();
    ValInt = parseInt (ValStr);
    if ((ValStr != "") && ((ValInt > 0) && (ValInt < 32))) {
      gSysTimeArray["Day"] = ValStr;
      Day = ValStr;
      gIsSetSysTime = true;
    } else {
      Day = CurDate.getDate();
    }
    ValStr = $('#Year').val();
    if (ValStr != "") {
      gSysTimeArray["Year"] = ValStr;
      Year = ValStr;
      gIsSetSysTime = true;
    } else {
      Year = CurDate.getFullYear();
    }

    ValStr = $('#Hour').val();
    ValInt = parseInt (ValStr);
    if ((ValStr != "") && ((ValInt >= 0) && (ValInt < 24))) {
      gSysTimeArray["Hour"] = ValStr;
      Hour = ValStr;
      gIsSetSysTime = true;
    } else {
      Hour = CurDate.getHours();
    }
    ValStr = $('#Minute').val();
    ValInt = parseInt (ValStr);
    if ((ValStr != "") && ((ValInt >= 0) && (ValInt < 60))) {
      gSysTimeArray["Minute"] = ValStr;
      Minute = ValStr;
      gIsSetSysTime = true;
    } else {
      Minute = CurDate.getMinutes();
    }
    ValStr = $('#Second').val();
    ValInt = parseInt (ValStr);
    if ((ValStr != "") && ((ValInt >= 0) && (ValInt < 60))) {
      gSysTimeArray["Second"] = ValStr;
      Second = ValStr;
      gIsSetSysTime = true;
    } else {
      Second = CurDate.getSeconds();
    }

    if (gIsSetSysTime) {
      var NewDate = new Date(Year, Month, Day, Hour, Minute, Second);
      if (NewDate > CurDate) {
        gSysTimeFuture = true;
        gSysTimeDiff = NewDate - CurDate;
      } else {
        gSysTimeFuture = false;
        gSysTimeDiff = CurDate - NewDate;
      }
    }
    $("#Month, #Day, #Year, #Hour, #Minute, #Second").attr('act', 'true');
  });

  $('#Systime .TimeContentField').click(function () {
    //
    // Time has been set, clear those input field
    //
    $('#Systime').css("display", "none");
    $('#EditSystime').css("display", "");

    UpdateSystemFileds ();
  });

  $('#EditSystime :input').keyup(function (event) {
    if(event.keyCode == 13) {
      // Press Enter on system time input fields
      $('#EditSystime').css("display", "none");
      $('#Systime').css("display", "");
    } else if (event.keyCode == 27) {
      // Press ESC to cancel system time modification
      $('#EditSystime').css("display", "none");
      $('#Systime').css("display", "");
      $("#Month, #Day, #Year, #Hour, #Minute, #Second").val("");
      gIsSetSysTime = false;
    }
  });
}

function InitGlobalObjects () {
  gUploadFilesInfo = null;
  //
  // Server information is an JSON object
  //
  if (!gThisServerInfo) {
    gThisServerInfo = GetServerInfo ();
    if (!gThisServerInfo) {
      return false;
    }
  }
  if (gRemoteServers.length > 0) {
    gRemoteServers.splice (0, gRemoteServers.length);
  }

  return true;
}

function SubmitData (FunNum, IsReboot) {
  var HttpLink = "";
  var RestartInfo = "";
  var PopupMsg;
  var Result;
  var Data = "";
  var SubBtnInfo;

  if (IsReboot == true) {
    RestartInfo = "&" + SYSTEM_REBOOT_TRUE;
    PopupMsg = "Processing...<br /><br />" +
      "<b>System will reboot when operation is finished</b><br /><br />" +
      "Please do <b>NOT</b> refresh this page!";
  } else {
    PopupMsg = "Processing...<br /><br />" +
      "Please do <b>NOT</b> refresh this page!";
  }
  PopupInfo ("Send request", PopupMsg);

  //
  // To reflect floating timer
  //
  UpdateSystemFileds ();

  //
  // Set unactivated items to be disabled
  //
  $('#DataForm :input').not ('[act]').attr("disabled", true);

  switch (parseInt(FunNum)) {
    case 1: // Save changes and exit
    case 3: // Save changes
    case 7: // Save customized defaults
      SubBtnInfo = $('#ExitInfo .ExitBtn[funnum="' + FunNum + '"]').attr("name");
      $('#ExitInfo .ExitBtn').append ("<input type=\"text\" id=\"xx-" + SubBtnInfo + "\" name=\"" + SubBtnInfo + "\" value=\"0\" style=\"display: none\"></input>");
      $('#ExitInfo .ExitBtn[funnum="' + FunNum + '"]').remove("#xx" + SubBtnInfo);
      Data = $('#DataForm').serialize() + RestartInfo;
      break;
  }
  $('#DataForm :input').not ('[act]').attr("disabled", false);

  var retStr = window._callFun ('ExitBtn:' + FunNum, Data);

  gIsSetSysTime = false;
  
  ClosePopup();
}

function SubmitAndRestartSystem (FunNum) {
  PopupInfo ("Reboot confirm", "Are you going to <b>reboot</b> system after this action?");
  SetCtrlButtons (POPUP_WIN_BTN_YES, function () {
    SubmitData (FunNum, true);
  });
  SetCtrlButtons (POPUP_WIN_BTN_NO, function () {
    SubmitData (FunNum, false);
  });
}

function ConfirmMsg (FunNum, FunMsg, AskIfReboot) {
  PopupInfo ("Confirm Message", "Are you sure to <b>" + FunMsg + "</b>");

  SetCtrlButtons (POPUP_WIN_BTN_NO, ClosePopup);

  switch (parseInt(FunNum)) {

  case 7: // Save customized defaults
  case 1: // Save changes and exit
  case 3: // Save changes
    if (AskIfReboot == true) {
      SetCtrlButtons (POPUP_WIN_BTN_YES, function () {
        SubmitAndRestartSystem (FunNum);
      });
    } else {
      SetCtrlButtons (POPUP_WIN_BTN_YES, function () {
        SubmitData (FunNum, false);
      });
    }
    break;

  case 2: // Discard changes and exit
  case 6: // Load customized defaults
    SetCtrlButtons (POPUP_WIN_BTN_YES, function () {
      ClosePopup ();
      SubmitData (FunNum, false);
    });
    break;

  case 4: // Discard changes
    //
    // Close this window without popup another confirm window
    //
    SetCtrlButtons (POPUP_WIN_BTN_YES, function () {
      UrlReload ();
    });
    break;

  case 0: // Function number is not set
  default: // This case won't happen
    break;
  }
}

$('#ExitInfo .ExitBtn').click(function() {
    var Node = $(this);
    var FuncNumber = Node.attr("funnum");
    var NodtTitle = Node.find('span').html();

    switch (parseInt(FuncNumber)) {

        case 5: // Load default
            PopupInfo("Confirm Message", "This operation will <b>REBOOT</b> the system.<br/><br/>Are you sure to <b>" + Node.find('span').html() + "</b>");
            SetCtrlButtons(POPUP_WIN_BTN_NO, ClosePopup);
            SetCtrlButtons(POPUP_WIN_BTN_YES, function() {
              ClosePopup ();
              SubmitData(FuncNumber, false);
            });
            break;

        case 7: // Save customized defaults
        case 1: // Save changes and exit
        case 6: // Load customized defaults
            if ($('#BiosImgDefault').length > 0) {
              //
              // Bios default value doesn't need to reboot
              //
              ConfirmMsg (FuncNumber, Node.find('span').html(), false);
            } else {
              ConfirmMsg (FuncNumber, Node.find('span').html(), true);
            }
            break;

        case 2: // Discard changes and exit
        case 3: // Save changes
        case 4: // Discard changes
            ConfirmMsg (FuncNumber, Node.find('span').html(), false);
            break;

        case 0: // Function number is not set
        default: // This case won't happen
            break;
    }
});

function ClickTab (NodeName) {
  var ThisObj;
  var TargetObj;
  var StdObj = $("#StdBody");
  var InnObj = $("#InnerBody");
  var HideObj = null;

  if (StdObj.is (":visible")) {
    //
    // Still on the top level of menu
    //
    if (StdObj.attr ("show") != undefined) {
      StdObj.removeAttr ("show");
    }
    ThisObj = StdObj.find ("div.FormFrame").filter(":visible");
    if (ThisObj.attr ("id") == (NodeName + "Info")) {
      return;
    }
    ThisObj.css ("display", "none");
  } else if (InnObj.is (":visible")) {
    HideObj = InnObj;
    if (HideObj.attr ("show") != undefined) {
      HideObj.removeAttr ("show");
    }
  } else {
    alert ("Is no presented frame?");
  }
  if (HideObj) {
    HideObj.find ("div.FormFrame").filter(":visible").css ("display", "none");
//    HideObj.css ("display", "none");
    StdObj.css ("display", "");
  }

  //
  // Back from other FormFrame
  //
  ThisObj = StdObj.find ("div.FormFrame").filter(":visible");
  if (ThisObj.attr ("id") == (NodeName + "Info")) {
    return;
  }
  ThisObj.css ("display", "none");
  TargetObj = $("#" + NodeName + "Info");
  TargetObj.css ("display", "");
  ControlFormRow ($(TargetObj));
}

function InitTab () {
  $("#MainInfo").css ("display", "");
  ControlFormRow ($("#MainInfo"));

  $("div a.OrderListLink").click (function () {
    var NodeName = $(this).html ();
    var StdBody = $("div#StdBody");
    var TargetNode;

    NodeName = NodeName.replace (" ", "_");
    if (gFormStack.length > 0) {
      gFormStack.splice (0, gFormStack.length);
    }
    if (gFormNameStack.length > 0) {
      gFormNameStack.splice (0, gFormNameStack.length);
    }
    TargetNode = $("#" + NodeName + "Info");
    TargetNode.css ("display", "");

    ControlFormRow ($(TargetNode));
    StdBody.css ("display", "");
  });
  $(".PopupCloseBtn").click(function() {
    $(this).parents(".FormFrame").css('display', 'none');
  });

  $("div a.LinkBtn").click (function () {
    var NodeName = $(this).html ();
    var StdBody = $("div#StdBody");
    var InnerBody = $("div#InnerBody");
    var TargetNode;

    NodeName = NodeName.replace (" ", "_");
    if (gFormStack.length > 0) {
      gFormStack.splice (0, gFormStack.length);
    }
    if (gFormNameStack.length > 0) {
      gFormNameStack.splice (0, gFormNameStack.length);
    }
    $("div.FormFrame").filter (":visible").css ("display", "none");
    TargetNode = $("#" + NodeName + "Info");
    TargetNode.css ("display", "");

    ControlFormRow ($(TargetNode));
    StdBody.css ("display", "");
    InnerBody.css ("display", "none");
  });

  $(".ToPopupTitle").click (function () {
    var Fid = $(this).attr ("fid");
    var TargetNode = $("div#" + Fid + "Info");
    var TargetBody;
    var StdBody = $("div#StdBody");
    var InnerBody = $("div#InnerBody");
    var OldNode = $("div.FormFrame").filter (":visible");
    var TargetTitle = $(this).html ();
    var OldTitle = "";

    if (TargetNode.length == 0) {
      //
      // Get form under Link formset
      //
      Fid = $(this).attr ("fsid");
      if ((Fid == "0") || (Fid == "1")) {
        return;
      }
      TargetNode = $("div#" + Fid + "LinkInfo");
      if (TargetNode.length == 0) {
        TargetNode = $("div[fsid='" + Fid + "']");
        if (TargetNode.length == 0) {
          return;
        }
      }
    }
    OldNode.css ("display", "none");
    TargetNode.css ("display", "");
    ControlFormRow ($(TargetNode));
    if (StdBody.find ("div.FormFrame").filter (":visible").length > 0) {
      //
      // Target is in stdbody
      //
//      OldTitle = InnerBody.find ("span.InnerTitle").html ();
      gFormStack.splice (0, gFormStack.length);
      gFormNameStack.splice (0, gFormStack.length);
      StdBody.css ("display", "");
      InnerBody.css ("display", "none");
    } else if (InnerBody.find ("div.FormFrame").filter (function () {return ($(this).css ("display") == "block");}).length > 0) {
      //
      // Target is in innerbody
      //
      OldTitle = InnerBody.find ("span.InnerTitle").html ();
      InnerBody.find ("span.InnerTitle").html (TargetTitle);
      gFormStack.push (OldNode.attr ("id"));
      gFormNameStack.push (OldTitle);
      StdBody.css ("display", "none");
      InnerBody.css ("display", "");
    }
  });
}

function CloseMPage (PageObj) {
  var ShowForm;
  var BackObj;

  $("#MngBody").css ("display", "none");
  PageObj.css("display", "none");

  BackObj = $("#StdBody");
  if (BackObj.attr ("show") == undefined) {
    BackObj = $("#InnerBody");
  }
  BackObj.removeAttr ("show");
  BackObj.css ("display", "");

  $("#ManagementTool").siblings ().find ("div.SubTreeNode").css ("color", "");
//  $("#ManagementTool").siblings ().find ("div.SubTreeNode").removeClass ("TgtLinkColor");

  if (gTempFormId) {
    gTempFormId.css ("color", TREE_TGT_NODE_COLOR);
//    gTempFormId.addClass ("TgtLinkColor");
    gTempFormId = null;
  }
}

function ClickMPageBtn (PageName) {
  var MngBody = $("#MngBody");
  var PageObj = $("#" + PageName);
  var RunningPageObj = MngBody.find ("div.FormFrame").filter (":visible");
  var BackObj;

  if (!MngBody.is (":visible")) {
    BackObj = $("#StdBody");
    gTempFormId = $("#MenuList").find ("div.TreeNode[run='run']").find ("span.MenuLink[tab='tab']");
    gTempFormId.css ("color", "");
    if (!BackObj.is (":visible")) {
      BackObj = $("#InnerBody");
    }
    BackObj.attr ("show", true);
    BackObj.css ("display", "none");
    MngBody.css ("display", "");
  }

  if ((RunningPageObj.length > 0) && (RunningPageObj.attr ("id") != PageName)) {
    RunningPageObj.css ("display", "none");
    PageObj.css("display", "");
  } else if (!PageObj.is (":visible")) {
    PageObj.css("display", "");
  } else {
//    CloseMPage (PageObj);
  }
}

function ChangeInputValue () {
  var ThisNode = $(this);
  var RowObj = ThisNode.parents('.Row');
  var FormObj = RowObj.parents(".FormFrame");
  var RelativeObj;

  if ((this.tagName).toLowerCase() == "input") {
    ValidateInputValue (ThisNode);
    if (ThisNode.parents (".PasswordTable").length > 0) {
      // Set all password field act=true
      ThisNode.parents (".PasswordTable").find ("input").attr ("act", "true");
    } else {
      ThisNode.attr ("act", "true");
    }
    if (ThisNode.attr("type") == "checkbox") {
      if (ThisNode.is(':checked')) {
        ThisNode.val ("1");
        // ThisNode.attr ("value", "1");
      } else {
        ThisNode.val ("0");
        // ThisNode.attr ("value", "0");
      }
    }
  } else if ((this.tagName).toLowerCase() == "select") {
    ThisNode.attr ("act", "true");
  }
  //
  // Save value to row object to reduce operating time in getting value
  // from :input object
  //
  RowObj.attr ("value", ThisNode.val());
  //
  // Find if there is an item has same offset and vid, this is used to search if this item was referenced 
  // by another item in different formset. An item reference another item existing in different formset, 
  // it creates a numeric item with same offset and vid for easy reference.
  //
  RelativeObj = $(":input[offset='" + ThisNode.attr ("offset") + "'][vid='" + ThisNode.attr ("vid") + "'][vid!='0'][iioff!='" + ThisNode.attr ("iioff") + "']");
  if ((RelativeObj != "undefined") && (RelativeObj.length > 0)) {
    // Change the referenced numeric item
    RelativeObj.val (ThisNode.val());
    // Sync row value for quick reference
    RelativeObj.parents('.Row').attr ("value", ThisNode.val());
    // If this is not runtime, mark to submit
    if ($('#BiosImgDefault').length > 0) {
      RelativeObj.attr ("act", "true");
    }
  }

  ModifyDateTimeItemValue (ThisNode);
  ControlFormRow (FormObj);
}

function SelectTargetForm (InnerBody, TgtFormId, TitleStr) {
  var PreFormIndex;
  var TargetForm = $(TgtFormId);
  var TargetTitle = TargetForm.attr('title');
  var InnerBodyTitleObj = InnerBody.find('.InnerTitle');

  //
  // Set Popup frame title
  //
  if ((TargetTitle == '') || (TargetTitle == ' ')) {
    InnerBodyTitleObj.html (TitleStr);
  } else {
    InnerBodyTitleObj.html (TargetTitle);
  }

  TargetForm.css ("display", "");
}

function ClickPopupFormInfo () {
  var TgtFormIdStr = gThisNode.attr(EXP_STR_ATTR_FORMID).replace(" ", "_");
  var TgtFormId = "#" + TgtFormIdStr + "Info";
  var ThisForm = gThisNode.parents('.FormFrame');
  var ThisFormId = ThisForm.attr("id");
  var MemuLink;
  var InnerBody = $('#InnerBody');

  ThisForm.css('display', 'none');
  InnerBody.css("display", "");

  SelectTargetForm (InnerBody, TgtFormId, gThisNode.html());
  ControlFormRow ($(TgtFormId));

  ClosePopup ();
}

function MouseOverHelpContent () {
//-[start-130118-IB10500006-modify]
  var HelpObj;

  if (!gShowHelpMsg) {
    return;
  }

  HelpObj = $(this).siblings(".HelpField");
  if (HelpObj.length > 0) {
//    $('#HelpBody').html(ParseTxtNewLineToHtmlBr (HelpObj.html()));
    HelpObj.css ("display", "");
    HelpObj.find (".HelpPopMsg").html (ParseTxtNewLineToHtmlBr (HelpObj.find (".HelpContent").html()));
  }
//-[end-130118-IB10500006-modify]
}

function MouseOutHelpContent () {
//-[start-130118-IB10500006-modify]
  var HelpObj;

  if (!gShowHelpMsg) {
    return;
  }

  HelpObj = $(this).siblings(".HelpField");

  if (HelpObj.css ("display") != "none") {
    HelpObj.css ("display", "none");
  }
//-[end-130118-IB10500006-modify]
}

function ReadLoadTime () {
  var RefreshTime = new Date ();

  $("#FixedBottomInfo").html (
    "Last Refresh Time: " +
    RefreshTime.getHours() + ":" +
    RefreshTime.getMinutes() + ":" +
    RefreshTime.getSeconds()
  );
}

function ModifyDateTimeItemValue (ThisNode) {
  var ValNode = ThisNode.siblings().last();
  var Value, Val0, Val1, Val2;

  if (ThisNode.siblings().length != 4) {
    return;
  }

  if ((ValNode.attr("name").match("^13-") == null) && (ValNode.attr("name").match("^14-") == null)) {
    // Old way to modify date and time items
    return;
  }

  if (ThisNode.attr ("name").match ("-0$")) {
    // Year or Hour
    Val0 = parseInt (ThisNode.val ()).toString(16);
    Val1 = parseInt (ThisNode.next().val ()).toString(16);
    Val2 = parseInt (ThisNode.next().next().val ()).toString(16);
  } else if (ThisNode.attr ("name").match ("-1$")) {
    // Month or Minute
    Val0 = parseInt (ThisNode.prev().val ()).toString(16);
    Val1 = parseInt (ThisNode.val ()).toString(16);
    Val2 = parseInt (ThisNode.next().val ()).toString(16);
  } else if (ThisNode.attr ("name").match ("-2$")) {
    // Day or Second
    Val0 = parseInt (ThisNode.prev().prev().val ()).toString(16);
    Val1 = parseInt (ThisNode.prev().val ()).toString(16);
    Val2 = parseInt (ThisNode.val ()).toString(16);
  } else {
    return;
  }

  if ((Val0 == "NaN") || (Val1 == "NaN") || (Val2 == "NaN")) {
    return;
  }

  if (ThisNode.attr ("name").match ("^9-")) {
    // Date
    while (Val0.length < 4) { Val0 = "0" + Val0; } // Init Zero can be ignored
  } else if (ThisNode.attr ("name").match ("^10-")) {
    // Time
    // while (Val0.length < 2) { Val0 = "0" + Val0; } // Init Zero can be ignored
  }
  while (Val1.length < 2) { Val1 = "0" + Val1; }
  while (Val0.length < 2) { Val0 = "0" + Val0; }

  // Little Endian
  ValNode.val(Val2 + Val1 + Val0);
  ValNode.attr ("act", "true");
}

//
// Initialize all objects those need to bind functions
//
function InitFunctionBinding () {
  var Node;


  $("div.FormFrame .MPageClose").click (function () {
    CloseMPage ($(this).parents (".FormFrame"));
  });

  $('#InnerBody .InnerBodyClose').click(function() {
    var ThisForm = $("div.FormFrame:visible");
    var FromId = ThisForm.attr ("id").split ("Info")[0];
    var TargetForm;
    var InnerBody = $("div#InnerBody");

    if (gFormStack.length == 0) {
      alert ("Error: no backward form exists");
      return;
    }
    TargetForm = $("#" + gFormStack.pop());
    InnerBody.find ("span.InnerTitle").html (gFormNameStack.pop());
    ThisForm.css ("display", "none");
    TargetForm.css ("display", "");

    ControlFormRow ($(TargetForm));
    if ((ThisForm.parents ("#InnerBody").length > 0) && (TargetForm.parents ("#InnerBody").length == 0)) {
      //
      // Target form isn't under #InnerBody
      //
      InnerBody.css ("display", "none");
      $("div#StdBody").css ("display", "");
    } else if ((TargetForm.parents ("#InnerBody").length > 0) && (ThisForm.parents ("#InnerBody").length == 0)) {
      //
      // Target form is under #InnerBody
      //
      InnerBody.css ("display", "");
      $("div#StdBody").css ("display", "none");
    }
  });

  Node = $("div.FormFrame");
  Node.on("mouseover", ".Row", function () {
    var RowNode = $(this);

    RowNode.find(":input").unbind("change");
    RowNode.find(":input").change(ChangeInputValue);
    RowNode.find(".TitleField, .ContentField, .ToPopupTitle").unbind("mouseover");
    RowNode.find(".TitleField, .ContentField, .ToPopupTitle").mouseover(MouseOverHelpContent);
    RowNode.find(".TitleField, .ContentField, .ToPopupTitle").unbind("mouseout");
    RowNode.find(".TitleField, .ContentField, .ToPopupTitle").mouseout(MouseOutHelpContent);
  });
  
  window._callFun = function()
	{
		var fun = "window.external.ExternalFunction(";
		for(i = 0; i < arguments.length; i ++)
		{
			if (i != 0)
				fun = fun + ",";
			fun = fun + "\"" + arguments[i]+ "\"";
		}    
		fun = fun + ")";
		return (eval (fun));
	}
}

//-[start-130118-IB10500006-add]
$("#HelpMsgSwitch").click (function () {
  if ($(this).find ("input").is (":checked")) {
    gShowHelpMsg = true;
  } else {
    gShowHelpMsg = false;
  }
});
$("#SuppressSwitch select").change(function() {
	SuppressType=$(this).find(":selected").val();
	ControlFormRow($("div.FormFrame:visible"));
});
//-[end-130118-IB10500006-add]

function InitOrderTable (targetName) {
  var RowNodes = $('div#' + targetName + 'Table').find ('span.BootDeviceRow');
  var TitleHeight = $('div#' + targetName + 'Content').find ('span.SectionTitle').outerHeight(true);
  var RowTableheight = 0;
  var Order;

  $.each (RowNodes, function (index, obj) {
    //
    // Read order value
    //
    Order = parseInt($(obj).find('input').val());
    //
    // Set absolute position's top dependend on order value
    //
    $(obj).css('top', $(obj).outerHeight(true) * Order + TitleHeight);
    //
    // Plus all row's height
    //
    RowTableheight += $(obj).outerHeight(true);
  });

  $('#' + targetName + 'Table').height (RowTableheight + TitleHeight);

  $('div#' + targetName + 'Content').find ('.BootOrderControl').click (function () {
    var Node = $(this).siblings('.BootOrder'); // input text
    var TotalNum = $('div#' + targetName + 'Table').find ('.BootOrder').length;
    var OthersRows;
    var ThisOrder = 0;
    var OtherOrder = 0;
    var IsUp = false;

    ThisOrder = parseInt(Node.val());
    //
    // Change order value
    //
    if ($(this).hasClass('BootOrderUp')) {
      if (ThisOrder == 0) {
        return;
      }
      IsUp = true;
      Node.val(ThisOrder - 1);
    } else {
      if ((ThisOrder + 1) == TotalNum) {
        return;
      }
      Node.val(ThisOrder + 1);
    }
    ThisOrder = parseInt(Node.val());
    //
    // Change absolute position
    //
    Node.parents('.BootDeviceRow').css('top', Node.parents('.BootDeviceRow').outerHeight(true) * ThisOrder + TitleHeight);
    if (Node.parents('#BootOrderContent').length > 0) {
      //
      // Boot device
      //
      Node.parents('#BootOrderContent').find ("input").attr("act", "true");
    } else if (Node.parents('#BootTypeOrderContent').length > 0) {
      //
      // Boot type
      //
      Node.parents('#BootTypeOrderContent').find ("input").attr("act", "true");
    } else {
      alert ("Error! Wrong operation!");
      return;
    }
    //
    // Change positions of other items
    //
    OthersRows = Node.parents('.BootDeviceRow').siblings();
    $.each(OthersRows, function (index, obj) {
      OtherOrder = parseInt ($(obj).find('input').val());
      if (ThisOrder == OtherOrder) {
        if (IsUp == true) {
          $(obj).find('input').val(OtherOrder + 1);
        } else {
          $(obj).find('input').val(OtherOrder - 1);
        }
        //
        // Read order value again
        //
        OtherOrder = parseInt($(obj).find('input').val());
        //
        // Set absolute position's top dependend on order value
        //
        $(obj).css('top', $(obj).outerHeight(true) * OtherOrder + TitleHeight);
      }
    });
  });
  $('div#' + targetName + 'Loading').css ("display", "none");
  $('div#' + targetName + 'Content').css ("display", "");
}

function InitBootOrderTable () {
  InitOrderTable ("BootOrder");
}

function InitBootTypeOrderTable () {
  InitOrderTable ("BootTypeOrder");
}

function AsyncInitialization () {
  setTimeout (InitSystemTimer, 100);
  setTimeout (ReadLoadTime, 900);
  setTimeout (InitBootOrderTable, 1300);
  setTimeout (InitBootTypeOrderTable, 1700);
}


/**
 * hardcoded feature boot order.
 * using drag drop to select boot order.
 */
function DragOrder() {
  var RowNodes = $('div.OrderListTable').find ('span.BootDeviceRow');
  var TitleHeight = $('div.OrderListContent').find ('span.OrderListPopupTitle').outerHeight(true);
  var RowTableheight = 0;
  var Order;
  var previous;
  var PreObj;

  $.each (RowNodes, function (index, obj) {
    if ( $(obj).parents(".OrderListDialog").attr("type") != previous ) {
      $(PreObj).parents('.OrderListTable').height (RowTableheight);
      RowTableheight = 0;
    }
    //
    // Read order value
    //
    Order = parseInt($(obj).find('input').val());
    //
    // Set absolute position's top dependend on order value
    //
    $(obj).css('top', $(obj).outerHeight(true) * Order + TitleHeight);
    // $(obj).css('width', $(obj).outerWidth(true) - $(obj).css('padding');
    $(obj).css('width', $(obj).outerWidth(true) - $(obj).css('padding') - $(obj).css('border-width'));
    if ($(obj).css('top') == '0px') {
      $(obj).css('top', $(obj).css('padding'));
    }
    
    //
    // Plus all row's height
    //
    RowTableheight += $(obj).outerHeight(true);
    previous = $(obj).parents(".OrderListDialog").attr("type");
    PreObj = obj;
  });
  if (PreObj != undefined) {
    $(PreObj).parents('.OrderListTable').height (RowTableheight);
  }

	$(function() {
		$(".OrderListContent .BootDeviceRow").draggable({
			appendTo: "body",
			helper: "clone",
			cursor: "move",
			revert: "invalid"
		});

		initDroppable($(".OrderListContent .BootDeviceRow"));
		function initDroppable($elements) {
			$elements.droppable({
				activeClass: "ui-state-default",
				hoverClass: "ui-drop-hover",
				accept: ":not(.ui-sortable-helper)",

				over: function(event, ui) {
					var $this = $(this);
				},
				drop: function(event, ui) {
					var $this = $(this);
                    var thistop = $(this).css('top');
                    var dragtop = $(ui.draggable).css('top');
                    $(this).css('top', dragtop);
                    $(ui.draggable).css('top', thistop);
                    
// 					var li1 = $(ui.draggable.wrap("<p/>").parents().html())
//                     ui.draggable.unwrap();
// 					var linew1 = $(this).after(li1);
// 
// 					var li2 = $($(this).wrap("<p/>").parents().html())
//                     $(this).unwrap();
// 					var linew2 = $(ui.draggable).after(li2);

                    var thisval = $(this).find('.BootOrder').val();
                    var dragval = $(ui.draggable).find('.BootOrder').val();
                    if (thisval == '') {
                      thisval = $(this).find(".BootOrder").attr('idx');
                    }
                    if (dragval == '') {
                      dragval = $(ui.draggable).find(".BootOrder").attr('idx');
                    }
                    $(this).find('.BootOrder').val(dragval);
                    $(ui.draggable).find('.BootOrder').val(thisval);
                    $(this).parent().find("input").attr("act", "true");

                    var list = $(this).parent().find("input");
                    for (var i = 0; i < list.length; i++) {
                      var tmp = $(list[i]);
                      if (tmp.val() == "" ) {
                        tmp.val(tmp.attr('idx'));
                      }
                    }

// 					$(ui.draggable).remove();
// 					$(this).remove();

					initDroppable($(".OrderListContent .BootDeviceRow"));
					$(".OrderListContent .BootDeviceRow").draggable({
						appendTo: "body",
						helper: "clone",
						cursor: "move",
						revert: "invalid"
					});
				}
			});
		}
	});
}
