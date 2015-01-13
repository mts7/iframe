var uploadInterval = null;
// set the allowed file extensions
var validTypes = ['jpg', 'png'];


$(document).ready(function() {
    // validate the form before upload
    $('.form-upload').submit(function(e) {
        return validateForm(e);
    });
});


function validateForm(event) {
    // get the form
    var $form = $(event.currentTarget);
    if ($form.length == 0) {
        // we can't validate a non-existent form
        return false;
    }

    // get the iframe for this form
    var $iframe = $form.parent().find('iframe[name="target_box"]');
    // set the iframe target of this form to blank page
    $iframe.attr('src', 'about:blank');

    // check file name
    var $file = $form.find('.inputfile');
    // set the upload status area
    var $uploadStatus = $form.parent().find('.upload-status');

    var file = $file.val();
    if (file.length < 5) {
        $uploadStatus.html('<span class="error">Please select a valid ' + validTypes.join(', ') + ' file(s) to upload.</span>');
        return false;
    }

    // get extension of file name
    if (file.indexOf('.') == -1) {
        $uploadStatus.html('<div class="error">File name must have an extension.</div>');
        return false;
    }
    // make sure extension is allowed
    var ext = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
    if (!in_array(ext, validTypes)) {
        $uploadStatus.html('<div class="error">You can only upload ' + validTypes.join(', ') + ' files.</div>');
        return false;
    }

    try {
        // let the user know what is happening
        var interval = 0;
        uploadInterval = setInterval(function () {
            interval++;
            var content = getIframeContents($iframe); // 'iframe[name="target_box"]' could work, too, if it is the only one
            if (content.length == 0) {
                // display upload message that changes every half second
                if (interval % 2 == 0) {
                    $uploadStatus.html('Processing file...');
                } else {
                    $uploadStatus.html('Processing file..');
                }
            } else {
                $uploadStatus.html(content);
                clearInterval(uploadInterval);

                if (typeof callback == 'function') {
                    callback(content);
                }
            }
        }, 500);
    } catch (ex) {
        clearInterval(uploadInterval);
    }

    return true;
}
