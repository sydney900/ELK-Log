# Centralized log system for microservice by making use of ELK stack

In order to centralize the logs for microservice system and its web site, we can use ELK stack. 


## Docker setup to run docker compose file
### Docker for Windows
    Go to Settings > Share drive, and select the drive.

### Docker Toolbox
For example, we want to mount driver c:
1. Run Oracle VM VirtualBox to create a share folder named as c
2. Use ssh connect to docker machine
```
docker-machine ssh default
```
3. Create folder on the docker machine
```
sudo mkdir --parents /c
```
4. Mount the share folder c to directory c
```
sudo mount -t vboxsf c /c
```

For permanent mounting, add last two lines of command at the end of profile
```
sudo vi /mnt/sda1/var/lib/boot2docker/profile
```
