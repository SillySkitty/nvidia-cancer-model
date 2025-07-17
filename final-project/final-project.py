from jetson_inference import imageNet
from jetson_utils import loadImage
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/classify", methods=["POST"])
def classify():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    
    path = os.path.join("uploads", file.filename)
    file.save(path)
    try:
        img = loadImage(path)
        net = imageNet(model="cancer_model/resnet18.onnx", labels="cancer_model/labels.txt", input_blob="input_0", output_blob="output_0")
        class_idx, confidence = net.Classify(img)
        class_desc = net.GetClassDesc(class_idx)
        result = {
            "class": class_desc,
            "class_idx": int(class_idx),
            "confidence_percent": float(confidence) * 100
        }
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        os.remove(path)
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3721, debug=True)