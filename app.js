#!/usr/bin/env node

var express = require('express');
var app = express();

app.use('/', express.static('exports'));
app.use('/lib', express.static('thirdparty/js'));
app.use('/images', express.static('images'));
app.use('/css', express.static('css'));

app.listen(8888);