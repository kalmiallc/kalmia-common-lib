# Continuos integration and deployment 

Every project must be equipped with CI/CD pipeline.

Based on the type of the project, a CI/CD system shall be used:
* For AWS projects, AWS CodeBuild
* For internal projects, jenkins.kalmia.si

A CI pipeline shall test and produce production-ready docker images. 


### Using the internal Jenkins server
Kalmia uses jenkins.kalmia.si, as the internal Jenkins server for CI/CD. 

The following executors shall be used:
- built-in -- to perform test builds, not CD related. Daily builds or commits to the develop branch are executed here. 
- lab3.kalmia.si -- for direct deployment on the staging environment. 


### Using the docker.kalmia.si
Host docker.kalmia.si is a AWS elastic container. It can host private and public repositories. In general two types of users exist and should be used for accessing the private repos: 
 - admin -- with push and create permissions (kalatea-registry-admin -- AKIAQC3R2AEVZO3IM3DQ)
 - read - with pull permissions (kalatea-registry-user - AKIAQC3R2AEVQEFUOTEP)

Ask Borut for secret keys.

If possible docker should use `https://github.com/awslabs/amazon-ecr-credential-helper` to automatically handle the credentials. 

A public temporary repository exists for publishing temporary images (if we need to share some image or need quick deployment on the Portainer).
Repository can be accessed on `https://gallery.ecr.aws/e1l7u2n7/temporary` or `https://gallery.ecr.aws/kalmia/temporary`. 
Images should be deleted after. 

Example of publishing image to repo:
 1. Create aws credentials profile with CLI. `aws configure --profile docker_push`
 2. Use the profile to login: `aws ecr-public get-login-password --profile docker_push --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/e1l7u2n7`
 3. Properly tag local image: `docker tag i5g-fe public.ecr.aws/e1l7u2n7/temporary:i5g-test-1.0`
 4. Push to public repo: `docker push public.ecr.aws/e1l7u2n7/temporary:i5g-test-1.0`
 5. List images: `aws ecr-public describe-image-tags --profile docker_push --repository-name temporary --region us-east-1`
 6. Delete image: `aws ecr-public batch-delete-image --profile docker_push --repository-name temporary --region us-east-1  --image-ids imageTag=i5g-test-1.0`
 

The image can simply be used to pull it and test it on lab3 Portainer.  


### Deploying to lab3.kalmia.si
Lab3 hosts docker infrastructure, which automatically maps new images to proper subdomain URLs if they are properly configured.

A docker management GUI (Portainer)  - http://lab3.kalmia.si:9443/ can be used to access the running images. The server hosts Nginx proxy and letsencrypt images, which automatically generate subdomain https hosting for the added docker image.

To enable the automatic subdomain creation the following env variables need to be set:
- LETSENCRYPT_HOST
- LETSENCRYPT_EMAIL
- VIRTUAL_HOST
- VIRTUAL_PORT

More info: https://hub.docker.com/r/jwilder/nginx-proxy

A Jenkins pipeline file needs to be created with the needed st1eps to create a docker image.

To create a Jenkins build, a new pipeline project needs to be setup at http://jenkins.kalmia.si:8080/.
Pipeline script from SCM option shall be used, with the proper URL. To connect to the repo a Jenkins user access key must be added to the repo RO access keys list. The key [jenkins-dev-ro-access-pub.key](jenkins-dev-ro-access-pub.key) shall be used. 

A sample Jenkins configuration file can be found here: [Jenkinsfile](./../config-samples/Jenkinsfile)

Also, a docker-compose file needs to be prepared with the proper environment variables. Sample file can be found here: [docker-compose.yaml](./../config-samples/docker-compose.yml)


#### Test builds 
The test builds with docker image which runs tests shall be run at least once a day. A build must fail if any of the tests fail. 

Docker-compose for test builds shall include all the necessary services needed for the test to finish (eq. MySql).
Sample test jenkins pipeline file can be found here: [../config-samples/Jenkinsfile.test.sample](../config-samples/Jenkinsfile.test.sample)
Sample docker compose file can be found here: [../config-samples/Jenkinsfile.test.sample](./../config-samples/docker-compose.test.yaml)


### Triggering builds from the bitbucket. 

To trigger a build form any kind of action on the bitbucket, and bitbucket webhook must be added. The webhook needs proper credentials.
To get the webhook details, Jenkins pipeline setting (under build triggers) "Trigger builds remotely" with the proper credential token must be used.

Username and token pair must be in line. Example: The token `CCDFC8Fxxxx` must be used `http://leon:xxxxx@` username. To get the proper credentials, check one of the existing projects (ex. nagode-api)