from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
from joblib import load
import sklearn
print(sklearn.__version__)



app = Flask(__name__, static_folder='Obesity_application/obesity-app/build')
CORS(app)

# Load the pickled model
with open('RandomForestClassifierModel', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

@app.route('/')
def serve_react_app():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def serve_any_other_static_file(path):
    if not path.endswith('.html'):
        path += '.html'
    return app.send_static_file(path)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the client
        data = request.get_json(force=True)
        print(data)
        input_data = np.array([])
        for i in data.keys():
            # id a input is not entered, we take it as 0
            if(data[i]==''):
                data[i]=0
            
            input_data = np.append(input_data, float(data[i]))

        # Reshape the array to make it 2D
        input_data_reshaped = input_data.reshape(1, -1)
        # Make predictions
        predictions = loaded_model.predict(input_data_reshaped)
        print(predictions)
        # Return the predictions as JSON
        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        print(str(e))   
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)








