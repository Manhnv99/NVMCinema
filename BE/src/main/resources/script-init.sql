INSERT INTO area (id,code,created_at,deleted,name) VALUES
	 ('e3d23466-e107-4480-8137-3fde64a17bd4','HN','2026-04-13 00:00:00',1,'Hà Nội');

INSERT INTO branch (id,address,code,created_at,deleted,email,hostline,image_id,image_url,name,area_id) VALUES
	 ('e3d23466-e107-4480-8137-3fde64a17bd4','Melinh Plaza Hà Đông','LTT','2026-04-13 00:00:00',1,'manhnv99.dev@gmail.com','0343144320','doc5imyiy0ofu5jarhn0','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090292/doc5imyiy0ofu5jarhn0.jpg','Mê Linh Hà Đông','e3d23466-e107-4480-8137-3fde64a17bd4');

INSERT INTO room (id,code,created_at,deleted,name,branch_id) VALUES
    ('294e5211-f216-47c6-80b9-fbf7b985dde7','ROOM1','2026-04-13 21:25:45.346000',1,'VIP1','e3d23466-e107-4480-8137-3fde64a17bd4');

INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('024f1625-ed35-4046-8314-0ac0646ab794','CHAIR29','2026-04-13 21:25:45.541000',1,10,'C9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('02d55641-4428-4048-9f63-cc600f0c1737','CHAIR71','2026-04-13 21:25:45.776000',1,10,'H1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('04ced848-db0a-46f1-8d5d-87259a43506e','CHAIR45','2026-04-13 21:25:45.630000',1,10,'E5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('06ba753c-6261-4ed9-90cb-9e63c4e9d65b','CHAIR2','2026-04-13 21:25:45.370000',1,10,'A2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('08216cd8-b4d3-44c9-99e7-2c5c6cf8dfb0','CHAIR3','2026-04-13 21:25:45.378000',1,10,'A3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('09c9ced9-9b6a-4f68-bc9f-78cc98a98a75','CHAIR80','2026-04-13 21:25:45.821000',1,10,'H10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('0a1f8e65-27c4-4a89-a966-b70df30a7742','CHAIR78','2026-04-13 21:25:45.812000',1,10,'H8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('0a75dc04-0d11-424d-82ef-727b74243152','CHAIR9','2026-04-13 21:25:45.418000',1,10,'A9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('0ef24df4-466c-4973-ad49-41f16e0ea84c','CHAIR10','2026-04-13 21:25:45.425000',1,10,'A10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('12c35eb8-7039-4703-9fab-eb30e280a247','CHAIR23','2026-04-13 21:25:45.506000',1,10,'C3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('136dd510-c5cb-4794-90f0-d4bef22f6abc','CHAIR11','2026-04-13 21:25:45.430000',1,10,'B1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('14df57cd-62d2-4c3c-94d9-48be12c6a148','CHAIR73','2026-04-13 21:25:45.788000',1,10,'H3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('15b60807-8851-47ba-a1bc-93c6f73789af','CHAIR43','2026-04-13 21:25:45.620000',1,10,'E3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('19d2dd44-0095-47b2-b329-5ad0012fce42','CHAIR52','2026-04-13 21:25:45.672000',1,10,'F2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('1d384fb9-18c5-4c72-bf4f-d79f11d35ac9','CHAIR32','2026-04-13 21:25:45.556000',1,10,'D2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('1e9a8291-4707-4cb2-a130-425c55183590','CHAIR6','2026-04-13 21:25:45.398000',1,10,'A6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('1f9e8b3e-c934-41fb-b995-cfd4ce565c47','CHAIR53','2026-04-13 21:25:45.679000',1,10,'F3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('2f0bce67-9a88-444d-9d89-99edfa22c115','CHAIR7','2026-04-13 21:25:45.404000',1,10,'A7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('3417be2b-53e6-45a2-9dd4-f6c727839bb0','CHAIR34','2026-04-13 21:25:45.568000',1,10,'D4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('35eb0ca4-49dc-4dfc-8f85-263dda0e57b5','CHAIR33','2026-04-13 21:25:45.562000',1,10,'D3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('38bdc45d-67ca-4adf-bc1b-0f47246449bf','CHAIR55','2026-04-13 21:25:45.690000',1,10,'F5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('3bc26c93-a996-4cfc-8054-c5192ea20857','CHAIR65','2026-04-13 21:25:45.742000',1,10,'G5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('3d407022-38e1-45b8-b9e6-c010ba6f3ad4','CHAIR19','2026-04-13 21:25:45.481000',1,10,'B9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('424a76bc-ffa9-4fcc-9356-d65568fe7c98','CHAIR50','2026-04-13 21:25:45.658000',1,10,'E10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('44f4ecf7-a6df-4fbc-8eb7-3af6f5e088d0','CHAIR75','2026-04-13 21:25:45.798000',1,10,'H5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('462bf1a6-0bd7-45d3-b70e-3c3dd3850ffd','CHAIR61','2026-04-13 21:25:45.722000',1,10,'G1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('47570a3f-9660-4be8-87a0-40b7b1f064d1','CHAIR38','2026-04-13 21:25:45.593000',1,10,'D8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('4aa6b794-cc22-45fe-b1a4-6d02cd6ee0d2','CHAIR56','2026-04-13 21:25:45.696000',1,10,'F6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('533385dc-4abc-4358-99ac-240e016eecbb','CHAIR79','2026-04-13 21:25:45.816000',1,10,'H9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('556dbc2d-8696-45df-a769-9e2b6235c533','CHAIR41','2026-04-13 21:25:45.610000',1,10,'E1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('560d2e38-16fd-418a-a4e1-298381c65ae6','CHAIR15','2026-04-13 21:25:45.456000',1,10,'B5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('620b31fd-71d4-4312-bdb7-04c13b068b7b','CHAIR51','2026-04-13 21:25:45.666000',1,10,'F1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('64af8116-3314-4124-a4d5-d1dc95c438df','CHAIR30','2026-04-13 21:25:45.546000',1,10,'C10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('667a3d2f-7f50-4927-9f02-474ff4714f5b','CHAIR18','2026-04-13 21:25:45.475000',1,10,'B8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('697ebb1b-8073-4f1c-becb-7e0152049d9f','CHAIR5','2026-04-13 21:25:45.391000',1,10,'A5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('6c7a0b20-b51d-476c-8906-d522f78a5f50','CHAIR66','2026-04-13 21:25:45.748000',1,10,'G6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('72b2718f-15cf-42ce-9e15-2cd7756e38a3','CHAIR47','2026-04-13 21:25:45.641000',1,10,'E7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('79c400d9-7b92-4a77-b111-0b5a0e984c22','CHAIR44','2026-04-13 21:25:45.625000',1,10,'E4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('79f8186b-af57-4ada-8cd8-22add9c3709a','CHAIR1','2026-04-13 21:25:45.361000',1,10,'A1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('7cf04ab8-b234-4acb-aa59-084da0c18d3b','CHAIR4','2026-04-13 21:25:45.384000',1,10,'A4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('801f0c0a-20c0-4301-9850-68d8345c8cff','CHAIR72','2026-04-13 21:25:45.782000',1,10,'H2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('834120da-a146-44f2-bd9b-81706087a761','CHAIR17','2026-04-13 21:25:45.468000',1,10,'B7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('86b1ac88-6d0a-429b-b049-52fab97b238c','CHAIR74','2026-04-13 21:25:45.793000',1,10,'H4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('88c25b49-dacd-47d9-a1c5-09de262217f7','CHAIR12','2026-04-13 21:25:45.437000',1,10,'B2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('895c2a3f-8368-4296-9e65-7c4ab0154201','CHAIR70','2026-04-13 21:25:45.770000',1,10,'G10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('94eae90e-f1f5-4b2c-af93-601d0f424b25','CHAIR62','2026-04-13 21:25:45.727000',1,10,'G2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('95c9660d-a93e-4b07-ab49-c3b3eaaedee2','CHAIR39','2026-04-13 21:25:45.598000',1,10,'D9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('966b53c2-4158-46ff-8f8a-5efc58e4084f','CHAIR26','2026-04-13 21:25:45.524000',1,10,'C6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('9b4cac4b-8bb3-4434-bf5a-cf5bec25e96e','CHAIR28','2026-04-13 21:25:45.534000',1,10,'C8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('a59e563b-9928-42fd-9c5e-c3f88f741397','CHAIR48','2026-04-13 21:25:45.647000',1,10,'E8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('a93e7a48-6f20-4cc5-a325-1a1e99804b6f','CHAIR37','2026-04-13 21:25:45.588000',1,10,'D7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('ac6bf16e-a640-430c-8542-eb48f9cab9c5','CHAIR60','2026-04-13 21:25:45.717000',1,10,'F10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('adce9c63-015f-468c-bfdb-8b6056bc1344','CHAIR24','2026-04-13 21:25:45.512000',1,10,'C4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('b2522f86-c3f8-44a7-88e9-89058b1fb078','CHAIR35','2026-04-13 21:25:45.573000',1,10,'D5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('b6ac3427-ba04-463e-9c01-10fe00270de2','CHAIR58','2026-04-13 21:25:45.707000',1,10,'F8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('b6e878b9-f907-496e-8b66-7378e1fb9659','CHAIR76','2026-04-13 21:25:45.802000',1,10,'H6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('bb3c36f7-a0a9-44cb-af18-d0cfc548035d','CHAIR63','2026-04-13 21:25:45.732000',1,10,'G3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('bcfb5bdb-cd2b-495f-9860-8592c2e642df','CHAIR49','2026-04-13 21:25:45.653000',1,10,'E9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('be4b3969-4b8a-417e-9d78-ef7f84efbdbe','CHAIR46','2026-04-13 21:25:45.636000',1,10,'E6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('c201f130-ebec-42fa-a823-f85ea293d5de','CHAIR14','2026-04-13 21:25:45.450000',1,10,'B4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('c5accf50-bbc8-4d0e-b939-1108956dba05','CHAIR8','2026-04-13 21:25:45.411000',1,10,'A8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('c67efd5d-9dce-4af0-98c5-e3431c003e00','CHAIR54','2026-04-13 21:25:45.685000',1,10,'F4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('c9dcbfa9-9fd1-4ff7-99c4-340f0e7f4abd','CHAIR69','2026-04-13 21:25:45.765000',1,10,'G9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('d9ddba06-1f16-43b1-bab1-3cada61ee1ab','CHAIR22','2026-04-13 21:25:45.500000',1,10,'C2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('db8cab30-9236-46d5-bc6d-0873948fdd3e','CHAIR25','2026-04-13 21:25:45.518000',1,10,'C5',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('de7386de-b5af-4ec6-93c6-5adbbe9405a9','CHAIR27','2026-04-13 21:25:45.529000',1,10,'C7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('dec4479d-bdb9-4323-a9c0-a7c7c9aa4ee7','CHAIR16','2026-04-13 21:25:45.462000',1,10,'B6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('e0a6adda-a569-4762-8a8b-2f6649028af4','CHAIR20','2026-04-13 21:25:45.488000',1,10,'B10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('e19a72d5-2e8e-4051-8d09-763648dd9ee5','CHAIR42','2026-04-13 21:25:45.615000',1,10,'E2',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('e675ea7d-eb1d-4240-855b-4e43a673a28d','CHAIR36','2026-04-13 21:25:45.581000',1,10,'D6',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO chair (id,code,created_at,deleted,max_row,name,status,room_id) VALUES
	 ('ea9bec9b-8ca0-48d9-a1b7-ee24da3e069b','CHAIR59','2026-04-13 21:25:45.712000',1,10,'F9',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('efedd265-64b4-4fea-9ef6-5cff2d7ef8f8','CHAIR21','2026-04-13 21:25:45.494000',1,10,'C1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('f03cf43c-eede-4217-82e3-c77af84347b4','CHAIR77','2026-04-13 21:25:45.807000',1,10,'H7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('f0ac259d-cbf6-4826-8fae-f10203543af9','CHAIR13','2026-04-13 21:25:45.444000',1,10,'B3',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('f66385e1-cefc-46e4-908f-c0ef1e6c8efb','CHAIR57','2026-04-13 21:25:45.702000',1,10,'F7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('f7c1e095-b6ff-471f-861d-8e8eaf11a687','CHAIR64','2026-04-13 21:25:45.737000',1,10,'G4',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('f882a804-9c96-45bd-adb5-efdf4671225a','CHAIR67','2026-04-13 21:25:45.753000',1,10,'G7',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('fa02529b-8fba-4ce7-835c-c4c9e3ce7497','CHAIR40','2026-04-13 21:25:45.605000',1,10,'D10',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('ff5dd5b5-4445-4a54-9a7b-c5849e3008e4','CHAIR68','2026-04-13 21:25:45.759000',1,10,'G8',1,'294e5211-f216-47c6-80b9-fbf7b985dde7'),
	 ('ff7e7e38-32d2-4d90-adb3-6025cae68936','CHAIR31','2026-04-13 21:25:45.551000',1,10,'D1',1,'294e5211-f216-47c6-80b9-fbf7b985dde7');


INSERT INTO client (id,address_detail,birthday,code,created_at,deleted,email,image_id,image_url,name,password,phone_number,province,`role`) VALUES
	 ('87ccd4a6-445b-4256-a09c-fb8f42e40b7c',NULL,NULL,'CL1','2026-04-13 21:03:23.062000',1,'manhnv99.dev@gmail.com',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLK4DcGt6nztT_f4STcrBf7U5OneEi6s0NMKLxyREHN0s_MUJ4=s96-c','Nguyễn Vĩ Mạnh',NULL,NULL,NULL,'ROLE_CLIENT');
INSERT INTO combo_food (id,code,created_at,deleted,image_id,image_url,name,price) VALUES
	 ('153b87bf-1f1c-47bb-9b7c-e411575ef3ea','CB1','2026-04-13 21:34:19.091000',1,'noovlnwilbrngntqt8ui','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090858/noovlnwilbrngntqt8ui.jpg','Combo Bỏng Nước',70000.00),
	 ('e59cd55d-c1ff-46f1-8368-d93227bd625f','CB2','2026-04-13 21:35:19.201000',1,'drmfypbllzqyaqnqhou1','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090918/drmfypbllzqyaqnqhou1.jpg','Combo Bỏng Coca',100000.00);

INSERT INTO country (id,code,created_at,deleted,name) VALUES
	 ('b4825cfc-cad6-4384-a3e6-693ee261a68f','CT1','2026-04-13 21:27:45.143000',1,'Việt Nam');
INSERT INTO director (id,age,code,created_at,deleted,description,gender,name) VALUES
	 ('b10b66b6-6e76-4e05-982b-168dd96946ff',30,'DR1','2026-04-13 21:27:05.287000',1,'ABC',1,'Trấn Thành');
INSERT INTO format (id,code,created_at,deleted,name) VALUES
	 ('e59107a4-6f49-4848-be0f-9cfa7d0e1a3f','FM1','2026-04-13 21:27:52.675000',1,'Full HD');
INSERT INTO genre (id,code,created_at,deleted,name) VALUES
	 ('5c209878-c95f-4109-9381-6044e80fadbe','GR1','2026-04-13 21:27:29.364000',1,'Kinh Dị');
INSERT INTO movie (id,actor,age_restriction,banner_id,banner_url,code,created_at,deleted,description,duration,name,release_date,subtitle,video_path,country_id,director_id,format_id,genre_id) VALUES
	 ('8124b8c6-5ca1-42e1-987f-72ee6dc38dac','Trấn Thành',18,'nlmmfodtgacc4obaocwb','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090609/nlmmfodtgacc4obaocwb.jpg','MV1','2026-04-13 21:30:10.159000',1,'Kinh Dị',120,'Án Mạng Lầu 4','2026-04-13','Phụ Đề','https://www.youtube.com/embed/agzckaoLRaY?si=Y4WMz3QX7cK7ylDm','b4825cfc-cad6-4384-a3e6-693ee261a68f','b10b66b6-6e76-4e05-982b-168dd96946ff','e59107a4-6f49-4848-be0f-9cfa7d0e1a3f','5c209878-c95f-4109-9381-6044e80fadbe');
INSERT INTO promotion_event (id,code,created_at,date_end,date_start,description,image_id,image_url,name,promotion_code,status,promotion_price) VALUES
	 ('a5379a79-6afb-46ea-9b1c-191254f7b2a3','PE1','2026-04-13 21:33:14.616000','2026-04-30','2026-04-13','abc','wtfmrzdxqq0svhp6zr9o','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090793/wtfmrzdxqq0svhp6zr9o.png','Khuyến Mãi 1','PE1','DANG_DIEN_RA',20000.00),
	 ('cefab9ba-03d8-44c0-8260-d75ca80d6dcc','PE2','2026-04-13 21:33:48.165000','2026-04-30','2026-04-13','abc','jb3nouiso4nw3xgmd4l3','http://res.cloudinary.com/dbxajsljz/image/upload/v1776090827/jb3nouiso4nw3xgmd4l3.png','Khuyến Mãi 2','PE2','DANG_DIEN_RA',20000.00);
INSERT INTO showtime (id,created_at,deleted,screening_date,ticket_price,time_start,movie_id,room_id) VALUES
	 ('5254701e-fe4c-475c-9ef9-6a0cd9966e48','2026-04-13 21:31:14.337000',1,'2026-04-30',100000.00,'11:30:00.000000','8124b8c6-5ca1-42e1-987f-72ee6dc38dac','294e5211-f216-47c6-80b9-fbf7b985dde7');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('01917d8f-4bbb-4b07-b013-5952ed0e0d61','E3','2026-04-13 21:31:14.552000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('03201e35-4ef3-4333-9042-4dd295759f72','A1','2026-04-13 21:31:14.347000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('0396ffc5-92d5-42ff-aa1f-1b08703f1d3a','E8','2026-04-13 21:31:14.574000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('05925e6c-f2fc-498c-8d21-88b774beb194','C8','2026-04-13 21:31:14.484000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('06a18735-1569-4208-9b9d-952e84b82b8a','B3','2026-04-13 21:31:14.409000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('0a7aa121-cc7c-417b-a03d-26381cc517ad','D5','2026-04-13 21:31:14.515000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('12db2b33-c3a8-47a1-9796-b896b38c2d57','C2','2026-04-13 21:31:14.455000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('135038fa-484a-4873-9f18-9b4e5b5669ee','C6','2026-04-13 21:31:14.474000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('1470b03d-1bc6-4473-8430-1e8121176798','G7','2026-04-13 21:31:14.664000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('1a5fc678-b1c6-4ba4-9b74-efad9bc42a3d','H4','2026-04-13 21:31:14.695000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('1bc11bf3-deeb-4b25-87e8-979f9ba2bd97','E6','2026-04-13 21:31:14.565000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('1ce8beb6-010a-4647-8227-f4f8535a262b','C1','2026-04-13 21:31:14.449000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('22399af6-4415-4fd1-b206-2b66638736ac','H8','2026-04-13 21:31:14.714000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('2323470f-6717-4d50-873d-be2ade6b6689','D8','2026-04-13 21:31:14.529000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('315e09ef-2372-4776-b904-5926c349312c','A10','2026-04-13 21:31:14.396000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('3198b8e4-09b3-4a25-85a7-fb5ca906b887','B2','2026-04-13 21:31:14.405000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('36863057-89ba-4314-b777-72d4995ff09a','A5','2026-04-13 21:31:14.368000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('399f2287-0bc3-44c6-8ed2-e455185cdaa2','E7','2026-04-13 21:31:14.569000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('3dc4d088-2788-42a5-9ac2-9894a0d6a10a','D7','2026-04-13 21:31:14.524000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('3e473c5f-4d5d-49f9-ae49-a73af0be0073','C3','2026-04-13 21:31:14.459000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('428afa9d-f53d-41a2-914c-3409f176f29b','G6','2026-04-13 21:31:14.660000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('4b66c41a-4876-4bbb-b201-7824a912f351','D2','2026-04-13 21:31:14.501000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('4fd52b62-57ca-400e-b2b6-9b81bf6b944d','G5','2026-04-13 21:31:14.655000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('53f3a0e1-ae72-4982-8675-dac0099b8071','D4','2026-04-13 21:31:14.510000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('56837180-b26d-48cf-84ba-ccf01991eac4','E10','2026-04-13 21:31:14.584000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('5acaadc1-473d-4157-b31f-ab293fbb8c33','A7','2026-04-13 21:31:14.378000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('5c2208c6-e864-4819-8ed8-a854c18b2b86','B5','2026-04-13 21:31:14.418000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('5e9d7f7a-7562-4353-8f9b-313fd15c343f','H9','2026-04-13 21:31:14.718000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('61159aa7-ae38-484a-a65b-73f62abfe9ba','G9','2026-04-13 21:31:14.673000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('6d791cfe-da2a-4391-8c08-c1c62532dee2','C9','2026-04-13 21:31:14.488000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('7291b716-4179-45e8-8f49-f1a84113899e','H5','2026-04-13 21:31:14.700000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('755cb9ff-4991-4dbe-9483-213ff36a08c6','A9','2026-04-13 21:31:14.390000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('774b95b3-f77b-42dd-8dcd-960b90b08d97','C7','2026-04-13 21:31:14.480000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('78cf2b05-1283-4b6f-ad82-645f4a46f5f4','C5','2026-04-13 21:31:14.469000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('78f22679-8bd6-4942-9be6-d0d3042fc383','D9','2026-04-13 21:31:14.534000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('7d5fd5fd-2d08-402e-adc1-6d8c2aa00f7f','A6','2026-04-13 21:31:14.373000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('7fea2789-7d4b-4299-98e3-66c2541e9361','A3','2026-04-13 21:31:14.359000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('80725561-dfb4-40d2-bc3e-9f0f2c53d70a','D3','2026-04-13 21:31:14.506000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('865b5ce5-967d-4a23-8060-fabc6f0ce515','B7','2026-04-13 21:31:14.431000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('86625c7f-041f-45e4-a653-81ba61bde503','A4','2026-04-13 21:31:14.363000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('8b6ede55-f96e-4a3b-a4fa-840e403aa1a1','E5','2026-04-13 21:31:14.561000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('8e2dab19-7951-4a3e-b91e-ad06e27e62b7','F4','2026-04-13 21:31:14.602000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('93f38bb7-1053-4a03-adbb-e146b52b74ae','G10','2026-04-13 21:31:14.678000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('94664e10-a8f1-4ca6-930d-25c21d3dac08','A2','2026-04-13 21:31:14.353000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('94962da6-68b1-4bf6-8455-0a1d4ae206c0','C4','2026-04-13 21:31:14.464000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('98a2e4b3-a8a8-4b9c-8d21-701101dbcd90','B4','2026-04-13 21:31:14.414000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('9c06dee0-712d-4269-b16e-72681c9caf45','G2','2026-04-13 21:31:14.641000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('9c15e648-1fad-44c3-9ceb-7348b965fc66','E4','2026-04-13 21:31:14.556000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('9f9cccb2-22fc-488c-8403-129b11cf96eb','F7','2026-04-13 21:31:14.619000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('9fccba7b-e75b-4780-9e99-b4b4c2e96941','H7','2026-04-13 21:31:14.709000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('9ff0da1a-c21c-4626-9ed6-884346339abd','D6','2026-04-13 21:31:14.519000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('a20e85c3-863d-437c-809a-8c1bd53fd176','B9','2026-04-13 21:31:14.439000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('a9d70442-4120-4d1c-b760-151f881a2e5f','G4','2026-04-13 21:31:14.651000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('ab17f036-4d32-49da-b44c-21b0e367f8bf','F10','2026-04-13 21:31:14.633000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('b3ad4dbc-2867-4fd5-9cf3-1baddabedae6','G8','2026-04-13 21:31:14.669000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('b9484299-12fd-49c6-8054-8d28b20b6d23','H3','2026-04-13 21:31:14.691000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('b962b556-91bf-42fa-8d6d-e453c78ade0f','H10','2026-04-13 21:31:14.722000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('bc35014b-631f-4c53-a0aa-5511e5e7d04e','H2','2026-04-13 21:31:14.686000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('bd3dc5fd-512c-4879-96c3-865a0ad546b8','F2','2026-04-13 21:31:14.594000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('bfd02cee-fe17-497b-b626-62fad8c95e74','B8','2026-04-13 21:31:14.435000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('c262937b-0ace-4295-97ba-7474c04b9fe4','E2','2026-04-13 21:31:14.547000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('cc7076ea-8156-47e8-b737-d813eec345ab','F8','2026-04-13 21:31:14.624000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('cda368eb-31d8-438b-bb76-5ec40a232a03','E9','2026-04-13 21:31:14.579000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('cf3a1304-e17d-43a5-9bee-a4759345ac98','G3','2026-04-13 21:31:14.646000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('d01127cf-b9c7-4414-b855-348d3b0f30f9','H6','2026-04-13 21:31:14.704000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('d04c6d3d-2400-4813-9d02-416697d6af4c','B10','2026-04-13 21:31:14.444000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('d1dce7d5-c292-4c9e-a882-ee0a592c56e0','F5','2026-04-13 21:31:14.607000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('d37ebb38-8d40-4de7-bf6f-2c21562f15d1','E1','2026-04-13 21:31:14.543000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('d9917e68-e8ec-4f73-831b-696c17f42094','C10','2026-04-13 21:31:14.493000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('e62fa8a8-94e8-4b44-9283-eb1ebba98e20','F6','2026-04-13 21:31:14.613000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO ticket_chair (id,chair_name,created_at,status,show_time_id) VALUES
	 ('e667a8f4-fdcb-4e7a-a2e5-e678a7fb6721','B6','2026-04-13 21:31:14.426000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('ea598d67-b27a-48f7-890c-cfc6169ce28f','D10','2026-04-13 21:31:14.538000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('eefeee5a-832d-4cbf-b91a-d3884967680f','D1','2026-04-13 21:31:14.497000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f2177673-af1d-456e-8c76-e3976ecb2347','G1','2026-04-13 21:31:14.637000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f2694d2e-68a2-4fab-a731-2585724930d1','F9','2026-04-13 21:31:14.628000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f300ed47-f60c-4f4d-a8e0-813c36d64d31','F1','2026-04-13 21:31:14.589000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f6fa6835-409b-4b83-ab4b-8fca9f4a7f68','H1','2026-04-13 21:31:14.682000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f92e4211-c715-4aed-b1b3-58c07843f123','F3','2026-04-13 21:31:14.597000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('f95c3960-2398-4470-aac6-4c6424a74702','B1','2026-04-13 21:31:14.401000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48'),
	 ('ff2fe27c-d06e-458d-b84b-5d4d19d1f6dc','A8','2026-04-13 21:31:14.382000',0,'5254701e-fe4c-475c-9ef9-6a0cd9966e48');
INSERT INTO users (id,address,birthday,cccd,code,created_at,email,gender,image_id,image_url,name,password,phone_number,`role`,status,area_id,branch_id) VALUES
	 ('e3d23466-e107-4480-8137-3fde64a17bd4','Hà Nội','2004-04-28','001204020101','NV001','2026-04-13 00:00:00','manhnv99.dev@gmail.com',1,'zgjbfxbxf4o2ik6romdq','http://res.cloudinary.com/dbxajsljz/image/upload/v1776089837/zgjbfxbxf4o2ik6romdq.jpg','Super Admin','$2a$10$MVVeBHHVC5UKlmXcrG827.9yev1hOCNKqjZO2EUTVHvFYBIX44JP.','0343144320','ROLE_ADMIN',1,'e3d23466-e107-4480-8137-3fde64a17bd4','e3d23466-e107-4480-8137-3fde64a17bd4');
