FROM node:6

ARG NG_CLI_VERSION=latest
ENV NG_CLI_VERSION=$NG_CLI_VERSION
ARG SONAR_VERSION=3.0.0.702
ENV SONAR_VERSION=$SONAR_VERSION
ARG NODE_ENV=dev
ENV NODE_ENV=$NODE_ENV

ENV DISPLAY :99.0
ENV CHROME_BIN /usr/bin/google-chrome

RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y Xvfb google-chrome-stable openjdk-7-jre-headless unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN cd /opt && wget --quiet https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_VERSION}-linux.zip \
    && unzip sonar-scanner-cli-${SONAR_VERSION}-linux.zip && rm sonar-scanner-cli-${SONAR_VERSION}-linux.zip && mv sonar-scanner-${SONAR_VERSION}-linux sonar-scanner

RUN yarn global add @angular/cli@$NG_CLI_VERSION && rm -rf $(yarn cache dir)

RUN /bin/bash -c 'echo "export PATH=/home/node/project/node_modules/.bin:/opt/sonar-scanner/bin:\$PATH" >> /etc/bash.bashrc'

USER node

VOLUME [ "/home/node/project" ]
VOLUME [ "/home/node/.npm" ]
WORKDIR /home/node/project
