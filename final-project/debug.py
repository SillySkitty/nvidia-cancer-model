import onnx

model = onnx.load("/home/nvidia/jetson-inference/python/training/classification/models/cancer_model/resnet18.onnx")
for output_tensor in model.graph.output:
    print(output_tensor.name)