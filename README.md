# CDKTF Construct Base

This project has two parts:

1. A base class that I use in my projects to configure the CDKTF projen construct centrally. The auto-update will update settings once for all the cdktf construct projects I have, e.g. version updates.

2. A central cdktf application that federates deployment secrets across all the cdktf construct projects I have.


## Usage

Copy this project, edit the `.projenrc.js` to fit your preferences. Also, add your projects to the `projects.js` file. To bootstrap the projects Github Action run `yarn bootstrap-secrets`.
