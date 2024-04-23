CREATE TABLE Donations (
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    donationAmount FLOAT NOT NULL,
    anonymous INTEGER NOT NULL CHECK (anonymous IN (0, 1)),
    PRIMARY KEY (firstName, lastName, donationAmount)
);

INSERT INTO Donations (firstName, lastName, donationAmount, anonymous) VALUES ('Randall', 'Dickinson', 777.77, 0);
INSERT INTO Donations (firstName, lastName, donationAmount, anonymous) VALUES ('John', 'Smith', 333.00, 1);
