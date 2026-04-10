# Multiplayer Tic Tac Toe (PHP/MySQL)

## Features
- Multiplayer support
- Game state saved in MySQL
- Simple web interface (HTML/JS)
- Flags directory for future assets

## Setup
1. Create a MySQL database named `tic_tac_toe`.
2. Create a table:

```sql
CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(32) NOT NULL,
  player CHAR(1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
3. Update `db.php` with your MySQL credentials if needed.
4. Place all files on your PHP server.
5. Open `index.html` in your browser.
