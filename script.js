
var resolution = {
    _mobile: false,
    isMobile: function () {
        return this._mobile === true;
    },
    isDesktop: function () {
        return this._mobile === false;
    },
    onResolutionChange: null
};
resolution.__defineSetter__('mobile', function (value) {
    var tmp = this._mobile;
    this._mobile = value;

    if (tmp !== this._mobile && typeof (this.onResolutionChange) === "function") {
        this.onResolutionChange();
    }

});
resolution.__defineGetter__('mobile', function () {

    return this._mobile;
});


function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function analize() {
    $("#sending-answers").hide();
    $("#analizing-answers").show();
}
function send() {
    $("#analizing-answers").hide();
    $("#qualified-answers").show();
}
function redirect() {
    window.location.href = "http://" + redirectDomain;
}

function nextQuestionOrRedirect(data) {
    if (data !== 'ok') {
        console.log(data);
    }

    if (questionCount === curr) {
        $("#sending-answers").show();
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(analize, 1000);
        setTimeout(send, 2000);
        setTimeout(redirect, 3000);

    } else {
        $("#loader").hide();
        $("#" + (++curr)).addClass("active");
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function saveQuestion(e) {
    $this = $(this);
    var data = {
        question_id: $this.data('question-id'),
        option_id: $this.data('option-id'),
        version: version,
        cookie: rCookie
    };

    curr = parseInt($(".question.active").attr("id"));
    $("#" + curr).removeClass("active");

    $("#loader").show();
    $.post(saverUrl, data).fail(function () {
        alert(failText);
        window.location.reload();
    }).done(nextQuestionOrRedirect);
}

function changeResolution() {
    resolution.mobile = $(".mobile").css("display") === "none" ? false : true;
    //console.log(resolution.isMobile());
}

function start(imgSrc){
    $("#intro").hide();
    $("#1").addClass('active');
    $('#q_cont').css("background-image", "url("+imgSrc+")");  
}
