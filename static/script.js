var blockDashboard = document.getElementById('dashboard_id');
var fileInput = document.getElementById('my-file-input');
fileInput.addEventListener('change', function() {
    
    var formData = new FormData();
    formData.append('myImage', fileInput.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload_file');
    xhr.onload = function() {
    if (xhr.status === 200 && fileInput.value !== '') {
        blockDashboard.style.display = 'none';
        // Thêm ảnh vào DOM
        var data = JSON.parse(xhr.responseText);
        var image = new Image();
        var div_new = document.getElementById("myDiv");
        div_new.innerHTML ="";
        div_new.style.display = "flex";
		div_new.style.flexDirection = "column";
        image.src = 'data:image/jpeg;base64,' + data.image;
        div_new.appendChild(image);
        var btn = document.createElement("button");
		btn.innerHTML = "Choose another file";
		btn.classList.add("btn-upload");
		btn.setAttribute("id", "my-button");
        btn.onclick = function() {
			document.getElementById('my-file-input').click();
		};
        div_new.appendChild(btn);
    } else {
        console.log('Đã xảy ra lỗi!');
    }
    };
    xhr.send(formData);
});

