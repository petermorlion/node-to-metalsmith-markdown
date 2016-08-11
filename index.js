var sqlite = require('sqlite-sync');
var fs = require('fs');
var rimraf = require('rimraf');

var destination = './dest';

var clearDestination = function(callback) {
  rimraf(destination, {}, callback);
};

var generateFiles = function() {

  if (!fs.existsSync(destination)){
      fs.mkdirSync(destination);
  }

  sqlite.connect('./ghost.db');

  var posts = sqlite.run('SELECT p.id, p.title, p.markdown, p.slug, p.status, p.published_at FROM \'posts\' p WHERE p.page = 0');

  posts.forEach(function(post){
    var fileName = `${destination}/${post.slug}.md`;
    var tags = sqlite.run(`SELECT t.name FROM 'tags' t INNER JOIN 'posts_tags' pt on pt.tag_id = t.id WHERE pt.post_id = ${post.id}`);

    var tagsDelimited = tags.map(function(tag) { return tag.name }).join(',');
    var publishDate = new Date(post.published_at);
    var year = publishDate.getFullYear();
    var month = `0${publishDate.getMonth()}`.slice(-2);
    var day = `0${publishDate.getDay()}`.slice(-2);

    var data = `---
title: ${post.title}
tags: ${tagsDelimited}
draft: ${post.status === 'draft'}
date: ${year}-${month}-${day}
---
${post.markdown}`;

    fs.writeFile(fileName, data, {}, function() {
      console.log('Created ' + fileName);
    });
  });
};

clearDestination(generateFiles);
