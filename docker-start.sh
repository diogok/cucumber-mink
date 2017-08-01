#!/bin/bash

sleep 5

echo nodejs /usr/share/src/cucumber-mink/dist/cli.js --port $PORT --host $HOST --browser $BROWSER -r .

cd /opt 

nodejs /usr/share/src/cucumber-mink/dist/cli.js --port $PORT --host $HOST --browser $BROWSER -r .
 

