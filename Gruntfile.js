module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        protractor: {
            stage_chrome: {
                options: {
                    configFile: "conf-chrome.js", // Protractor config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                        params: {
                            baseUrl: "https://tn-ui-staging-2019.herokuapp.com",
                            signupUrl: "https://tn-ui-staging-2019.herokuapp.com/signup",
                            userEmail:"bethewaveautomation@gmail.com",
                            userPassword:"Test@123$"
                        },
                        verbose:false
                    }
                }
            },
            prepod_chrome: {
                options: {
                    configFile: "conf-chrome.js", // Protractor config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                        params: {
                            baseUrl: "https://tn-ui-preprod-2019.herokuapp.com",
                            signupUrl: "https://tn-ui-preprod-2019.herokuapp.com/signup",
                            userEmail:"bethewaveautomation@gmail.com",
                            userPassword:"Test@123$"
                        },
                        verbose:false
                    }
                }
            },
            stage_firefox: {
                options: {
                    configFile: "conf-firefox.js", // Protractor config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                        params: {
                            baseUrl: "https://tn-ui-staging-2019.herokuapp.com/",
                            userEmail:"bethewaveautomation@gmail.com",
                            userPassword:"Test@123$"
                        },
                        verbose:false
                    }
                }
            },
            prepod_firefox: {
                options: {
                    configFile: "conf-firefox.js", // Protractor config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                        params: {
                            baseUrl: "https://tn-ui-preprod-2019.herokuapp.com/",
                            userEmail:"bethewaveautomation@gmail.com",
                            userPassword:"Test@123$"
                        },
                        verbose:false
                    }
                }
            },
            debug: {
                options: {
                    configFile: "conf.js", // Protractor config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    debug: true, // If true, protractor will not use colors in its output.
                    args: {
                        params: {
                            baseUrl: "https://btw-ui-staging-2019.herokuapp.com/",
                            userEmail:"bethewaveautomation@gmail.com",
                            userPassword:"Test@123$"
                        },
                        verbose:false
                    }
                }
            }
        }
    });

    // Load the plugin that provides the "runner" task.
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-npm-install');

    grunt.registerTask('npminstall', ['npm-install']);

    // Default task(s).
    grunt.registerTask('default', ['protractor:stage_chrome']);
    grunt.registerTask('stage-firefox', ['protractor:stage_firefox']);
    grunt.registerTask('stage', ['protractor:stage_chrome','protractor:stage_firefox']);
    grunt.registerTask('stage-chrome', ['protractor:stage_chrome']);
    grunt.registerTask('prepod', ['protractor:prepod_chrome','protractor:prepod_firefox']);
    grunt.registerTask('prepod-firefox', ['protractor:prepod_firefox']);
    grunt.registerTask('prepod-chrome', ['protractor:prepod_chrome']);
};