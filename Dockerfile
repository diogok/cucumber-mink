FROM node:8

RUN npm install -g cucumber 

COPY package.json /usr/share/src/cucumber-mink/package.json
COPY src /usr/share/src/cucumber-mink/src

RUN cd /usr/share/src/cucumber-mink && ls

RUN cd /usr/share/src/cucumber-mink && npm install
RUN cd /usr/share/src/cucumber-mink && npm run-script compile

WORKDIR /opt

COPY docker-start.sh /docker-start.sh

CMD ["/docker-start.sh"]

ENV BROWSER chrome
ENV HOST selenium
ENV PORT 4444

