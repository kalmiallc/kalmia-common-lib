# Continuos integration and deployment 

Every project must be equipped with CI/CD pipeline.

Based on the type of the project, a CI/CD system shall be used:
* For AWS projects, AWS CodeBuild
* For internal projects, jenkins.kalmia.si

A CI pipeline shall test and produce production ready docker images. 