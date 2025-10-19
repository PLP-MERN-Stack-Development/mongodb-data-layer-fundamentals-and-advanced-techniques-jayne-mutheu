# 🗄️ PLP Bookstore – MongoDB Data Layer Fundamentals

## 🚀 Overview
This project demonstrates the fundamentals of **MongoDB**, including:
- Database setup
- CRUD operations
- Advanced queries (projection, sorting, pagination)
- Aggregation pipelines
- Indexing for performance optimization

All tasks are implemented using **Node.js** and the official **MongoDB driver**.

---

## 📂 Project Structure
.
├── insert_books.js # Script to insert sample book documents
├── queries.js # Script with CRUD, advanced queries, aggregation & indexing
├── README.md # Documentation (this file)

yaml
Copy code

---

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-github-repo-url>
cd <repo-folder>
2. Install Dependencies
bash
Copy code
npm install mongodb
3. Start MongoDB
You can either:

Run MongoDB locally (if installed), or

Use Docker:

bash
Copy code
docker run -d --name mongodb -p 27017:27017 mongo:6.0
4. Insert Sample Data
Run the script to populate the database with 12 sample books:

bash
Copy code
node insert_books.js
Expected output:

vbnet
Copy code
Connected to MongoDB server
Collection dropped successfully
12 books were successfully inserted into the database
1. "To Kill a Mockingbird" by Harper Lee (1960)
...
5. Run Queries
Execute all CRUD, advanced queries, aggregation, and indexing:

bash
Copy code
node queries.js
This will print results for:

Finding books by genre, author, year

Updating and deleting documents

Projection, sorting, and pagination

Aggregation pipelines (avg price, author with most books, grouping by decade)

Index creation and performance analysis

📸 Submission Requirements
For your GitHub Classroom submission, ensure your repo includes:

insert_books.js

queries.js

README.md

A screenshot of MongoDB Compass or Atlas showing the plp_bookstore database and books collection with sample data.

✅ Expected Outcome
A working MongoDB database (plp_bookstore) with a books collection

At least 10 inserted book documents (this project provides 12)

Demonstrated ability to perform:

CRUD operations

Advanced queries

Aggregation pipelines

Indexing and performance analysis