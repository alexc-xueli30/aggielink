-- Run this in the Supabase SQL editor AFTER running schema.sql.

-- ============================================================
-- FARMS (22 rows)
-- ============================================================
insert into farms (id, name, steward, county, acres, years_farming, certifications, practices, top_crops, weekly_capacity_lb, joined_year, distance_mi) values
('f-01','Putah Creek Family Farm','Maria & David Soto','Yolo',28,22,'["USDA Organic","CCOF"]','["No-till","Cover cropping"]','["Carrots","Beets","Radish"]',240,2023,8),
('f-02','Cache Creek Organics','Lin Zhao','Yolo',14,9,'["USDA Organic"]','["Drip irrigation","Compost"]','["Lettuce","Kale","Chard"]',180,2024,16),
('f-03','Capay Hills Garden','The Vargas Family','Yolo',35,31,'["USDA Organic","Real Organic"]','["Hedgerows","Polyculture"]','["Tomatoes","Peppers","Squash"]',320,2023,24),
('f-04','Solano Heritage Farm','James Whitfield','Solano',42,18,'["GAP"]','["Integrated pest mgmt"]','["Apples","Pears","Stone fruit"]',410,2024,19),
('f-05','Coyote Hill Produce','Ana Mendez','Solano',11,6,'["Certified Naturally Grown"]','["No-spray","Hand-harvest"]','["Strawberries","Herbs"]',90,2025,22),
('f-06','Clarksburg Sun Farm','Tom & Ellie Park','Sacramento',19,14,'["USDA Organic"]','["Cover cropping"]','["Sweet corn","Melons"]',220,2023,28),
('f-07','Yolo Greenway Acres','Priya Patel','Yolo',8,4,'["CCOF"]','["Drip irrigation"]','["Greens","Herbs"]',110,2025,7),
('f-08','Knight''s Landing Growers','The Nguyen Family','Yolo',24,12,'["GAP"]','["Crop rotation"]','["Onions","Garlic","Leeks"]',260,2024,18),
('f-09','Suisun Marsh Gardens','Dorothy Chen','Solano',6,3,'["Certified Naturally Grown"]','["Pollinator strips"]','["Microgreens","Edible flowers"]',60,2025,26),
('f-10','Winters Mesa Farm','Carlos Reyes','Yolo',31,21,'["USDA Organic","CCOF"]','["Dry farming","Hedgerows"]','["Winter squash","Pumpkins"]',350,2023,21),
('f-11','Esparto Hill Orchards','Jane Albrecht','Yolo',18,16,'["GAP"]','["Integrated pest mgmt"]','["Apples","Plums"]',240,2024,30),
('f-12','Vacaville Valley Farm','Hannah & Eli Brooks','Solano',22,8,'["USDA Organic"]','["No-till","Compost"]','["Broccoli","Cauliflower","Cabbage"]',290,2024,23),
('f-13','River Bend Produce','Wei Lin','Sacramento',16,11,'["CCOF"]','["Cover cropping"]','["Asian greens","Bok choy"]',170,2024,27),
('f-14','Madison Acre Farm','Sarah Johnston','Yolo',9,5,'["Certified Naturally Grown"]','["Hand-harvest"]','["Carrots","Beets"]',95,2025,14),
('f-15','Dixon Sunrise Farm','Robert & Lisa Hall','Solano',38,26,'["GAP"]','["Crop rotation"]','["Sweet corn","Tomatoes"]',380,2023,17),
('f-16','Three Sisters Heritage','The Yazzie Family','Yolo',12,7,'["USDA Organic"]','["Polyculture","Indigenous methods"]','["Beans","Corn","Squash"]',130,2024,12),
('f-17','Plainfield Pasture','Marcus Hill','Yolo',27,13,'["GAP"]','["Silvopasture"]','["Eggs","Pasture greens"]',200,2024,11),
('f-18','Russell Boulevard Greens','Davis Co-op','Yolo',5,3,'["Certified Naturally Grown"]','["Urban agriculture"]','["Salad mix","Microgreens"]',75,2025,4),
('f-19','Pleasant Valley Farm','Tomás Ortega','Solano',20,17,'["USDA Organic"]','["Compost","Drip irrigation"]','["Peppers","Eggplant"]',220,2024,25),
('f-20','Buckhorn Ranch','Helen & Frank Lopez','Yolo',33,24,'["GAP","CCOF"]','["Hedgerows"]','["Apples","Pears"]',340,2023,20),
('f-21','West Plainfield Co-op','Co-op of 4 farms','Yolo',17,10,'["USDA Organic"]','["Cooperative","Cover cropping"]','["Mixed vegetables"]',180,2024,9),
('f-22','Sycamore Slough Farms','The Adeyemi Family','Sacramento',21,9,'["CCOF"]','["No-till"]','["Sweet potatoes","Okra"]',200,2024,29);

-- ============================================================
-- ORDER HEADER
-- ============================================================
insert into orders (week_of, buyer, buyer_logo, delivery, total_lb, line_count, contributing_farms, status, invoice_id)
values (
  'Week of May 11, 2026',
  'UC Davis Dining Services',
  'UCD',
  'Tuesday, 6:00 AM · Dining Commons Loading Dock',
  2840,
  14,
  18,
  'Ready for dispatch',
  'AL-2026-W19-UCD'
);

