CREATE SCHEMA IF NOT EXISTS project;

CREATE TABLE IF NOT EXISTS project.bookings_rentings
(
    bookingid BIGSERIAL PRIMARY KEY,
    roomid integer,
    employeeid integer,
    customerid integer,
    booking_renting character varying(255) COLLATE pg_catalog."default",
    startdate date,
    enddate date,
    CONSTRAINT bookings_rentings_pkey PRIMARY KEY (bookingid),
    CONSTRAINT bookings_rentings_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES project.customers (customerid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bookings_rentings_employeeid_fkey FOREIGN KEY (employeeid)
        REFERENCES project.employees (employeeid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT bookings_rentings_roomid_fkey FOREIGN KEY (roomid)
        REFERENCES project.rooms (roomid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE TABLE IF NOT EXISTS project.chainscontact
(
    chainid integer,
    phonenumber integer,
    CONSTRAINT chainscontact_chainid_fkey FOREIGN KEY (chainid)
        REFERENCES project.hotelchains (chainid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chainscontact_phonenumber_fkey FOREIGN KEY (phonenumber)
        REFERENCES project.hotelchains (phonenumbers) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS project.customers
(
    customerid BIGSERIAL PRIMARY KEY,
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
    hashed_password character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default",
    CONSTRAINT customers_pkey PRIMARY KEY (customerid)
)

CREATE TABLE IF NOT EXISTS project.employees
(
    employeeid BIGSERIAL PRIMARY KEY,
    hotelid integer,
    fullname character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    ssn_sin character varying(255) COLLATE pg_catalog."default",
    "position" character varying(255) COLLATE pg_catalog."default",
    hashed_password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT employees_pkey PRIMARY KEY (employeeid),
    CONSTRAINT employees_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES project.hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS project.hotelchains
(
    chainid BIGSERIAL PRIMARY KEY,
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


CREATE TABLE IF NOT EXISTS project.hotelcontacts
(
    hotelid integer,
    phonenumber integer,
    CONSTRAINT hotelcontacts_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES project.hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT hotelcontacts_phonenumber_fkey FOREIGN KEY (phonenumber)
        REFERENCES project.hotels (phonenumber) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS project.hotels
(
    hotelid BIGSERIAL PRIMARY KEY,
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
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT hotels_pkey PRIMARY KEY (hotelid),
    CONSTRAINT unique_phonenumber UNIQUE (phonenumber),
    CONSTRAINT hotels_chainid_fkey FOREIGN KEY (chainid)
        REFERENCES project.hotelchains (chainid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS project.rooms
(
    roomid BIGSERIAL PRIMARY KEY,
    hotelid integer,
    price integer,
    amenities character varying(255) COLLATE pg_catalog."default",
    capacity character varying(255) COLLATE pg_catalog."default",
    view character varying(255) COLLATE pg_catalog."default",
    canextend boolean,
    problems character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT rooms_pkey PRIMARY KEY (roomid),
    CONSTRAINT rooms_hotelid_fkey FOREIGN KEY (hotelid)
        REFERENCES project.hotels (hotelid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS project.archived_bookings_rentings
(
    bookingid BIGSERIAL PRIMARY KEY,
    roomid integer,
    employeeid integer,
    customerid integer,
    booking_renting character varying(255) COLLATE pg_catalog."default",
    startdate date,
    enddate date,
    CONSTRAINT archived_bookings_rentings_pkey PRIMARY KEY (bookingid)
)


-- Marriott Hotels (1-8)
-- Continuing with U.S. locations
INSERT INTO project.Hotels (HotelID, ChainID, NoOfRooms, Ratings, City, State, ZipCode, StreetNum, StreetName, Email, PhoneNumber, name)
VALUES
(1, 1, 300, 5, 'New York', 'NY', '10001', '1', 'Times Square', 'timesqmarriott@marriott.com', 1234567890, 'Pacific Estate Resort'),
(2, 1, 250, 4, 'New York', 'NY', '10010', '2', 'Lexington Avenue', 'lexmarriott@marriott.com', 1234567891, 'Emerald Tide Resort'),
(3, 1, 200, 5, 'Toronto', 'ON', 'M5H 2G4', '3', 'York Street', 'yorkmarriott@marriott.com', 1234567892, 'Sunny Spa Resort'),
(4, 1, 180, 4, 'Vancouver', 'BC', 'V6C 2R7', '4', 'Waterfront Road', 'waterfrontmarriott@marriott.com', 1234567893, 'Noble Nebula Resort'),
(5, 1, 220, 3, 'Chicago', 'IL', '60601', '5', 'Michigan Avenue', 'michimarriott@marriott.com', 1234567894, 'Deluxe Dwellings Hotel'),
(6, 1, 205, 4, 'Miami', 'FL', '33131', '6', 'Biscayne Boulevard', 'biscaynemarriott@marriott.com', 1234567895, 'Azure Skyline Hotel'),
(7, 1, 190, 3, 'Montreal', 'QC', 'H3B 3J5', '7', 'de la Montagne Street', 'montagnemarriott@marriott.com', 1234567896, 'Maple Leaf Lodge'),
(8, 1, 210, 5, 'Calgary', 'AB', 'T2P 5G8', '8', '9 Avenue SW', '9avemarriott@marriott.com', 1234567897, 'Prairie Palace Hotel'),

(9, 2, 260, 5, 'Los Angeles', 'CA', '90015', '9', 'Figuroa Street', 'figueroahilton@hilton.com', 2234567890, 'Golden Coast Resort'),
(10, 2, 230, 4, 'Los Angeles', 'CA', '90045', '10', 'Airport Boulevard', 'airporthilton@hilton.com', 2234567891, 'Jetsetters Junction Hotel'),
(11, 2, 240, 5, 'Toronto', 'ON', 'M5V 1J4', '11', 'King Street W', 'kinghilton@hilton.com', 2234567892, 'Royal York Retreat'),
(12, 2, 200, 4, 'Vancouver', 'BC', 'V6B 6C1', '12', 'Robson Street', 'robsonhilton@hilton.com', 2234567893, 'Rainforest Radiance Hotel'),
(13, 2, 210, 3, 'Chicago', 'IL', '60616', '13', 'South Michigan Avenue', 'michiganhilton@hilton.com', 2234567894, 'Windy City Welcomes'),
(14, 2, 190, 4, 'New York', 'NY', '10019', '14', '7th Avenue', '7avenuehilton@hilton.com', 2234567895, 'Metropolitan Marvel Hotel'),
(15, 2, 180, 3, 'Montreal', 'QC', 'H3B 4A5', '15', 'René-Lévesque Blvd W', 'renelevesquehilton@hilton.com', 2234567896, 'Quebec Quarters Resort'),
(16, 2, 250, 5, 'Calgary', 'AB', 'T2G 0P5', '16', '4 Avenue SE', '4avehilton@hilton.com', 2234567897, 'Cowtown Kings Hotel'),

(17, 3, 200, 5, 'Chicago', 'IL', '60611', '800', 'Michigan Ave', 'chicagohyatt@hyatt.com', 7776665555, 'Lakeside Luxury Lodge'),
(18, 3, 180, 4, 'Chicago', 'IL', '60654', '633', 'North Saint Clair St', 'chicagohyatt2@hyatt.com', 7776665554, 'Magnificent Mile Manor'),
(19, 3, 150, 3, 'New York', 'NY', '10017', '109', 'East 42nd St', 'nyhyatt@hyatt.com', 7776665553, 'Gotham Grandeur Resort'),
(20, 3, 130, 4, 'Los Angeles', 'CA', '90028', '1750', 'Highland Ave', 'lahyatt@hyatt.com', 7776665552, 'Hollywood Haven Hotel'),
(21, 3, 120, 5, 'Toronto', 'ON', 'M5H 2L2', '370', 'King St W', 'torontohyatt@hyatt.com', 7776665551, 'Crown City Castle'),
(22, 3, 100, 4, 'Toronto', 'ON', 'M5V 3X5', '225', 'Front St W', 'torontohyatt2@hyatt.com', 7776665550, 'Front Street Facade'),
(23, 3, 90, 3, 'Vancouver', 'BC', 'V6C 2R7', '655', 'Burrard St', 'vancouverhyatt@hyatt.com', 7776665549, 'Bayside Bliss Resort'),
(24, 3, 85, 5, 'Montreal', 'QC', 'H3B 1X9', '1255', 'Jeanne-Mance St', 'montrealhyatt@hyatt.com', 7776665548, 'Montreal Majesty Hotel'),

(25, 4, 210, 5, 'Atlanta', 'GA', '30303', '181', 'Peachtree St NE', 'atlantaihg@ihg.com', 6665554445, 'Peachtree Paradise Hotel'),
(26, 4, 190, 4, 'Atlanta', 'GA', '30313', '267', 'Marietta St NW', 'atlantaihg2@ihg.com', 6665554444, 'Marietta Mansion Resort'),
(27, 4, 160, 3, 'Orlando', 'FL', '32819', '9939', 'Universal Blvd', 'orlandoihg@ihg.com', 6665554443, 'Universal Utopia Hotel'),
(28, 4, 140, 5, 'San Francisco', 'CA', '94102', '50', '8th St', 'sanfranciscoihg@ihg.com', 6665554442, 'Golden Gate Getaway'),
(29, 4, 150, 4, 'Toronto', 'ON', 'M5V 1J9', '225', 'Front St W', 'torontoihg@ihg.com', 6665554441, 'Toronto Tower Hotel'),
(30, 4, 130, 3, 'Toronto', 'ON', 'M4V 1P5', '220', 'Bloor St W', 'torontoihg2@ihg.com', 6665554440, 'Bloor Street Boutique'),
(31, 4, 120, 5, 'Vancouver', 'BC', 'V6C 2W6', '300', 'Main St', 'vancouverihg@ihg.com', 6665554439, 'Main Street Manor'),
(32, 4, 110, 4, 'Calgary', 'AB', 'T2P 3T6', '711', '4th St SE', 'calgaryihg@ihg.com', 6665554438, 'Calgary Castle'),

(33, 5, 280, 5, 'Orlando', 'FL', '32819', '33', 'International Drive', 'idrivewyndham@wyndham.com', 5556664441, 'International Icon Hotel'),
(34, 5, 250, 4, 'Orlando', 'FL', '32821', '34', 'World Center Drive', 'worldcenterwyndham@wyndham.com', 5556664442, 'World Wonder Resort'),
(35, 5, 230, 3, 'Toronto', 'ON', 'M5J 1B7', '35', 'Harbour Square', 'harbourwyndham@wyndham.com', 5556664443, 'Harborview Harmony Hotel'),
(36, 5, 220, 5, 'Vancouver', 'BC', 'V6C 2R5', '36', 'West Hastings Street', 'hastingswyndham@wyndham.com', 5556664444, 'Hastings Heritage Hotel'),
(37, 5, 240, 4, 'New York', 'NY', '10006', '37', 'Greenwich Street', 'greenwichwyndham@wyndham.com', 5556664445, 'Greenwich Grand Hotel'),
(38, 5, 260, 3, 'Chicago', 'IL', '60606', '38', 'West Adams Street', 'adamsstwyndham@wyndham.com', 5556664446, 'Adams Apple Hotel'),
(39, 5, 270, 4, 'Montreal', 'QC', 'H2Z 1Z3', '39', 'Jeanne-Mance Street', 'jeannemancewyndham@wyndham.com', 5556664447, 'Jeannes Jewel Hotel'),
(40, 5, 290, 5, 'Calgary', 'AB', 'T2P 3H5', '40', '9 Avenue SW', '9avewyndham@wyndham.com', 5556664448, 'Ninth Nirvana Hotel');


INSERT INTO project.rooms (roomid, hotelid, price, amenities, capacity, view, canextend, problems)
VALUES
-- Hotel 1 Rooms
(1, 1, 100, 'Wi-Fi, TV, Minibar', 'Single', 'City View', FALSE, ''),
(2, 1, 150, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(3, 1, 200, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(4, 1, 250, 'Wi-Fi, TV, Minibar, Balcony', 'Quad', 'Sea View', TRUE, ''),
(5, 1, 300, 'Wi-Fi, TV, Minibar, Balcony, Kitchenette', 'Suite', 'Sea View', TRUE, ''),
-- Repeat for each hotel, incrementing roomid and changing hotelid after every 5 rooms

-- Hotel 2 Rooms
(6, 2, 110, 'Wi-Fi, TV, Minibar', 'Single', 'Garden View', FALSE, ''),
(7, 2, 160, 'Wi-Fi, TV, Minibar', 'Double', 'Garden View', TRUE, ''),
(8, 2, 210, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(9, 2, 260, 'Wi-Fi, TV, Safe, Minibar, Balcony', 'Quad', 'City View', TRUE, ''),
(10, 2, 310, 'Wi-Fi, TV, Safe, Minibar, Balcony, Kitchenette', 'Suite', 'City View', TRUE, ''),
-- Hotel 3 Rooms
(11, 3, 120, 'Wi-Fi, TV, Minibar', 'Single', 'Park View', FALSE, ''),
(12, 3, 170, 'Wi-Fi, TV, Minibar, Safe', 'Double', 'Park View', TRUE, ''),
(13, 3, 220, 'Wi-Fi, TV, Minibar, Safe, Balcony', 'Triple', 'Park View', FALSE, ''),
(14, 3, 270, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(15, 3, 320, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 4 Rooms
(16, 4, 130, 'Wi-Fi, TV, Minibar', 'Single', 'City View', FALSE, ''),
(17, 4, 180, 'Wi-Fi, TV, Minibar, Safe', 'Double', 'City View', TRUE, ''),
(18, 4, 230, 'Wi-Fi, TV, Minibar, Safe, Balcony', 'Triple', 'Garden View', FALSE, ''),
(19, 4, 280, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(20, 4, 330, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 5 Rooms
(21, 5, 140, 'Wi-Fi, TV, Minibar', 'Single', 'Sea View', FALSE, ''),
(22, 5, 190, 'Wi-Fi, TV, Minibar, Safe', 'Double', 'Sea View', TRUE, ''),
(23, 5, 240, 'Wi-Fi, TV, Minibar, Safe, Balcony', 'Triple', 'Sea View', FALSE, ''),
(24, 5, 290, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(25, 5, 340, 'Wi-Fi, TV, Minibar, Safe, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, '');
-- Hotel 6 Rooms
(26, 6, 135, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(27, 6, 185, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(28, 6, 235, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(29, 6, 285, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(30, 6, 335, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 7 Rooms
(31, 7, 145, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(32, 7, 195, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(33, 7, 245, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(34, 7, 295, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(35, 7, 345, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 8 Rooms
(36, 8, 155, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(37, 8, 205, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(38, 8, 255, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(39, 8, 305, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(40, 8, 355, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Continue this pattern for each subsequent hotel...
-- Hotel 9 Rooms
(41, 9, 160, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(42, 9, 210, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(43, 9, 260, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(44, 9, 310, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(45, 9, 360, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 10 Rooms
(46, 10, 165, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(47, 10, 215, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(48, 10, 265, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(49, 10, 315, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(50, 10, 365, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 11 Rooms
(51, 11, 170, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(52, 11, 220, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(53, 11, 270, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(54, 11, 320, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(55, 11, 370, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 12 Rooms
(56, 12, 175, 'Wi-Fi, TV', 'Single', 'Garden View', FALSE, ''),
(57, 12, 225, 'Wi-Fi, TV, Minibar', 'Double', 'Garden View', TRUE, ''),
(58, 12, 275, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Garden View', FALSE, ''),
(59, 12, 325, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(60, 12, 375, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 13 Rooms
(61, 13, 180, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(62, 13, 230, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(63, 13, 280, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(64, 13, 330, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(65, 13, 380, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, ''),

-- Hotel 14 Rooms
(66, 14, 185, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(67, 14, 235, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(68, 14, 285, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(69, 14, 335, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(70, 14, 385, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, '');
-- Hotel 15 Rooms
(71, 15, 190, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(72, 15, 240, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(73, 15, 290, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(74, 15, 340, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(75, 15, 390, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 16 Rooms
(76, 16, 195, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(77, 16, 245, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(78, 16, 295, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(79, 16, 345, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(80, 16, 395, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, ''),

-- Hotel 17 Rooms
(81, 17, 200, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(82, 17, 250, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(83, 17, 300, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(84, 17, 350, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(85, 17, 400, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 18 Rooms
(86, 18, 205, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(87, 18, 255, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(88, 18, 305, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(89, 18, 355, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(90, 18, 405, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 19 Rooms
(91, 19, 210, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(92, 19, 260, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(93, 19, 310, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(94, 19, 360, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(95, 19, 410, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 20 Rooms
(96, 20, 215, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(97, 20, 265, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(98, 20, 315, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(99, 20, 365, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(100, 20, 415, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, '');
-- Hotel 21 Rooms
(101, 21, 220, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(102, 21, 270, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(103, 21, 320, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(104, 21, 370, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(105, 21, 420, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 22 Rooms
(106, 22, 225, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(107, 22, 275, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(108, 22, 325, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(109, 22, 375, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(110, 22, 425, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, ''),

-- Hotel 23 Rooms
(111, 23, 230, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(112, 23, 280, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(113, 23, 330, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(114, 23, 380, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(115, 23, 430, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 24 Rooms
(116, 24, 235, 'Wi-Fi, TV', 'Single', 'Garden View', FALSE, ''),
(117, 24, 285, 'Wi-Fi, TV, Minibar', 'Double', 'Garden View', TRUE, ''),
(118, 24, 335, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Garden View', FALSE, ''),
(119, 24, 385, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(120, 24, 435, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 25 Rooms
(121, 25, 240, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(122, 25, 290, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(123, 25, 340, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(124, 25, 390, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(125, 25, 440, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, ''),

-- Hotel 26 Rooms
(126, 26, 245, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(127, 26, 295, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(128, 26, 345, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(129, 26, 395, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Mountain View', TRUE, ''),
(130, 26, 445, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Mountain View', TRUE, '');
-- Hotel 27 Rooms
(131, 27, 250, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(132, 27, 300, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(133, 27, 350, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(134, 27, 400, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(135, 27, 450, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 28 Rooms
(136, 28, 255, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(137, 28, 305, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(138, 28, 355, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(139, 28, 405, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(140, 28, 455, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, ''),

-- Hotel 29 Rooms
(141, 29, 260, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(142, 29, 310, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(143, 29, 360, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(144, 29, 410, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(145, 29, 460, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 30 Rooms
(146, 30, 265, 'Wi-Fi, TV', 'Single', 'Garden View', FALSE, ''),
(147, 30, 315, 'Wi-Fi, TV, Minibar', 'Double', 'Garden View', TRUE, ''),
(148, 30, 365, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Garden View', FALSE, ''),
(149, 30, 415, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(150, 30, 465, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 31 Rooms
(151, 31, 270, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(152, 31, 320, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(153, 31, 370, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(154, 31, 420, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(155, 31, 470, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, ''),

-- Hotel 32 Rooms
(156, 32, 275, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(157, 32, 325, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(158, 32, 375, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(159, 32, 425, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(160, 32, 475, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 33 Rooms
(161, 33, 280, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(162, 33, 330, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(163, 33, 380, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(164, 33, 430, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(165, 33, 480, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, ''),

-- Hotel 34 Rooms
(166, 34, 285, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(167, 34, 335, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(168, 34, 385, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(169, 34, 435, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Garden View', TRUE, ''),
(170, 34, 485, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Garden View', TRUE, ''),

-- Hotel 35 Rooms
(171, 35, 290, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(172, 35, 340, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(173, 35, 390, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(174, 35, 440, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(175, 35, 490, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, '');
-- Hotel 36 Rooms
(176, 36, 295, 'Wi-Fi, TV', 'Single', 'Garden View', FALSE, ''),
(177, 36, 345, 'Wi-Fi, TV, Minibar', 'Double', 'Garden View', TRUE, ''),
(178, 36, 395, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Garden View', FALSE, ''),
(179, 36, 445, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Park View', TRUE, ''),
(180, 36, 495, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Park View', TRUE, ''),

-- Hotel 37 Rooms
(181, 37, 300, 'Wi-Fi, TV', 'Single', 'City View', FALSE, ''),
(182, 37, 350, 'Wi-Fi, TV, Minibar', 'Double', 'City View', TRUE, ''),
(183, 37, 400, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'City View', FALSE, ''),
(184, 37, 450, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(185, 37, 500, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, ''),

-- Hotel 38 Rooms
(186, 38, 305, 'Wi-Fi, TV', 'Single', 'Sea View', FALSE, ''),
(187, 38, 355, 'Wi-Fi, TV, Minibar', 'Double', 'Sea View', TRUE, ''),
(188, 38, 405, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Sea View', FALSE, ''),
(189, 38, 455, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Mountain View', TRUE, ''),
(190, 38, 505, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Mountain View', TRUE, '');
-- Hotel 39 Rooms
(191, 39, 310, 'Wi-Fi, TV', 'Single', 'Park View', FALSE, ''),
(192, 39, 360, 'Wi-Fi, TV, Minibar', 'Double', 'Park View', TRUE, ''),
(193, 39, 410, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Park View', FALSE, ''),
(194, 39, 460, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'City View', TRUE, ''),
(195, 39, 510, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'City View', TRUE, ''),

-- Hotel 40 Rooms
(196, 40, 315, 'Wi-Fi, TV', 'Single', 'Mountain View', FALSE, ''),
(197, 40, 365, 'Wi-Fi, TV, Minibar', 'Double', 'Mountain View', TRUE, ''),
(198, 40, 415, 'Wi-Fi, TV, Minibar, Balcony', 'Triple', 'Mountain View', FALSE, ''),
(199, 40, 465, 'Wi-Fi, TV, Minibar, Balcony, Desk', 'Quad', 'Sea View', TRUE, ''),
(200, 40, 515, 'Wi-Fi, TV, Minibar, Balcony, Desk, Kitchenette', 'Suite', 'Sea View', TRUE, '');


SET search_path = project;

-- SELECT * FROM hotels WHERE city = 'New York';
SELECT * FROM hotels WHERE city = 'New York';

-- Count the number of rooms available in a specific hotelid:
-- SELECT COUNT(*) FROM rooms WHERE hotelid = 1 AND is_available = TRUE;

SELECT COUNT(*)
FROM rooms
WHERE hotel_id = 1 -- or any specific hotel_id
AND room_id NOT IN (
    SELECT room_id
    FROM bookings
    WHERE start_date <= 'requested_end_date'
    AND end_date >= 'requested_start_date'
);

-- List hotels and their room counts based on startdate, enddate and city (Aggregation):
-- SELECT hotelid, COUNT(roomid) AS total_rooms FROM rooms GROUP BY hotelid;

SELECT h.hotelid, COUNT(r.roomid) AS available_rooms
FROM hotels h
LEFT JOIN rooms r ON h.hotelid = r.hotelid
AND r.roomid NOT IN (
    SELECT b.roomid
    FROM bookings_rentings b
    WHERE b.startdate <= 'requested_end_date'
    AND b.enddate >= 'requested_start_date'
)
WHERE h.city = 'requested_city'

GROUP BY h.hotelid;


-- List hotels based on availability
-- SELECT hotelid, COUNT(roomid) AS total_rooms FROM rooms WHERE is_available = TRUE GROUP BY hotelid;

-- List rooms based on current selected hotel
SELECT rooms.*
FROM rooms
WHERE hotelid = 1 -- or any specific hotel_id
AND roomid NOT IN (
    SELECT roomid
    FROM bookings_rentings
    WHERE startdate <= 'requested_end_date'
    AND enddate >= 'requested_start_date'
);

-- List rooms based on availability
-- SELECT rooms.*
-- FROM rooms
-- WHERE rooms.roomid NOT IN (
--     SELECT bookings_rentings.roomid
--     FROM bookings_rentings
--     WHERE bookings_rentings.startdate <= 'requested_end_date' AND bookings_rentings.enddate >= 'requested_start_date'
-- )
-- AND rooms.hotelid IN (
--     SELECT hotelid FROM hotels WHERE city = 'requested_city'
-- );


-- Update customer info

-- Update employee info

-- Update hotel info

-- Update rooms info

-- Update Booking/Renting

-- Insert New Renting

-- Trigger to make room not available after new Booking/Renting
-- CREATE TRIGGER booked AFTER INSERT INTO Booking_Renting 

-- EXECUTE booked()

-- Archive booking before deletion
INSERT INTO archived_bookings_rentings (bookingid, roomid, customerid, startdate, enddate, ...)
SELECT bookingid, roomid, customerid, startdate, enddate, ...
FROM bookings_rentings
WHERE bookingid = $1; -- Assuming $1 is the booking ID to be deleted

-- Trigger to automatically archive booking
CREATE OR REPLACE FUNCTION archive_booking() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO archived_bookings_rentings SELECT * FROM bookings_rentings WHERE bookingid = OLD.bookingid;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_archive_booking
BEFORE DELETE ON bookings_rentings
FOR EACH ROW EXECUTE FUNCTION archive_booking();


-- Trigger to update room counts when new room added to hotel 
CREATE OR REPLACE FUNCTION update_room_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hotels SET noofrooms = noofrooms + 1 WHERE hotelid = NEW.hotelid;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_room_added
AFTER INSERT ON rooms
FOR EACH ROW EXECUTE FUNCTION update_room_count();


-- Trigger to decrease room count when room deleted from hotel
CREATE OR REPLACE FUNCTION decrease_room_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hotels SET noofrooms = noofrooms - 1 WHERE hotelid = OLD.hotelid;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_room_deleted
AFTER DELETE ON rooms
FOR EACH ROW EXECUTE FUNCTION decrease_room_count();



-- View to view available rooms per area (Wrong)
-- CREATE VIEW view_available_rooms_per_area AS
-- SELECT h.city, COUNT(r.roomid) AS available_rooms
-- FROM hotels h
-- JOIN rooms r ON h.hotelid = h.hotelid
-- WHERE r.is_available = TRUE
-- GROUP BY h.city;



-- View to view available rooms per area per day
CREATE MATERIALIZED VIEW view_daily_room_availability AS
SELECT h.city, COUNT(r.roomid) AS available_rooms, CURRENT_DATE AS for_date
FROM hotels h
JOIN rooms r ON h.hotelid = r.hotelid
WHERE r.roomid NOT IN (
    SELECT b.roomid
    FROM bookings_rentings b
    WHERE CURRENT_DATE BETWEEN b.startdate AND b.enddate
)
GROUP BY h.city;

-- Refresh View everyday
REFRESH MATERIALIZED VIEW view_daily_room_availability;
