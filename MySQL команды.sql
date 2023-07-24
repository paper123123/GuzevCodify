SELECT * FROM sys.players where citizenship = "Brazil" or dob = "1991-04-05"
SELECT * FROM sys.players where player_id = "2" and dob = "1991-04-05"
SELECT * FROM sys.players where dob > "1988-05-10"
UPDATE sys.players set first_name = "Валера" where player_id = "1"
DELETE FROM sys.players where last_name = "Karius"
SELECT AVG (dob) FROM sys.players
SELECT SUM (dob) FROM sys.players
SELECT COUNT (dob) FROM sys.players
SELECT * FROM sys.players where player_id > 2 and player_id < 50
INSERT INTO sys.players (player_id, first_name, last_name, nickname, citizenship, dob, role) values ("15", "Apa", "Брат", "Мистер_Би", "Vladimir", "1990-01-01", "DEFENDER")le) values ("15", "Apa", "Брат", "Мистер_Би", "Vladimir", "1990-01-01", "DEFENDER")
