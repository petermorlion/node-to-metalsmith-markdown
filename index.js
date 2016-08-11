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

  var posts = sqlite.run('SELECT p.id, p.title, p.markdown, p.slug, p.status FROM \'posts\' p');

  posts.forEach(function(post){
    var fileName = `${destination}/${post.slug}.md`;
    var tags = sqlite.run(`SELECT t.name FROM 'tags' t INNER JOIN 'posts_tags' pt on pt.tag_id = t.id WHERE pt.post_id = ${post.id}`);

    var tagsDelimited = tags.map(function(tag) { return tag.name }).join(',');

    var data = `---
title: ${post.title}
tags: ${tagsDelimited}
draft: ${post.status === 'draft'}
---
${post.markdown}`;

    fs.writeFile(fileName, data, {}, function() {
      console.log('Created ' + fileName);
    });
  });
};

clearDestination(generateFiles);
