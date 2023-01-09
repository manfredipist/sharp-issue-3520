var $uploadCrop;

function readFile(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image-preview').addClass('ready');
            //var orientation = EXIF.getTag(e.target.result, "Orientation");
            $('#image-preview').croppie('bind', {
                url: e.target.result
                //orientation : orientation
            }).then(function () {
                //console.log('jQuery bind complete');
            });

        }

        reader.readAsDataURL(input.files[0]);
    }
    else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}

$(document).ready(function () {
    $("input#image-selector").change(function () {
        $uploadCrop = $('#image-preview').croppie({
            enableExif: true,
            enforceBoundary: true,
            viewport: {
                width: 300,
                height: 300
            },
            boundary: {
                width: 330,
                height: 330
            }
        });
        readFile(this);
    });

    $('#edit-profile-btn').click(function () {
        $('.edit.profile.modal').modal({
            closable: true,
            onShow: function () {
                if ($uploadCrop) {
                    $uploadCrop.croppie("destroy");
                }
                var $grid = $('.ui.centered.info.grid');
            },
            onApprove: function () {
                $(".ui.edit.profile.form").submit();
                return false;
            },
            onHidden: function () {
                $('.ui.edit.profile.form').form('clear');
                $("#image-selector").val("");
            }
        })
            .modal('show')
    });

    $('.ui.edit.profile.form').form({
        fields: {
        },
        onSuccess: function (event, fields) {
            updateProfile(fields);

            $('.edit.profile.modal').modal('hide');
        }
    });

});

function updateProfile(fields) {

    var data = new FormData();
    for (const item in fields) {
        data.append(item, fields[item])
    }

    if ($("#image-selector").val()) {
        $uploadCrop.croppie("result", { type: "blob", size: "original", format: "png", quality: 1 }).then(function (blob) {

            data.append('picture', blob);

            $.ajax({
                url: `http://localhost:9010/api/basic/society/update/profile`,
                method: "POST",
                contentType: false,
                processData: false,
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response.status == "Failure") {
                        $('body')
                            .toast({
                                class: 'error',
                                message: response.message
                            });
                    }
                    else {
                        $('body')
                            .toast({
                                class: 'success',
                                message: "Profilo aggiornato con successo!"
                            });

                            window.localStorage.setItem("picture", response.data.picture != null ? response.data.picture : "assets/img/avatar/profile.png");
                                $("#profile-picture").attr("src", window.localStorage.getItem("picture"));
                                $("#main-profile-picture").attr("src", window.localStorage.getItem("picture"));

                            $("#reload-picture").click(function(e){
                                window.localStorage.setItem("picture", response.data.picture != null ? response.data.picture : "assets/img/avatar/profile.png");
                                $("#profile-picture").attr("src", window.localStorage.getItem("picture"));
                                $("#main-profile-picture").attr("src", window.localStorage.getItem("picture"));
                            });
                    }
                },
                error: function (xhr) {
                    $('body')
                        .toast({
                            class: 'error',
                            message: xhr.responseJSON.message
                        });
                }
            });
        });

    }
}