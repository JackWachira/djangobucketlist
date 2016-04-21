[![Build Status](https://travis-ci.org/andela-aomondi/djangobucketlist.svg?branch=master)](https://travis-ci.org/andela-aomondi/djangobucketlist)
[![Coverage Status](https://coveralls.io/repos/github/andela-aomondi/djangobucketlist/badge.svg?branch=feature-review)](https://coveralls.io/github/andela-aomondi/djangobucketlist?branch=feature-review)
![MIT License Badge](https://img.shields.io/badge/license-mit-blue.svg)
[![Code Health](https://landscape.io/github/andela-aomondi/djangobucketlist/feature-review/landscape.svg?style=flat)](https://landscape.io/github/andela-aomondi/djangobucketlist/feature-review)


## Welcome to Ditter

## What is it?

This is a bucketlist application written in Python/Django.

## Features

- Creating a user account
- Creating a bucketlist
- Creating bucketlist items
- Crud actions on bucketlists and bucketlist items

## Technologies used

### Frontend

- CSS Library - [Bootstrap](http://getbootstrap.com/)
- JS Libraries - [JQuery](https://jquery.com/)

### Backend

- API - [Django Rest Framework](http://www.django-rest-framework.org/)

- Available API Endpoints

| Endpoint             	                | Functionality                     	|
|---------------------------------------|-------------------------------------|
| POST /api/auth/register               | Create a new user                   |
| POST /api/auth/login/                 | Get an authentication token         |
| POST /api/bucketlists/   	            | Create a new bucket list          	|
| GET  /api/bucketlists/                | List all the created bucket lists 	|
| GET  /api/bucketlists/id              | Get single bucket list             	|
| PUT /api/bucketlists/id    	          | Update this bucket list           	|
| DELETE /api/bucketlists/id 	          | Delete this single bucket list    	|
| POST /api/bucketlists/id/items 	      | Create a bucketlist item    	      |
| PUT /api/bucketlists/id/items/id 	    | Update a bucketlist item    	      |
| DELETE /api/bucketlists/id/items/id 	| Update a bucketlist item    	      |

## Usage

### Heroku

You can visit the site on the [Ditter Heroku Page](https://ditter.herokuapp.com).

For developers, the API docs can be accessed on [Ditter API Docs](https://ditter.herokuapp.com/docs/).

#### Example usage (Note: Examples use [HTTPie](https://github.com/jkbrzt/httpie) to send requests)

Registration:

```
http -f POST ditter.herokuapp.com/api/auth/register/  username=test password=1234 email=test@tester.com

HTTP/1.1 201 Created
Allow: POST, OPTIONS
Connection: keep-alive
Content-Type: application/json
Date: Fri, 15 Apr 2016 09:04:03 GMT
Server: gunicorn/19.4.5
Transfer-Encoding: chunked
Vary: Accept
Via: 1.1 vegur
X-Frame-Options: SAMEORIGIN

```

Login

```
http -f POST ditter.herokuapp.com/api/auth/login/  username=test password=1234

HTTP/1.1 200 OK
Allow: POST, OPTIONS
Connection: keep-alive
Content-Type: application/json
Date: Fri, 15 Apr 2016 09:06:17 GMT
Server: gunicorn/19.4.5
Transfer-Encoding: chunked
Via: 1.1 vegur
X-Frame-Options: SAMEORIGIN

{
    "token": "b2be7eb7e5eebd4c3d348285249ba819868e7d89"
}
```

## Testing

In the project root folder, run command `python bucketlist/manage.py test bucketlist/api --settings=bucketlist.test_settings`

## License

The MIT License

Copyright (c) 2016 Amos Omondi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
