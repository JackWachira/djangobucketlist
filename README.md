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

## Testing

In the project root folder, run command `python bucketlist/manage.py test bucketlist/api`

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
