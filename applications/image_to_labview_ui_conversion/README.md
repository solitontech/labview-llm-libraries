# About image to ui conversion application
This application is used to create the LabVIEW VI from the image. 

# Usage Instructions
1. **Select AI Model:** Select the AI Model to be used for this application in the dropdown.
2. **Configure API Key:** Follow instruction in the front panel in the dropdown to set the API Key.Then place the `.env` with encoded API keys parallel to the project.
3. **Provide valid input image:** Browse and provide valid input image.
4.**Optional:** Install `JKI Flat UI Controls Toolkit` to have fancy UI.
5. **Run the VI:** Execute the VI to process the input image by the selected AI model. The AI model will generate the Json string which is given as input to the VI which will generate the LabVIEW elements.
