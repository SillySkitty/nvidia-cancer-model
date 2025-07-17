# Project
The Project uses Flask to run a web application., the main python code can be found in final-project.py
The Program starts by initializing the flask app and listening for any routes. 
If the index route is called it will render the main HTML page - index.html
If the classify route is called, the python code will use ImageNet to classify the image and return an output whilst the javascript shows the image to the user.
The program ends by removing the image path it recieved to prvent duplication. 

## How To Run
Requires Python 3
Requires flask
`pip install flask`
Clone the repository


