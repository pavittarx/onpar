# README

repository for assignment @/onparLabs

## Problem Statement

Create a CRUD application (with minimal UI), using Express JS and MongoDB (Atlas) with the following features 
  - Two roles - Admin and Employee
  - Admins can create Employees
  - Admins can bulk upload files with each file having an Employee ID as the file name and these file should be stored under the appropriate Employee Object in Mongo DB.
  - Files with invalid file names (non-employee ID file names) should not be accepted.
  - Example Employee ID = E-001
  - Example filename = E-001.pdf

## Required

```.env
// Enviornmental Variables (required)
MONGO_DATASOURCE=""
REACT_APP_DOMAIN=""
```

MONGO_DATASOURCE - Your mongodb instance client connection URL
REACT_APP_DOMAIN = Your server's URL


## Deployed 
[Live Instance](https://onparx.herokuapp.com)

## Overall Folder Structure

`/index.js` (at root) - entry point
`/src` - contains react specific code, rendered at "/"
`/public` - static assets for building react

`/routes` - api specific routes
`/libs` - Javascript logic 
`/db` - connection to mongo instance & other variables

## API Structure

`/` - serves React app
`/api/*` - serves unauthenticated routes
`/api/admin/*` - serves authenticated routes only usable by admins

----
### Important Info
The scope of this app is very limited. 

- It allows you to create users, with no access at all. 
- An employee user has "Employee" role, whereas, an Admin user has "admin" role. All users create via React app are normal user with no access, except logging in. The roles must be added to the db manually. 

```js
   {
     username: String, 
     roles: ["admin"]
   }
```

- An admin can upload upto 10 employee files at times. 
  - An employee file missing the format defined above will be discarded. 
  - Only pdf files are accpeted.
  - A user with EmployeeId as Username & Password is created, as soon as his file is uploaded. 
  - The user created by admin has the "employee" role by default

* Employee files are stored in MongoDb's GridFs buckets.