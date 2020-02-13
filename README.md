This project was built as part of an assignment using the MERN stack.

## Features

In the project directory, you can run:<br />
1) Register voter<br />
2) Search voter by name, district, eid<br />
3) Download voter id as pdf if already exists in the database.<br />

### How to run

1) Start mongod server. Create a mongodb database "electoraldb" with a collection name 'admins' inside it.<br />

2) Add a record to the 'admins' collection in the format.<br />
name: String value that represents the name of the admin.<br />
username: String value that represents the username of the admin.<br />
password: String value that represents the password of the admin hashed using sha256 hashing algorithm.<br />

3) Clone this repository using:<br />
`git clone https://github.com/pranav3714/assignmentTz.git` or download.<br />

4) Move into the project directory:<br />
`cd assignmentTz` or open command window in the project directory<br />

5) Install all the dependancies and run the frontend react app using the command in the root project directory:<br />
`npm i` & `npm start`

6) Install all the dependancies and run the API server using.(in new command prompt or terminal set on project root path)<br />
`cd server` & `npm i` & `npm start` <br />
