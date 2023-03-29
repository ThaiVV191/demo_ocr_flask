var blockDashboard = document.getElementById('upload-image');
var informationDashboard = document.getElementById('information-card');
var fileInput = document.getElementById('my-file-input');
fileInput.addEventListener('change', function() {
    
    var formData = new FormData();
    formData.append('myImage', fileInput.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload_file');
    xhr.onload = function() {
    if (xhr.status === 200 && fileInput.value !== '') {
        blockDashboard.style.display = 'none';
        informationDashboard.style.display = 'flex';
        // Thêm ảnh vào DOM
        var data = JSON.parse(xhr.responseText);
        var image = document.getElementById('image-result')
        image.src = 'data:image/jpeg;base64,' + data.image;
        var information_card = data.informations
        var div_image_id = document.getElementById("image-container-id");
        for (let key in information_card) {
            var points = information_card[key][0]
            const newDiv = document.createElement("div");
            newDiv.style.left = points[0].toString() + "px";
            newDiv.style.top = points[1].toString() + "px";
            newDiv.style.width = (points[2] - points[0]).toString() + "px";
            newDiv.style.height = (points[3] - points[1]).toString() + "px";
            newDiv.style.position = "absolute";
            newDiv.style.border = '1px solid red';
            div_image_id.appendChild(newDiv)
            var feature = document.getElementById(key)
            feature.addEventListener("mouseover", function() {
                feature.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                newDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              });
              
            feature.addEventListener("mouseout", function() {
                feature.style.backgroundColor = "";
                newDiv.style.backgroundColor = "";
              });
            newDiv.addEventListener("mouseover", function() {
                feature.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                newDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              });
              
            newDiv.addEventListener("mouseout", function() {
                feature.style.backgroundColor = "";
                newDiv.style.backgroundColor = "";
              });
            
            var cells = feature.getElementsByTagName("td")
            for (var i = 1; i < cells.length; i++){
                cells[i].innerHTML = information_card[key][i]
            }
        }
    } else {
        console.log('Đã xảy ra lỗi!');
    }
    };
    xhr.send(formData);
});

