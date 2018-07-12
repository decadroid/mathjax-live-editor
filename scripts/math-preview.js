//<![CDATA[
MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [
            ['[math]', '[/math]'],
            ['$latex', '$'],
            ['\\(', '\\)']
        ],
        displayMath: [
            ['$$', '$$']
        ],
        processEscapes: true, //  \$ to write regular dollar sign.
        processRefs: true, // process \ref{...} outside of math mode.
        ignoreClass: "latex-ignore",
        skipTags: ["pre", "code"],
    },
});
//]]>

//<![CDATA[
var Preview = {
    delay: 150, // delay after keystroke before updating
    preview: null, // filled in by Init below
    buffer: null, // filled in by Init below
    timeout: null, // store setTimout id
    mjRunning: false, // true when MathJax is processing
    oldText: null, // used to check if an update is needed
    id: null, //id of the input textarea
    //
    //  Get the preview and buffer DIV's
    //
    Init: function(var_preview, var_buffer, var_id) {
        this.preview = document.getElementById(var_preview);
        this.buffer = document.getElementById(var_buffer);
        this.id = var_id;
    },
    //
    //  Switch the buffer and preview, and display the right one.
    //  (We use visibility:hidden rather than display:none since
    //  the results of running MathJax are more accurate that way.)
    //
    SwapBuffers: function() {
        var buffer = this.preview,
            preview = this.buffer;
        this.buffer = buffer;
        this.preview = preview;
        buffer.style.visibility = "hidden";
        buffer.style.position = "absolute";
        preview.style.position = "";
        preview.style.visibility = "";
    },
    //
    //  This gets called when a key is pressed in the textarea.
    //  We check if there is already a pending update and clear it if so.
    //  Then set up an update to occur after a small delay (so if more keys
    //    are pressed, the update won't occur until after there has been
    //    a pause in the typing).
    //  The callback function is set up below, after the Preview object is set up.
    //
    Update: function() {
        if (this.timeout) { clearTimeout(this.timeout) }
        this.timeout = setTimeout(this.callback, this.delay);
    },
    //
    //  Creates the preview and runs MathJax on it.
    //  If MathJax is already trying to render the code, return
    //  If the text hasn't changed, return
    //  Otherwise, indicate that MathJax is running, and start the
    //    typesetting.  After it is done, call PreviewDone.
    //
    CreatePreview: function() {
        Preview.timeout = null;
        if (this.mjRunning) return;
        var text = document.getElementById(this.id).value;
        if (text === this.oldtext) return;
        this.buffer.innerHTML = this.oldtext = text;
        this.mjRunning = true;
        MathJax.Hub.Queue(
            ["Typeset", MathJax.Hub, this.buffer], ["PreviewDone", this]
        );
    },
    //
    //  Indicate that MathJax is no longer running,
    //  and swap the buffers to show the results.
    //
    PreviewDone: function() {
        this.mjRunning = false;
        this.SwapBuffers();
    }
};
//
//  Cache a callback to the CreatePreview action
//
Preview.callback = MathJax.Callback(["CreatePreview", Preview]);
Preview.callback.autoReset = true; // make sure it can run more than once
Preview.Init('MathPreview', 'MathBuffer', 'MathInput');
var isLocalStorage = false;
try {
    isLocalStorage = true;
    localStorage.setItem("a", "b");
    localStorage.removeItem("a");
    if (!localStorage.commentHash) {
        localStorage.commentHash = "-1212498031";
    }
    if (!localStorage.votes) {
        localStorage.votes = "0";
    }
    if (!localStorage.saved) {
        localStorage.saved = "0";
    }
} catch (e) {
    isLocalStorage = false;
}

function storageEvents() {
    if (isLocalStorage) {
        if (localStorage.name !== 'undefined') {
            $("#name").val(localStorage.name);
            $("#l-name").text(localStorage.name);
            $("#n-sec").hide();
            $("#edit_details").show();
        }
        if (localStorage.email !== 'undefined') {
            $("#email").val(localStorage.email);
            $("#e-sec").hide();
        }
    }
}
$("#edit_details").on("click", function(e) {
    e.preventDefault();
    $("#n-sec").show("slow");
    $("#e-sec").show("slow");
    $("#a-sec").show("slow");
});
$("#MathInput").on("click", function() {
    $(".form-augment").show("slow");
    storageEvents();
    $("#MathInput").height(100);
});
var text_max = 1500;
$('#textarea_feedback').html(text_max + ' characters remaining');

$('#MathInput').keyup(function() {
    var text_length = $('#MathInput').val().length;
    var text_remaining = text_max - text_length;
    $('#textarea_feedback').html(text_remaining + ' characters remaining');
});


//]]>