/* jslint node: true */
'use strict';

var prettyJson = require('prettyjson');
var apickli = require('apickli');

var stepContext = {};

export default function (cucumber) {

    cucumber.registerHandler('BeforeScenario', function (scenario, callback) {
        stepContext.scenario = scenario.getName;
        callback();
    });

    cucumber.registerHandler('BeforeStep', function(step, callback) {
        stepContext.step = step.getName;
        callback();
    });

    cucumber.Given(/^I set api to "(.*)"$/, function (url, callback) {
      cucumber.apickli = new apickli.Apickli('http', url);
      callback();
    });

    cucumber.Given(/^I set (.*) header to (.*)$/, function (headerName, headerValue, callback) {
        cucumber.apickli.addRequestHeader(headerName, headerValue);
        callback();
    });

    cucumber.Given(/^I set cookie to (.*)$/, function (cookie, callback) {
        cucumber.apickli.addCookie(cookie);
        callback();
    });

    cucumber.Given(/^I set headers to$/, function(headers, callback) {
        cucumber.apickli.setHeaders(headers.hashes());
        callback();
    });

    cucumber.Given(/^I set body to (.*)$/, function (bodyValue, callback) {
        cucumber.apickli.setRequestBody(bodyValue);
        callback();
    });

    cucumber.Given(/^I pipe contents of file (.*) to body$/, function (file, callback) {
        cucumber.apickli.pipeFileContentsToRequestBody(file, function (error) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.Given(/^I set query parameters to$/, function(queryParameters, callback) {
        cucumber.apickli.setQueryParameters(queryParameters.hashes());
        callback();
    });

    cucumber.Given(/^I have basic authentication credentials (.*) and (.*)$/, function (username, password, callback) {
        cucumber.apickli.addHttpBasicAuthorizationHeader(username, password);
        callback();
    });

    cucumber.When(/^I GET (.*)$/, function (resource, callback) {
        cucumber.apickli.get(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.When(/^I POST to (.*)$/, function (resource, callback) {
        cucumber.apickli.post(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.When(/^I PUT (.*)$/, function (resource, callback) {
        cucumber.apickli.put(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.When(/^I DELETE (.*)$/, function (resource, callback) {
        cucumber.apickli.delete(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.When(/^I PATCH (.*)$/, function (resource, callback) {
        cucumber.apickli.patch(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.When(/^I request OPTIONS for (.*)$/, function(resource, callback) {
        cucumber.apickli.options(resource, function(error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    cucumber.Then(/^response header (.*) should exist$/, function (header, callback) {
        var assertion = cucumber.apickli.assertResponseContainsHeader(header);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response header (.*) should not exist$/, function (header, callback) {
        var assertion = cucumber.apickli.assertResponseContainsHeader(header);
        assertion.success = !assertion.success;

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body should be valid (xml|json)$/, function (contentType, callback) {
        var assertion = cucumber.apickli.assertResponseBodyContentType(contentType);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response code should be (.*)$/, function (responseCode, callback) {
        var assertion = cucumber.apickli.assertResponseCode(responseCode);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response code should not be (.*)$/, function (responseCode, callback) {
        var assertion = cucumber.apickli.assertResponseCode(responseCode);
        assertion.success = !assertion.success;

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response header (.*) should be (.*)$/, function (header, expression, callback) {
        var assertion = cucumber.apickli.assertHeaderValue(header, expression);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response header (.*) should not be (.*)$/, function (header, expression, callback) {
        var assertion = cucumber.apickli.assertHeaderValue(header, expression);
        assertion.success = !assertion.success;

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body should contain (.*)$/, function (expression, callback) {
        var assertion = cucumber.apickli.assertResponseBodyContainsExpression(expression);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body should not contain (.*)$/, function (expression, callback) {
        var assertion = cucumber.apickli.assertResponseBodyContainsExpression(expression);
        assertion.success = !assertion.success;

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body path (.*) should be ((?!of type).+)$/, function (path, value, callback) {
        var assertion = cucumber.apickli.assertPathInResponseBodyMatchesExpression(path, value);

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body path (.*) should not be ((?!of type).+)$/, function (path, value, callback) {
        var assertion = cucumber.apickli.assertPathInResponseBodyMatchesExpression(path, value);
        assertion.success = !assertion.success;

        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body path (.*) should be of type array$/, function(path, callback) {
        var assertion = cucumber.apickli.assertPacucumberArray(path);
        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body path (.*) should be of type array with length (.*)$/, function(path, length, callback) {
        var assertion = cucumber.apickli.assertPacucumberArrayWithLength(path, length);
        if (assertion.success) {
            callback();
        } else {
            callback(prettyPrintJson(assertion));
        }
    });

    cucumber.Then(/^response body should be valid according to schema file (.*)$/, function(schemaFile, callback) {
        cucumber.apickli.validateResponseWithSchema(schemaFile, function (assertion) {
            if (assertion.success) {
                callback();
            } else {
                callback(prettyPrintJson(assertion));
            }
        });
    });

    cucumber.Then(/^response body should be valid according to swagger definition (.*) in file (.*)$/, function(definitionName, swaggerSpecFile, callback) {
        cucumber.apickli.validateResponseWithSwaggerSpecDefinition(definitionName, swaggerSpecFile, function (assertion) {
            if (assertion.success) {
                callback();
            } else {
                callback(prettyPrintJson(assertion));
            }
        });
    });

    cucumber.Then(/^I store the value of body path (.*) as access token$/, function (path, callback) {
        cucumber.apickli.setAccessTokenFromResponseBodyPath(path);
        callback();
    });

    cucumber.When(/^I set bearer token$/, function (callback) {
        cucumber.apickli.setBearerToken();
        callback();
    });

    cucumber.Then(/^I store the value of response header (.*) as (.*) in global scope$/, function (headerName, variableName, callback) {
        cucumber.apickli.storeValueOfHeaderInGlobalScope(headerName, variableName);
        callback();
    });

    cucumber.Then(/^I store the value of body path (.*) as (.*) in global scope$/, function (path, variableName, callback) {
        cucumber.apickli.storeValueOfResponseBodyPathInGlobalScope(path, variableName);
        callback();
    });

    cucumber.Then(/^I store the value of response header (.*) as (.*) in scenario scope$/, function (name, variable, callback) {
        cucumber.apickli.storeValueOfHeaderInScenarioScope(name, variable);
        callback();
    });

    cucumber.Then(/^I store the value of body path (.*) as (.*) in scenario scope$/, function (path, variable, callback) {
        cucumber.apickli.storeValueOfResponseBodyPathInScenarioScope(path, variable);
        callback();
    });

    cucumber.Then(/^value of scenario variable (.*) should be (.*)$/, function (variableName, variableValue, callback) {
        if (cucumber.apickli.assertScenarioVariableValue(variableName, variableValue)) {
            callback();
        } else {
            callback(new Error('value of variable ' + variableName + ' isn\'t equal to ' + variableValue));
        }
    });
};

var prettyPrintJson = function(json) {
    var output = {
        stepContext: stepContext,
        testOutput: json
    };

    return prettyJson.render(output, {
        noColor: true
    });
};
