#!/bin/bash

cd src/tests/endtoend/tests
mocha *.js --full-trace --timeout 200000