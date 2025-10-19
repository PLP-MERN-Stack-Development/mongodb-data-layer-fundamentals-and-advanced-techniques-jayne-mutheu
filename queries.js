// queries.js - MongoDB CRUD, Advanced Queries, Aggregation, and Indexing

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Change to Atlas URI if needed
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // -------------------------
    // Task 2: Basic CRUD
    // -------------------------

    // Find all books in a specific genre (e.g., Fiction)
    console.log('\n📚 Books in Fiction genre:');
    console.log(await books.find({ genre: 'Fiction' }).toArray());

    // Find books published after a certain year (e.g., 1950)
    console.log('\n📚 Books published after 1950:');
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    // Find books by a specific author (e.g., George Orwell)
    console.log('\n📚 Books by George Orwell:');
    console.log(await books.find({ author: 'George Orwell' }).toArray());

    // Update the price of a specific book
    console.log('\n💲 Updating price of "1984"...');
    await books.updateOne(
      { title: '1984' },
      { $set: { price: 12.99 } }
    );
    console.log('Updated:', await books.findOne({ title: '1984' }));

    // Delete a book by title
    console.log('\n🗑️ Deleting "Animal Farm"...');
    await books.deleteOne({ title: 'Animal Farm' });
    console.log('Remaining count:', await books.countDocuments());

    // -------------------------
    // Task 3: Advanced Queries
    // -------------------------

    // Books in stock AND published after 2010
    console.log('\n📚 In-stock books after 2010:');
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    // Projection: only title, author, price
    console.log('\n🔎 Projection (title, author, price):');
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    // Sorting by price (ascending)
    console.log('\n⬆️ Books sorted by price (asc):');
    console.log(await books.find().sort({ price: 1 }).toArray());

    // Sorting by price (descending)
    console.log('\n⬇️ Books sorted by price (desc):');
    console.log(await books.find().sort({ price: -1 }).toArray());

    // Pagination (5 per page, page 1)
    console.log('\n📑 Page 1 (5 books):');
    console.log(await books.find().limit(5).toArray());

    // Pagination (page 2)
    console.log('\n📑 Page 2 (next 5 books):');
    console.log(await books.find().skip(5).limit(5).toArray());

    // -------------------------
    // Task 4: Aggregation
    // -------------------------

    // Average price of books by genre
    console.log('\n📊 Average price by genre:');
    console.log(await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    // Author with most books
    console.log('\n👑 Author with most books:');
    console.log(await books.aggregate([
      { $group: { _id: "$author", bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray());

    // Group by publication decade
    console.log('\n📊 Books grouped by decade:');
    console.log(await books.aggregate([
      { $project: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray());

    // -------------------------
    // Task 5: Indexing
    // -------------------------

    console.log('\n⚡ Creating indexes...');
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });

    console.log('\n🔍 Index performance (find by title "The Hobbit"):');
    console.log(await books.find({ title: "The Hobbit" }).explain("executionStats"));

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
    console.log('\n🔒 Connection closed');
  }
}

runQueries().catch(console.error);
