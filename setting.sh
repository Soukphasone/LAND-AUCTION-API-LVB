#!/bin/sh

# Install Docker CE & Docker compose to Ubuntu AMI

# set -e

sudo apt-get remove docker docker-engine

sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y docker-ce

sudo groupadd docker
sudo usermod -aG docker ubuntu

sudo systemctl enable docker

docker --version

# Install Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version


