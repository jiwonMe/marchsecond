# MarchSecond

Headless CMS written in node.js


## Installation
```
yarn install
yarn start
```


## Usage

You would need to configure the database connection in the `.env` file.
```sh
# .env
# port number that the server will listen on
PORT=3624
# MongoDB URI
# MONGO_URI=mongodb://localhost:<port>/<db-name>
MONGO_URI=mongodb://yourhostname:<port>/<db-name>
```

### Create a new post

Create a new post by POST method to `/posts` endpoint.

field | type | description
--- | --- | ---
symbol | string | identifier of the post
title | string | title of the post
content | string | content of the post
creator | string | creator of the post

```
POST /posts
{
    "symbol":"test-post",
    "title": "Test Post",
    "content": "This is Testing post",
    "creator": "jiwon-park"
}
```

### Update a post

MarchSecond supports PUT method to update a post, but it doesn't modify any post data.
We use branch system to handle the post data. Every branch has a unique identifier, belongs to a repository.

Repository has a unique identifier too, and it has branches that have post nodes.

Update has same format as create.

```
PUT /posts/<post-symbol>?branch=<branch-id>
{
    "title": "Test Post",
    "content": "This is Testing post",
    "creator": "jiwon-park"
}
```

### Get a post

You can get specific post by GET method with `/posts/<post-symbol>` endpoint.
It will find the repository that symbol same as the given post symbol, and response the post which
is head of the curren branch.

```
GET /posts/<post-symbol>
```

### Delete all post and branch in repository

MarchSecond use branch system, so you can not delete specific node in branch, but delete whole
repository is okay.

```
DELETE /posts/<post-symbol>
```
