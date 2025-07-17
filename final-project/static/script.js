document.getElementById("uploadForm").onsubmit = async function(e) {
    e.preventDefault();
    document.getElementById("error").innerText = '';
    document.getElementById("resultBox").style.display = "none";    
    let formData = new FormData();
    let imageInput = document.getElementById("imageUpload");
    if (imageInput.files.length === 0) {
        document.getElementById("error").innerText = "No image selected.";
        return;
    }
    formData.append("image", imageInput.files[0]);
    let res = await fetch("/classify", {method: "POST", body: formData});
    let data = await res.json();
    if (data.error) {
        document.getElementById("error").innerText = data.error;
        return;
    }
    document.getElementById("result").innerHTML =
        `<b>Class:</b> ${data.class}<br>
        <b>Class index:</b> ${data.class_idx}<br>
        <b>Confidence:</b> ${data.confidence_percent.toFixed(2)}%`;
    document.getElementById("resultBox").style.display = "block";
};
document.getElementById("imageUpload").onchange = function(e) {
    const preview = document.getElementById("preview");
    const file = this.files[0];
    if (!file) {
        preview.style.display = "none";
        preview.src = "";
        return;
    }
    const reader = new FileReader();
    reader.onload = function(ev) {
        preview.src = ev.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
}