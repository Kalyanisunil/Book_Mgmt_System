
# Book Management System

A full-stack Book Management System built with:
- React (Frontend)
- Spring Boot (Backend)
- MongoDB (Database)

This application allows you to:
- Add new books
- View all books
- View book details
- Delete books (with confirmation)
- Pagination and sorting 

---

## Project Structure

```

BookMgmtSystem/
│
├── Backend/
│   ├── src/main/java
│   ├── src/main/resources
│   ├── pom.xml
│
└── Frontend/
└── bookmgmt/
├── src
├── public
├── package.json

```

---



# 1. Backend Setup (Spring Boot)

### Clone Repository


git clone [https://github.com/](https://github.com/)<Kalyanisunil>/<Book_Mgmt_System>.git




### Configure MongoDB

Create file: `src/main/resources/application.properties`

If using MongoDB Atlas:


spring.application.name=BookMgmtSystem

spring.data.mongodb.uri=mongodb+srv://kalyanisunilofficial_db_user:OfvIrhtBgbLTZXBj@cluster0.vbroxdm.mongodb.net/bookdb?retryWrites=true&w=majority
spring.data.mongodb.database=bookdb
server.port=8080



google.api.key=AIzaSyBOKlhRneyYEx8QIXRpyBKJzxOrvVMEG-0





### Install Dependencies


mvn clean install



### Run Backend


mvn spring-boot:run



Backend runs at:


[http://localhost:8080](http://localhost:8080)




## API Endpoints

| Method | Endpoint          | Description     |
|--------|--------------------|-----------------|
| GET    | /api/books        | Get all books   |
| GET    | /api/books/{id}   | Get book by ID  |
| POST   | /api/books        | Add new book    |
| DELETE | /api/books/{id}   | Delete book     |

---

# 2. Frontend Setup (React)

### Navigate to React App


cd ../Frontend/bookmgmt



### Install Dependencies


npm install



### Start React App


npm start



React runs at:


[http://localhost:3000](http://localhost:3000)







## Testing with Postman

Example request:

POST `/api/books`


{
"title": "Clean Code",
"author": "Robert C. Martin",
"genre": "Non-Fiction",
"publicationDate": "2008-08-11",
"isbn": "9780132350884",
"rating": 5
}


## Database Schema 
| Field             | Type   | Description         |
| ----------------- | ------ | ------------------- |
| `_id`             | Object | MongoDB Internal ID |
| `id`              | String | Unique ID (B-001)   |
| `title`           | String | Max 100 chars       |
| `author`          | String | Max 50 chars        |
| `publicationDate` | Date   | Published date      |
| `genre`           | String | Dropdown            |
| `isbn`            | String | 13-digit            |
| `rating`          | Number | 1-5                 |


## Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Data MongoDB
- Maven

### Frontend
- React
- Axios
- Bootstrap

### Database
- MongoDB  Atlas




## Deployment

### Frontend
- Netlify


### Backend
- Railway


## Author

Kalyani Sunil Kumar 
Full Stack Developer  


