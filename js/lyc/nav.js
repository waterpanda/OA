$(function(){
    backProjectDesign();
    seeProjectStage();
    seeProjectRelated();
    seeProjectRelatedEmp();
    seeTotalContract();
    seeTotalContractStage();
    seeSubContract();
});

function seeSubContract(){
    $(document).on("click","#subcontract",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/subcontract.html?"+myID;
    })
}

function seeTotalContractStage(){
    $(document).on("click","#totalcontractstage",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/totalcontractstage.html?"+myID;
    })
}

function seeTotalContract(){
    $(document).on("click","#totalcontract",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/totalcontract.html?"+myID;
    })
}

function seeProjectRelatedEmp(){
    $(document).on("click","#projectrelatedemp",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/projectrelatedemp.html?"+myID;
    })
}

function seeProjectRelated(){
    $(document).on("click","#projectrelated",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/projectrelated.html?"+myID;
    })
}

function seeProjectStage(){
    $(document).on("click","#projectstage",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/projectstage.html?"+myID;
    })
}

function backProjectDesign(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/seeProjectDesign.html?"+myID;
    })
}