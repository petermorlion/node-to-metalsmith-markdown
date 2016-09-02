# node-to-metalsmith-markdown
A node script to export the posts in a Ghost Blog database file to markdown files, ready to be used with Metalsmith.

## Usage

 - Install dependencies by running `npm install`
 - Download your ghost database (can be found in wwwroot/content/data) and put it in the root directory of this node script. Name it ghost.db.
 - Run `node index`

## Results

The script will generate markdown files in the destination folder (/dest), with the following layout:

    ---
	title: the title of your post
	tags: any tags, delimted by comma's
	draft: true or false
	---

	the markdown contents of your post

The file name will be the slug of your post.

## Remarks

This script was specific for my use case. I realize there are other scripts out there to export Ghost data for static site generators.
If you use [Metalsmith](http://metalsmith.io), you may be able to use this. If you're using another static site generator, you will
need to change the script, but you might find better options online.
