#!/bin/bash
set -e # stop script if failure

# configuration for script
PROJECT_DIR=$(pwd)
CURRENT_USER=$(whoami)
VENV_DIR="$PROJECT_DIR/venv"
ENV_FILE="$PROJECT_DIR/.env"

# user input for service name config
read -p "enter name for fastapi systemd service: " SERVICE_NAME
SERVICE_NAME=${SERVICE_NAME:-fastapi-app}

# start script
echo "--- Setting up FastAPI App Service ---"
echo "Project Directory: $PROJECT_DIR"
echo "Running as User: $CURRENT_USER"
echo "Service Name will be: $SERVICE_NAME"

# 1. install system dependencies
echo "--> Installing python..."
sudo apt-get update
sudo apt-get install -y python3-pip python3-venv

# 2. setup python virtual env and install dependencies
echo "--> Setting up Python virtual environment at $VENV_DIR..."
python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"
"$VENV_DIR/bin/pip" install --upgrade pip
"$VENV_DIR/bin/pip" install -r requirements.txt
"$VENV_DIR/bin/pip" install gunicorn
deactivate

# 3. create systemd file service
echo "--> Creating systemd service file: $SERVICE_NAME.service..."
sudo tee "/etc/systemd/system/$SERVICE_NAME.service" > /dev/null <<EOF
[Unit]
Description=Gunicorn instance for FastAPI
After=network.target

[Service]
User=$CURRENT_USER
Group=www-data
WorkingDirectory=$PROJECT_DIR

# Load all variables from the .env file
EnvironmentFile=$ENV_FILE

ExecStart=$VENV_DIR/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 main:app

Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 4. enable and start the service
echo "--> Reloading systemd, enabling and starting service..."
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME.service"
sudo systemctl start "$SERVICE_NAME.service"

echo "--- FastAPI Service Setup Complete! ---"
echo "The service '$SERVICE_NAME' is now running and configured to use variables from $ENV_FILE"