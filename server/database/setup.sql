CREATE SCHEMA IF NOT EXISTS "Project";

CREATE TABLE IF NOT EXISTS "Project".bookings_rentings
(
    bookingid integer NOT NULL,
    roomid integer,
    employeeid integer,
    customerid integer,
    booking_renting character varying(255) COLLATE pg_catalog."default",
    startdate date,
    enddate date,
    CONSTRAINT bookings_rentings_pkey PRIMARY KEY (bookingid),
    CONSTRAINT bookings_rentings_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES "Project".customers (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bookings_rentings_employeeid_fkey FOREIGN KEY (employeeid)
        REFERENCES "Project".employees (employeeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bookings_rentings_roomid_fkey FOREIGN KEY (roomid)
        REFERENCES "Project".rooms (roomid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE TABLE IF NOT EXISTS "Project".chainscontact
(
    chainid integer,
    phonenumber integer,
    CONSTRAINT chainscontact_chainid_fkey FOREIGN KEY (chainid)
        REFERENCES "Project".hotelchains (chainid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chainscontact_phonenumber_fkey FOREIGN KEY (phonenumber)
        REFERENCES "Project".hotelchains (phonenumbers) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS "Project".customers
(
    customerid integer NOT NULL,
    fullname character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    zipcode character varying(255) COLLATE pg_catalog."default",
    streetnum character varying(255) COLLATE pg_catalog."default",
    streetname character varying(255) COLLATE pg_catalog."default",
    apartmentnum character varying(255) COLLATE pg_catalog."default",
    idtype character varying(255) COLLATE pg_catalog."default",
    idnumber integer,
    registrationdate date,
    CONSTRAINT customers_pkey PRIMARY KEY (customerid)
)

CREATE TABLE IF NOT EXISTS "Project".employees
(
    employeeid integer NOT NULL,
    hotelid integer,
    fullname character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    ssn_sin character varying(255) COLLATE pg_catalog."default",
    "position" character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT employees_pkey PRIMARY KEY (employeeid),
    CONSTRAINT employees_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES "Project".hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS "Project".hotelchains
(
    chainid integer NOT NULL,
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    zipcode character varying(255) COLLATE pg_catalog."default",
    streetnum character varying(255) COLLATE pg_catalog."default",
    streetname character varying(255) COLLATE pg_catalog."default",
    apartmentnum character varying(255) COLLATE pg_catalog."default",
    noofhotels integer,
    email character varying(255) COLLATE pg_catalog."default",
    phonenumbers bigint,
    CONSTRAINT hotelchains_pkey PRIMARY KEY (chainid),
    CONSTRAINT unique_phonenumbers UNIQUE (phonenumbers)
)


CREATE TABLE IF NOT EXISTS "Project".hotelchains
(
    chainid integer NOT NULL,
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    zipcode character varying(255) COLLATE pg_catalog."default",
    streetnum character varying(255) COLLATE pg_catalog."default",
    streetname character varying(255) COLLATE pg_catalog."default",
    apartmentnum character varying(255) COLLATE pg_catalog."default",
    noofhotels integer,
    email character varying(255) COLLATE pg_catalog."default",
    phonenumbers bigint,
    CONSTRAINT hotelchains_pkey PRIMARY KEY (chainid),
    CONSTRAINT unique_phonenumbers UNIQUE (phonenumbers)
)

CREATE TABLE IF NOT EXISTS "Project".hotelcontacts
(
    hotelid integer,
    phonenumber integer,
    CONSTRAINT hotelcontacts_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES "Project".hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT hotelcontacts_phonenumber_fkey FOREIGN KEY (phonenumber)
        REFERENCES "Project".hotels (phonenumber) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS "Project".hotels
(
    hotelid integer NOT NULL,
    chainid integer,
    noofrooms integer,
    ratings integer,
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    zipcode character varying(255) COLLATE pg_catalog."default",
    streetnum character varying(255) COLLATE pg_catalog."default",
    streetname character varying(255) COLLATE pg_catalog."default",
    apartmentnum character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    phonenumber bigint,
    CONSTRAINT hotels_pkey PRIMARY KEY (hotelid),
    CONSTRAINT unique_phonenumber UNIQUE (phonenumber),
    CONSTRAINT hotels_chainid_fkey FOREIGN KEY (chainid)
        REFERENCES "Project".hotelchains (chainid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS "Project".rooms
(
    roomid integer NOT NULL,
    hotelid integer,
    price integer,
    amenities character varying(255) COLLATE pg_catalog."default",
    capacity character varying(255) COLLATE pg_catalog."default",
    view character varying(255) COLLATE pg_catalog."default",
    canextend boolean,
    problems character varying(255) COLLATE pg_catalog."default",
    is_available boolean DEFAULT true,
    CONSTRAINT rooms_pkey PRIMARY KEY (roomid),
    CONSTRAINT rooms_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES "Project".hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Marriott Hotels (1-8)
-- Continuing with U.S. locations
INSERT INTO Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber)
VALUES
(1, 1, 300, 5, 'New York', 'NY', '10001', '1', 'Times Square', 'timesqmarriott@marriott.com', 1234567890),
(2, 1, 250, 4, 'New York', 'NY', '10010', '2', 'Lexington Avenue', 'lexmarriott@marriott.com', 1234567891),
-- Expanding to Canada
(3, 1, 200, 5, 'Toronto', 'ON', 'M5H 2G4', '3', 'York Street', 'yorkmarriott@marriott.com', 1234567892),
(4, 1, 180, 4, 'Vancouver', 'BC', 'V6C 2R7', '4', 'Waterfront Road', 'waterfrontmarriott@marriott.com', 1234567893),
-- Additional U.S. locations
(5, 1, 220, 3, 'Chicago', 'IL', '60601', '5', 'Michigan Avenue', 'michimarriott@marriott.com', 1234567894),
(6, 1, 205, 4, 'Miami', 'FL', '33131', '6', 'Biscayne Boulevard', 'biscaynemarriott@marriott.com', 1234567895),
-- More Canadian locations
(7, 1, 190, 3, 'Montreal', 'QC', 'H3B 3J5', '7', 'de la Montagne Street', 'montagnemarriott@marriott.com', 1234567896),
(8, 1, 210, 5, 'Calgary', 'AB', 'T2P 5G8', '8', '9 Avenue SW', '9avemarriott@marriott.com', 1234567897),

-- Hilton Hotels (9-16)
-- U.S. locations with some overlap in cities
INSERT INTO Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber)
VALUES
(9, 2, 260, 5, 'Los Angeles', 'CA', '90015', '9', 'Figuroa Street', 'figueroahilton@hilton.com', 2234567890),
(10, 2, 230, 4, 'Los Angeles', 'CA', '90045', '10', 'Airport Boulevard', 'airporthilton@hilton.com', 2234567891),
-- Expanding to Canada
(11, 2, 240, 5, 'Toronto', 'ON', 'M5V 1J4', '11', 'King Street W', 'kinghilton@hilton.com', 2234567892),
(12, 2, 200, 4, 'Vancouver', 'BC', 'V6B 6C1', '12', 'Robson Street', 'robsonhilton@hilton.com', 2234567893),
-- Additional U.S. locations
(13, 2, 210, 3, 'Chicago', 'IL', '60616', '13', 'South Michigan Avenue', 'michiganhilton@hilton.com', 2234567894),
(14, 2, 190, 4, 'New York', 'NY', '10019', '14', '7th Avenue', '7avenuehilton@hilton.com', 2234567895),
-- More Canadian locations
(15, 2, 180, 3, 'Montreal', 'QC', 'H3B 4A5', '15', 'René-Lévesque Blvd W', 'renelevesquehilton@hilton.com', 2234567896),
(16, 2, 250, 5, 'Calgary', 'AB', 'T2G 0P5', '16', '4 Avenue SE', '4avehilton@hilton.com', 2234567897),

-- Hyatt Hotels (8 Hotels, including overlap in cities)
-- Hyatt in the U.S.
INSERT INTO Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber)
VALUES
(17, 3, 200, 5, 'Chicago', 'IL', '60611', '800', 'Michigan Ave', 'chicagohyatt@hyatt.com', 7776665555),
(18, 3, 180, 4, 'Chicago', 'IL', '60654', '633', 'North Saint Clair St', 'chicagohyatt2@hyatt.com', 7776665554),
(19, 3, 150, 3, 'New York', 'NY', '10017', '109', 'East 42nd St', 'nyhyatt@hyatt.com', 7776665553),
(20, 3, 130, 4, 'Los Angeles', 'CA', '90028', '1750', 'Highland Ave', 'lahyatt@hyatt.com', 7776665552),
-- Hyatt in Canada
(21, 3, 120, 5, 'Toronto', 'ON', 'M5H 2L2', '370', 'King St W', 'torontohyatt@hyatt.com', 7776665551),
(22, 3, 100, 4, 'Toronto', 'ON', 'M5V 3X5', '225', 'Front St W', 'torontohyatt2@hyatt.com', 7776665550),
(23, 3, 90, 3, 'Vancouver', 'BC', 'V6C 2R7', '655', 'Burrard St', 'vancouverhyatt@hyatt.com', 7776665549),
(24, 3, 85, 5, 'Montreal', 'QC', 'H3B 1X9', '1255', 'Jeanne-Mance St', 'montrealhyatt@hyatt.com', 7776665548),

-- IHG (InterContinental Hotels Group) Hotels (8 Hotels)
-- IHG in the U.S.
INSERT INTO Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber)
VALUES
(25, 4, 210, 5, 'Atlanta', 'GA', '30303', '181', 'Peachtree St NE', 'atlantaihg@ihg.com', 6665554445),
(26, 4, 190, 4, 'Atlanta', 'GA', '30313', '267', 'Marietta St NW', 'atlantaihg2@ihg.com', 6665554444),
(27, 4, 160, 3, 'Orlando', 'FL', '32819', '9939', 'Universal Blvd', 'orlandoihg@ihg.com', 6665554443),
(28, 4, 140, 5, 'San Francisco', 'CA', '94102', '50', '8th St', 'sanfranciscoihg@ihg.com', 6665554442),
-- IHG in Canada
(29, 4, 150, 4, 'Toronto', 'ON', 'M5V 1J9', '225', 'Front St W', 'torontoihg@ihg.com', 6665554441),
(30, 4, 130, 3, 'Toronto', 'ON', 'M4V 1P5', '220', 'Bloor St W', 'torontoihg2@ihg.com', 6665554440),
(31, 4, 120, 5, 'Vancouver', 'BC', 'V6C 2W6', '300', 'Main St', 'vancouverihg@ihg.com', 6665554439),
(32, 4, 110, 4, 'Calgary', 'AB', 'T2P 3T6', '711', '4th St SE', 'calgaryihg@ihg.com', 6665554438),
-- Wyndham Hotels (33-40)
-- U.S. locations with some overlap in cities
INSERT INTO Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber)
VALUES
(33, 5, 280, 5, 'Orlando', 'FL', '32819', '33', 'International Drive', 'idrivewyndham@wyndham.com', 5556664441),
(34, 5, 250, 4, 'Orlando', 'FL', '32821', '34', 'World Center Drive', 'worldcenterwyndham@wyndham.com', 5556664442),
-- Expanding to Canada
(35, 5, 230, 3, 'Toronto', 'ON', 'M5J 1B7', '35', 'Harbour Square', 'harbourwyndham@wyndham.com', 5556664443),
(36, 5, 220, 5, 'Vancouver', 'BC', 'V6C 2R5', '36', 'West Hastings Street', 'hastingswyndham@wyndham.com', 5556664444),
-- Additional U.S. locations
(37, 5, 240, 4, 'New York', 'NY', '10006', '37', 'Greenwich Street', 'greenwichwyndham@wyndham.com', 5556664445),
(38, 5, 260, 3, 'Chicago', 'IL', '60606', '38', 'West Adams Street', 'adamsstwyndham@wyndham.com', 5556664446),
-- More Canadian locations
(39, 5, 270, 4, 'Montreal', 'QC', 'H2Z 1Z3', '39', 'Jeanne-Mance Street', 'jeannemancewyndham@wyndham.com', 5556664447),
(40, 5, 290, 5, 'Calgary', 'AB', 'T2P 3H5', '40', '9 Avenue SW', '9avewyndham@wyndham.com', 5556664448);

INSERT INTO rooms (roomid, hotelid, price, amenities, capacity, view, canextend, problems)
VALUES
-- Hotel 1 Rooms
(1, 1, 100, 'Wi-Fi, TV, Minibar', 'Single', 'City', FALSE, ''),
(2, 1, 150, 'Wi-Fi, TV, Minibar', 'Double', 'City', TRUE, ''),
(3, 1, 200, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea', FALSE, ''),
(4, 1, 250, 'Wi-Fi, TV, Minibar, Balcony', 'Quad', 'Sea', TRUE, ''),
(5, 1, 300, 'Wi-Fi, TV, Minibar, Balcony, Kitchenette', 'Suite', 'Sea', TRUE, ''),
-- Repeat for each hotel, incrementing roomid and changing hotelid after every 5 rooms

-- Hotel 2 Rooms
(6, 2, 110, 'Wi-Fi, TV, Minibar', 'Single', 'Garden', FALSE, ''),
(7, 2, 160, 'Wi-Fi, TV, Minibar', 'Double', 'Garden', TRUE, ''),
(8, 2, 210, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City', FALSE, ''),
(9, 2, 260, 'Wi-Fi, TV, Safe, Minibar, Balcony', 'Quad', 'City', TRUE, ''),
(10, 2, 310, 'Wi-Fi, TV, Safe, Minibar, Balcony, Kitchenette', 'Suite', 'City', TRUE, ''),
-- Continue this pattern until roomid 200

-- Hotel 40 Rooms (Example entries for the last hotel)
(196, 40, 120, 'Wi-Fi, TV, Minibar', 'Single', 'Mountain', FALSE, ''),
(197, 40, 170, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain', TRUE, ''),
(198, 40, 220, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City', FALSE, ''),
(199, 40, 270, 'Wi-Fi, TV, Safe, Minibar, Balcony', 'Quad', 'City', TRUE, ''),
(200, 40, 320, 'Wi-Fi, TV, Safe, Minibar, Balcony, Kitchenette', 'Suite', 'City', TRUE, ''),


-- SELECT * FROM hotels WHERE city = 'New York';
SELECT * FROM hotels WHERE city = 'New York';

-- Count the number of rooms available in a specific hotel:
SELECT COUNT(*) FROM rooms WHERE hotelid = 1 AND is_available = TRUE;

-- List hotels and their room counts (Aggregation):
SELECT hotelid, COUNT(roomid) AS total_rooms FROM rooms GROUP BY hotelid;


-- List hotels based on availability
SELECT hotelid, COUNT(roomid) AS total_rooms FROM rooms WHERE is_available = TRUE GROUP BY hotelid;

-- Update customer info

-- Update employee info

-- Update hotel info

-- Update rooms info

-- Update Booking/Renting

-- Insert New Renting

-- Trigger to make room not available after new Booking/Renting




CREATE VIEW view_available_rooms_per_area AS
SELECT h.city, COUNT(r.roomid) AS available_rooms
FROM hotels h
JOIN rooms r ON h.hotelid = h.hotelid
WHERE r.is_available = TRUE
GROUP BY h.city;