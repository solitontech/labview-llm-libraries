# Environment Variables

1. Environment variables like OpenAI keys are stored in the .env file parallel to the .lvproj file in an encoded format.
2. .env file contents are in INI config format and keys are under the section name "Secrets"
3. The Set and Get APIs reads the .env file present in the Application Directory (Based on the project instance, the directory of .lvproj file from which the VI is launched)
4. Security:  
   1. The Set and Get APIs does a base64 encoding and decoding of the API key to avoid misuse of the keys.
   2. The .env file should not be committed to the git. Hence added the .env to the .gitignore file.
   3. The APIs for base 64 encoding and decoding are obtained from this [link](https://forums.ni.com/t5/Example-Code/Fast-Base64-Encoder-Decoder-using-LabVIEW/ta-p/3503281)