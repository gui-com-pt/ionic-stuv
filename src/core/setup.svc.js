(function(){
    angular
        .module('stuv.core')
        .factory('stuv.core.setupSvc', ['$cordovaSQLite', function($cordovaSQLite){

            var reset = function() {
                /*
                 "INSERT INTO route (short_name,number) VALUES ('Rossio - Rio de Loba - Rossio',1), ('AV. 25 DE ABRIL – PARADINHA – AV. 25 DE ABRIL',2), ('ROSSIO – VILA NOVA DO CAMPO – ROSSIO',3), ('AV. A. SAMPAIO – P. MEDRONHOSA – AV. A. SAMPAIO',4), ('ROSSIO – ESC/ TRAVASSÓS CIMA – ROSSIO',5), (6,'ROSSIO – ORGENS / STO.ESTÊVÃO – S.MARTINHO – ROSSIO',6), ('ROSSIO- MOURE MADALENA - ROSSIO',7), ('ROSSIO – MOURE CARVALHAL – ROSSIO',8), (9,'ROSSIO–CASAL PÓVOA–MUNDÃO(ESC)–CAVERNÃES– MUNDÃO(ESC)–CASAL PÓVOA-ROSSIO',9), (10,'ROSSIO – VISO SUL – ROSSIO',10), (11,'ROSSIO – FRAGOSELA – ROSSIO',11), (12,'CENTRAL CAMIONAGEM – TEIVAS - VILA CHÃ SÁ – TEIVAS - CENTRAL CAMIONAGEM',12), (13,'C.CAMIONAGEM – COIMBRÕES – C.CAMIONAGEM',13), (14,'C.CAMIONAGEM-S.J.LOUROSA-OL.BARREIROS-S.J.LOUROSA- C.CAMIONAGEM',14), (15,'C.CAMIONAGEM – VILA CHÃ SÁ – C.CAMIONAGEM',15), (16,'C.CAMIONAGEM – FIGUEIRÓ – C.CAMIONAGEM ( COUTO DE CIMA )',16), (17,'ROSSIO – QUEIRELA - ROSSIO',17), (18,'ROSSIO-PAÇÔ-LUSTOSA-PIAGET-PAÇÔ-ROSSIO',18), (19,'C.CAMIONAGEM-TORREDEITA-REAL FARMINHÃO- TORREDEITA-C.CAMIONAGEM',19), (20,'ROSSIO-B.NORAD-BIGAS-ROSSIO',20), (21,'ROSSIO-OLIVEIRA CIMA-ROSSIO',21), (22,'AGUIEIRA – FAIL – AGUIEIRA (VIA HOSPITAL)',22), (23,'C.CAMIONAGEM-TORREDEITA-BOALDEIA-TORREDEITA- C.CAMIONAGEM',23), (24,'ROSSIO-PEREIRA-SILGUEIROS-GUMIEI-CASAL-RIBAFEITA- CASAL-GUMIEI-SILGUEIROS-PEREIRA-ROSSIO',24);",
                 "INSERT INTO stop_times (trip_id,arrival_time,departure_time,stop_id,stop_sequence) VALUES (1,1,'07:00','07:01',47,NULL), (2,1,'07:10','07:11',1,''), (3,2,'07:25','',47,NULL), (4,3,'07:30','07:31',47,NULL), (5,3,'07:50','07:51',1,''), (6,4,'08:10','',47,NULL), (7,5,'08:15','08:16',47,''), (8,5,'08:35','08:36',1,''), (9,6,'08:55','',47,'');",
                 "INSERT INTO stops (station_name,parent_station,latitude,longitude) VALUES (1,'Rio de Loba',NULL,NULL,NULL), (2,'Av. 25 de Abril',NULL,NULL,NULL), (3,'Paradinha',NULL,NULL,NULL), (4,'Vila Nova Campo',NULL,NULL,NULL), (5,'Av. Alberto Sampaio',NULL,NULL,NULL), (6,'Póvoa Medronhosa',NULL,NULL,NULL), (7,'Sarzedelo',NULL,NULL,NULL), (8,'Esc/Travassós Cima',NULL,NULL,NULL), (9,'Orgens/Sto. Estevão',NULL,NULL,NULL), (10,'Sto. Martinho',NULL,NULL,NULL), (11,'Moure Madalena',NULL,NULL,NULL), (12,'Moure Carvalhal',NULL,NULL,NULL), (13,'Casal Póvoa',NULL,NULL,NULL), (14,'Mundão (Esc)',NULL,NULL,NULL), (15,'Cavernães',NULL,NULL,NULL), (16,'Mundão (Esc)',NULL,NULL,NULL), (17,'Viso Sul',NULL,NULL,NULL), (18,'Fragosela',NULL,NULL,NULL), (19,'Teivas',NULL,NULL,NULL), (20,'Teivas',NULL,NULL,NULL), (21,'Vila Chã Sá',NULL,NULL,NULL), (22,'C. Camionagem',NULL,NULL,NULL), (23,'Qta. Galo',NULL,NULL,NULL), (24,'Coimbrões',NULL,NULL,NULL), (25,'S. J. Lourosa',NULL,NULL,NULL), (26,'Ol. Barreiros',NULL,NULL,NULL), (27,'Figueiró',NULL,NULL,NULL), (28,'Masgalos',NULL,NULL,NULL), (29,'Coutocima',NULL,NULL,NULL), (30,'Queirela',NULL,NULL,NULL), (31,'Paço',NULL,NULL,NULL), (32,'Lustuosa',NULL,NULL,NULL), (33,'Piaget',NULL,NULL,NULL), (34,'Torredeita',NULL,NULL,NULL), (35,'Real Farminhão',NULL,NULL,NULL), (36,'B. Norad',NULL,NULL,NULL), (37,'Bigas',NULL,NULL,NULL), (38,'Oliveira Cima',NULL,NULL,NULL), (39,'Hospital',NULL,NULL,NULL), (40,'Fail',NULL,NULL,NULL), (41,'Boaldeia',NULL,NULL,NULL), (42,'Pereira',NULL,NULL,NULL), (43,'Silgueiros',NULL,NULL,NULL), (44,'Gumiei',NULL,NULL,NULL), (45,'Casal',NULL,NULL,NULL), (46,'Ribafeita',NULL,NULL,NULL), (47,'Rossio',NULL,NULL,NULL);",
                 "INSERT INTO trip (route_id,direction_id) VALUES (1,1,0), (2,1,1), (3,1,0), (4,1,1), (5,1,0), (6,1,1);"


                 "INSERT INTO stop_times (trip_id,arrival_time,departure_time,stop_id,stop_sequence) VALUES (1,1,'07:00','07:01',47,NULL), (2,1,'07:10','07:11',1,''), (3,2,'07:25','',47,NULL), (4,3,'07:30','07:31',47,NULL), (5,3,'07:50','07:51',1,''), (6,4,'08:10','',47,NULL), (7,5,'08:15','08:16',47,''), (8,5,'08:35','08:36',1,''), (9,6,'08:55','',47,'');",
                 "INSERT INTO stops (station_name,parent_station,latitude,longitude) VALUES (1,'Rio de Loba',NULL,NULL,NULL), (2,'Av. 25 de Abril',NULL,NULL,NULL), (3,'Paradinha',NULL,NULL,NULL), (4,'Vila Nova Campo',NULL,NULL,NULL), (5,'Av. Alberto Sampaio',NULL,NULL,NULL), (6,'Póvoa Medronhosa',NULL,NULL,NULL), (7,'Sarzedelo',NULL,NULL,NULL), (8,'Esc/Travassós Cima',NULL,NULL,NULL), (9,'Orgens/Sto. Estevão',NULL,NULL,NULL), (10,'Sto. Martinho',NULL,NULL,NULL), (11,'Moure Madalena',NULL,NULL,NULL), (12,'Moure Carvalhal',NULL,NULL,NULL), (13,'Casal Póvoa',NULL,NULL,NULL), (14,'Mundão (Esc)',NULL,NULL,NULL), (15,'Cavernães',NULL,NULL,NULL), (16,'Mundão (Esc)',NULL,NULL,NULL), (17,'Viso Sul',NULL,NULL,NULL), (18,'Fragosela',NULL,NULL,NULL), (19,'Teivas',NULL,NULL,NULL), (20,'Teivas',NULL,NULL,NULL), (21,'Vila Chã Sá',NULL,NULL,NULL), (22,'C. Camionagem',NULL,NULL,NULL), (23,'Qta. Galo',NULL,NULL,NULL), (24,'Coimbrões',NULL,NULL,NULL), (25,'S. J. Lourosa',NULL,NULL,NULL), (26,'Ol. Barreiros',NULL,NULL,NULL), (27,'Figueiró',NULL,NULL,NULL), (28,'Masgalos',NULL,NULL,NULL), (29,'Coutocima',NULL,NULL,NULL), (30,'Queirela',NULL,NULL,NULL), (31,'Paço',NULL,NULL,NULL), (32,'Lustuosa',NULL,NULL,NULL), (33,'Piaget',NULL,NULL,NULL), (34,'Torredeita',NULL,NULL,NULL), (35,'Real Farminhão',NULL,NULL,NULL), (36,'B. Norad',NULL,NULL,NULL), (37,'Bigas',NULL,NULL,NULL), (38,'Oliveira Cima',NULL,NULL,NULL), (39,'Hospital',NULL,NULL,NULL), (40,'Fail',NULL,NULL,NULL), (41,'Boaldeia',NULL,NULL,NULL), (42,'Pereira',NULL,NULL,NULL), (43,'Silgueiros',NULL,NULL,NULL), (44,'Gumiei',NULL,NULL,NULL), (45,'Casal',NULL,NULL,NULL), (46,'Ribafeita',NULL,NULL,NULL), (47,'Rossio',NULL,NULL,NULL);",
                 "INSERT INTO trip (route_id,direction_id) VALUES (1,1,0), (2,1,1), (3,1,0), (4,1,1), (5,1,0), (6,1,1);"
                 */
                var queries = [
                    "INSERT INTO route (short_name,number) VALUES ('Rossio - Rio de Loba - Rossio',1)"
                ];

                var getDb = function() {
                    if (window.cordova) {
                        return $cordovaSQLite.openDB("my.db"); //device
                    } else {
                        return window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
                    }
                };
                var db = getDb();
                db.transaction(function(tx) {
                    var tables = ['route', 'stop_times', 'stop', 'trip'];

                    angular.forEach(tables, function(value){
                        tx.executeSql('DROP TABLE IF EXISTS ' + value);
                    });

                    var tables = [
                        'CREATE TABLE trip (id INTEGER PRIMARY KEY, route_id INTEGER, direction_id NUMERIC);',
                        'CREATE TABLE stops (id INTEGER PRIMARY KEY, station_name TEXT NOT NULL, parent_station	INTEGER, latitude NUMERIC, longitude NUMERIC);',
                        'CREATE TABLE stop_times (id INTEGER PRIMARY KEY, trip_id INTEGER, arrival_time	TEXT, departure_time TEXT, stop_id INTEGER, stop_sequence TEXT);',
                        'CREATE TABLE route (id INTEGER PRIMARY KEY, short_name	TEXT, number INTEGER);',
                        'CREATE TABLE holiday (id INTEGER PRIMARY KEY, description TEXT, when TEXT);'
                    ];
                    var list = function(object) {
                        for(var key in object) {
                            console.log(key);
                        }
                    }

                    angular.forEach(tables, function(value){
                        tx.executeSql(value, function(tx, res) {

                        }, function(e) {
                            console.log(tables);
                            console.log('TABLE - BEGIN');
                            console.log("ERROR: " + list(e));
                            console.log('TABLE - END');
                        });
                    });

                    angular.forEach(queries, function(value){
                        tx.executeSql(value, function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                        }, function(e) {
                            console.log('QUERY - BEGIN');
                            console.log("ERROR: " + list(e));
                            console.log('QUERY - END');
                        });
                    });
                });
            };

            return {
                reset: reset
            }
        }]);
})();