-- ============================================================
-- ORDER LINES (14 rows, order_id = 1)
-- ============================================================
insert into order_lines (order_id, crop, category, amount_lb, packed_as, contributors) values
(1,'Carrots','Roots',320,'20 lb cases','[{"farmId":"f-01","lb":140},{"farmId":"f-14","lb":95},{"farmId":"f-16","lb":50},{"farmId":"f-21","lb":35}]'),
(1,'Lettuce (Romaine)','Greens',260,'24-count cases','[{"farmId":"f-02","lb":110},{"farmId":"f-07","lb":70},{"farmId":"f-18","lb":50},{"farmId":"f-21","lb":30}]'),
(1,'Kale (Lacinato)','Greens',180,'12-bunch cases','[{"farmId":"f-02","lb":70},{"farmId":"f-07","lb":60},{"farmId":"f-13","lb":50}]'),
(1,'Broccoli','Brassicas',240,'20 lb cases','[{"farmId":"f-12","lb":180},{"farmId":"f-21","lb":60}]'),
(1,'Cabbage','Brassicas',200,'40 lb bins','[{"farmId":"f-12","lb":110},{"farmId":"f-15","lb":90}]'),
(1,'Yellow Onions','Alliums',280,'50 lb bags','[{"farmId":"f-08","lb":200},{"farmId":"f-21","lb":80}]'),
(1,'Garlic','Alliums',60,'10 lb cases','[{"farmId":"f-08","lb":60}]'),
(1,'Roma Tomatoes','Nightshades',220,'20 lb flats','[{"farmId":"f-03","lb":140},{"farmId":"f-15","lb":80}]'),
(1,'Bell Peppers','Nightshades',140,'15 lb cases','[{"farmId":"f-03","lb":80},{"farmId":"f-19","lb":60}]'),
(1,'Zucchini','Squash',200,'20 lb cases','[{"farmId":"f-03","lb":110},{"farmId":"f-10","lb":90}]'),
(1,'Apples (Gala)','Fruit',360,'40 lb cases','[{"farmId":"f-04","lb":180},{"farmId":"f-11","lb":100},{"farmId":"f-20","lb":80}]'),
(1,'Strawberries','Fruit',80,'8 lb flats','[{"farmId":"f-05","lb":80}]'),
(1,'Beets','Roots',160,'25 lb cases','[{"farmId":"f-01","lb":80},{"farmId":"f-14","lb":50},{"farmId":"f-16","lb":30}]'),
(1,'Mixed Salad Greens','Greens',140,'3 lb bags','[{"farmId":"f-09","lb":40},{"farmId":"f-13","lb":50},{"farmId":"f-18","lb":50}]');

-- ============================================================
-- IMPACT SNAPSHOT
-- ============================================================
insert into impact (pounds_this_season, farms_supported, institutions_served, acres_in_network, average_farm_size, farms_under_30_acres, highlights, weekly_trend, by_category, by_county, institutions) values (
  38420,
  22,
  4,
  456,
  21,
  18,
  '["Your network supplied 38,420 lb of food across 22 small farms this season — without any single farm needing to scale beyond what it can responsibly produce.","82% of contributing farms operate on fewer than 30 acres. AggieLink''s pooled fulfillment is what made them eligible to bid.","Dollars spent in the network return to growers in the same three counties they came from."]',
  '[{"week":"W1","lb":1840},{"week":"W2","lb":2120},{"week":"W3","lb":2010},{"week":"W4","lb":2380},{"week":"W5","lb":2470},{"week":"W6","lb":2290},{"week":"W7","lb":2540},{"week":"W8","lb":2680},{"week":"W9","lb":2510},{"week":"W10","lb":2740},{"week":"W11","lb":2620},{"week":"W12","lb":2840}]',
  '[{"category":"Fruit","lb":9200,"color":"#b86244"},{"category":"Greens","lb":6800,"color":"#458c55"},{"category":"Roots","lb":5400,"color":"#9c7327"},{"category":"Brassicas","lb":4900,"color":"#286c3c"},{"category":"Nightshades","lb":4400,"color":"#cd7d5e"},{"category":"Alliums","lb":3700,"color":"#74ad7e"},{"category":"Squash","lb":2700,"color":"#dbab5d"},{"category":"Other","lb":1320,"color":"#a9ccae"}]',
  '[{"county":"Yolo","farms":12},{"county":"Solano","farms":7},{"county":"Sacramento","farms":3}]',
  '[{"name":"UC Davis Dining Services","since":2023},{"name":"Sutter Davis Hospital","since":2024},{"name":"Davis Joint Unified School District","since":2024},{"name":"Woodland Memorial Hospital","since":2025}]'
);

-- ============================================================
-- DEMAND POSTS (5 rows)
-- ============================================================
insert into demand_posts (buyer, crop, quantity_lb, needed_by, certification_requirements, delivery_schedule, notes, status) values
('UC Davis Dining Services', 'Kale (Lacinato)', 200, '2026-05-18', '["USDA Organic"]', 'Tuesday 6:00 AM', 'Lacinato variety preferred', 'open'),
('UC Davis Dining Services', 'Carrots', 300, '2026-05-18', '[]', 'Tuesday 6:00 AM', 'Any variety, 20 lb cases', 'open'),
('Sutter Davis Hospital', 'Salad Mix', 80, '2026-05-20', '["Certified Naturally Grown"]', 'Wednesday 7:00 AM', 'Pre-washed preferred', 'open'),
('Davis Joint Unified School District', 'Apples', 400, '2026-05-22', '["GAP"]', 'Friday 8:00 AM', 'Gala or Fuji variety', 'open'),
('Woodland Memorial Hospital', 'Broccoli', 150, '2026-05-25', '["USDA Organic"]', 'Monday 6:00 AM', '', 'open');
