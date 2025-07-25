#!/bin/bash
set -e 

# configuration for script
read -p "enter name for nginx systemd service: " CONFIG_NAME
CONFIG_NAME=${CONFIG_NAME:-fastapi-app}

# ask for server ipaddress 
read -p "Enter your domain or public IP address [$DEFAULT_IP]: " SERVER_ADDRESS
SERVER_ADDRESS=${SERVER_ADDRESS:-$DEFAULT_IP}


# script start
echo "--- Setting up Nginx Reverse Proxy ---"
echo "Nginx config file will be named: $CONFIG_NAME"
echo "Server will respond to: $SERVER_ADDRESS"


# 1. install nginx
echo "--> Installing Nginx..."
sudo apt-get update
sudo apt-get install -y nginx

# 2. crate nginx site config
echo "--> Creating Nginx site configuration..."
sudo tee "/etc/nginx/sites-available/$CONFIG_NAME" > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_ADDRESS;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# 3. Enable the New Site
echo "--> Enabling the new site..."
# remove default site if exist
sudo rm -f /etc/nginx/sites-enabled/default
# create a symbolic link to enable site
sudo ln -sf "/etc/nginx/sites-available/$CONFIG_NAME" "/etc/nginx/sites-enabled/"

# 4. test and restart nginx
echo "--> Testing Nginx configuration and restarting service..."
sudo nginx -t
sudo systemctl restart nginx

# 5. add firewall rule to allow nginx
echo "--> Configuring firewall (ufw)..."
sudo ufw allow 'OpenSSH'
sudo ufw allow 'Nginx Full'
echo "firewall rules added, turn on ufw if you havent"

echo "--- Nginx Setup Complete! ---"
echo "Your API should be accessible at http://$SERVER_ADDRESS"