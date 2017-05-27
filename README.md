# Engineering Projekt Frontend Application (Client)

The frontend (client) application of the engineering project adit, 2017. See https://adit.github.io/ for more information.

## Build

Prerequisities:

- [Docker](https://www.docker.com/) Version >= 1.12
- GNU [Make](https://www.gnu.org/software/make/) and [Bash](https://www.gnu.org/software/bash/)
- [git](https://www.git-scm.org/)


```bash
git clone https://github.com/fabianhauser/engineering-projekt-client.git engineering-projekt-client
cd engineering-projekt-client

# Build angular building docker container
make build-container-testing

# Build application and docker container
make build

# For a release, the docker container could be uploaded now.
```

