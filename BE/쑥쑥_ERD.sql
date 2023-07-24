DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`user_id`	int	NOT NULL,
	`email`	varchar(50)	NOT NULL	COMMENT '로그인에 활용되는 유저 이메일',
	`password`	char(64)	NOT NULL	COMMENT '로그인에 활용되는 비밀번호- 암호화(SHA 256)되서 저장',
	`user_nickname`	varchar(30)	NOT NULL	COMMENT '유저가 서비스에서 사용될 닉네임',
	`profile_image`	varchar(40)	NOT NULL	DEFAULT 'default'	COMMENT '유저의 프로필 이미지 저장 파일명',
	`created_date`	datetime	NOT NULL	DEFAULT now()	COMMENT '유저의 회원가입 날짜 및 시간',
	`updated_date`	datetime	NOT NULL	DEFAULT now()	COMMENT '유저의 개인 정보가 마지막으로 수정 된 날짜 및 시간',
	`is_validated`	boolean	NOT NULL	DEFAULT true	COMMENT '유저의 계정 유효 여부- 탈퇴 시 1에서 0으로 수정',
	`plant_count`	int	NOT NULL	DEFAULT 0	COMMENT '유저의 전체 식물 등록 횟수 (중복 O)'
);

DROP TABLE IF EXISTS `pot`;

CREATE TABLE `pot` (
	`pot_id`	int	NOT NULL,
	`user_id`	int	NULL,
	`serial_number`	char(8)	NOT NULL	COMMENT 'unique- 화분이 가지고 있는 고유 시리얼 넘버(16진법)',
	`registed_date`	datetime	NULL	COMMENT '화분을 등록한 일시',
	`last_water_time`	datetime	NULL	COMMENT '화분에 마지막으로 물을 준 일시',
	`is_registed`	boolean	NOT NULL	DEFAULT false	COMMENT '화분 등록 여부'
);

DROP TABLE IF EXISTS `plant`;

CREATE TABLE `plant` (
	`plant_id`	int	NOT NULL,
	`category_id`	tinyint	NOT NULL,
	`plant_name`	varchar(20)	NOT NULL	COMMENT '식물의 이름',
	`temp_max`	float(6, 2)	NOT NULL	COMMENT '해당 식물의 최대 생육 온도',
	`temp_min`	float(6, 2)	NOT NULL	COMMENT '해당 식물의 최저 생육 온도',
	`moisture_max`	float(6, 2)	NOT NULL	COMMENT '해당 식물의 최대 토양 수분',
	`moisture_min`	float(6, 2)	NOT NULL	COMMENT '해당 식물의 최소 토양 수분'
);

DROP TABLE IF EXISTS `garden`;

CREATE TABLE `garden` (
	`garden_id`	int	NOT NULL,
	`plant_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`pot_id`	int	NOT NULL,
	`category_id`	tinyint	NOT NULL,
	`level`	int	NOT NULL	DEFAULT 0	COMMENT '해당 화분에 심어진 식물의 성장 단계',
	`plant_nickname`	varchar(30)	NOT NULL	COMMENT '해당 화분에 심어진 식물의 애칭',
	`is_use`	boolean	NOT NULL	DEFAULT true	COMMENT '현재 화분에 있는지 상태 표시',
	`first_date`	datetime	NOT NULL	DEFAULT now()	COMMENT '화분에 식물이 심어진 날짜',
	`second_date`	datetime	NULL	COMMENT '2단계 갱신 날짜',
	`third_date`	datetime	NULL	COMMENT '3단계 갱신 날짜'
);

DROP TABLE IF EXISTS `user_badge`;

CREATE TABLE `user_badge` (
	`user_badge_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`badge_id`	int	NOT NULL,
	`created_date`	datetime	NOT NULL	DEFAULT now()
);

DROP TABLE IF EXISTS `plant_info`;

CREATE TABLE `plant_info` (
	`level`	int	NOT NULL	COMMENT '캐릭터의 성장단계 (1 ~ 3)',
	`plant_id`	int	NOT NULL,
	`plant_guide`	varchar(512)	NOT NULL	COMMENT '해당 단계의 생장 가이드',
	`water_term`	int	NOT NULL	COMMENT '해당 단계의 물 주기 주기 (period)',
	`water_amount`	int	NOT NULL	COMMENT '해당 단계의 1회 관수량 (ml)',
	`character_name`	varchar(30)	NOT NULL	COMMENT '캐릭터의 이름',
	`character_comment`	varchar(100)	NOT NULL	COMMENT '캐릭터의 대사',
	`character_image`	varchar(40)	NOT NULL	COMMENT '캐릭터 이미지 파일명'
);

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
	`collection_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`level`	int	NOT NULL,
	`plant_id`	int	NOT NULL,
	`created_date`	datetime	NOT NULL	DEFAULT now()	COMMENT '유저가 해당 컬렉션을 활성화한 날짜'
);

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
	`photo_id`	int	NOT NULL,
	`garden_id`	int	NOT NULL,
	`pot_id`	int	NOT NULL,
	`plant_image`	varchar(40)	NOT NULL	COMMENT '사진 저장 파일명',
	`photo_date`	datetime	NOT NULL	COMMENT '촬영한 날짜',
	`check_event`	tinyint	NOT NULL	DEFAULT 0	COMMENT '0은 무시 1은 1단계, 2는 2단계, 3은 3단계'
);

DROP TABLE IF EXISTS `measurement`;

CREATE TABLE `measurement` (
	`measurement_id`	int	NOT NULL,
	`pot_id`	int	NOT NULL,
	`measurement_value`	float(6, 2)	NOT NULL	COMMENT '센서의 측정값 / 0000.00',
	`measurement_time`	datetime	NOT NULL	DEFAULT now()	COMMENT '센서값 측정 시간',
	`sensor_type`	char(1)	NOT NULL	COMMENT 'T : temparature / H : Hu.... / M : moisture'
);

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
	`notification_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`pot_plant_id`	int	NOT NULL,
	`pot_id`	int	NOT NULL,
	`category_id`	tinyint	NOT NULL,
	`text`	varchar(100)	NOT NULL,
	`visible`	boolean	NOT NULL	DEFAULT true	COMMENT 'true면 표시',
	`notification_date`	datetime	NOT NULL	DEFAULT now()	COMMENT '알림 발송 시간',
	`check_date`	datetime	NULL	COMMENT '알림 확인 시간'
);

DROP TABLE IF EXISTS `plant_category`;

CREATE TABLE `plant_category` (
	`category_id`	tinyint	NOT NULL,
	`category_name`	varchar(20)	NOT NULL	COMMENT '식물 분류명'
);

DROP TABLE IF EXISTS `badge`;

CREATE TABLE `badge` (
	`badge_id`	int	NOT NULL,
	`badge_name`	varchar(30)	NOT NULL	COMMENT '업적 이름',
	`contition`	varchar(100)	NOT NULL	COMMENT '업적 획득 조건 설명',
	`description`	varchar(100)	NOT NULL	COMMENT '업적 획득 후 표시할 설명',
	`is_hidden`	boolean	NOT NULL	DEFAULT false	COMMENT '히든 업적 플래그(없어도 되면 말구)',
	`badge_image`	varchar(40)	NOT NULL	COMMENT '업적 뱃지 이미지'
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `pot` ADD CONSTRAINT `PK_POT` PRIMARY KEY (
	`pot_id`
);

ALTER TABLE `plant` ADD CONSTRAINT `PK_PLANT` PRIMARY KEY (
	`plant_id`,
	`category_id`
);

ALTER TABLE `garden` ADD CONSTRAINT `PK_GARDEN` PRIMARY KEY (
	`garden_id`,
	`plant_id`,
	`user_id`,
	`pot_id`,
	`category_id`
);

ALTER TABLE `user_badge` ADD CONSTRAINT `PK_USER_BADGE` PRIMARY KEY (
	`user_badge_id`,
	`user_id`,
	`badge_id`
);

ALTER TABLE `plant_info` ADD CONSTRAINT `PK_PLANT_INFO` PRIMARY KEY (
	`level`,
	`plant_id`
);

ALTER TABLE `collection` ADD CONSTRAINT `PK_COLLECTION` PRIMARY KEY (
	`collection_id`,
	`user_id`,
	`level`,
	`plant_id`
);

ALTER TABLE `photo` ADD CONSTRAINT `PK_PHOTO` PRIMARY KEY (
	`photo_id`,
	`garden_id`,
	`pot_id`
);

ALTER TABLE `measurement` ADD CONSTRAINT `PK_MEASUREMENT` PRIMARY KEY (
	`measurement_id`,
	`pot_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `PK_NOTIFICATION` PRIMARY KEY (
	`notification_id`,
	`user_id`,
	`pot_plant_id`,
	`pot_id`,
	`category_id`
);

ALTER TABLE `plant_category` ADD CONSTRAINT `PK_PLANT_CATEGORY` PRIMARY KEY (
	`category_id`
);

ALTER TABLE `badge` ADD CONSTRAINT `PK_BADGE` PRIMARY KEY (
	`badge_id`
);

ALTER TABLE `plant` ADD CONSTRAINT `FK_plant_category_TO_plant_1` FOREIGN KEY (
	`category_id`
)
REFERENCES `plant_category` (
	`category_id`
);

ALTER TABLE `garden` ADD CONSTRAINT `FK_plant_TO_garden_1` FOREIGN KEY (
	`plant_id`
)
REFERENCES `plant` (
	`plant_id`
);

ALTER TABLE `garden` ADD CONSTRAINT `FK_plant_TO_garden_2` FOREIGN KEY (
	`category_id`
)
REFERENCES `plant` (
	`category_id`
);

ALTER TABLE `garden` ADD CONSTRAINT `FK_user_TO_garden_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `garden` ADD CONSTRAINT `FK_pot_TO_garden_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `user_badge` ADD CONSTRAINT `FK_user_TO_user_badge_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `user_badge` ADD CONSTRAINT `FK_badge_TO_user_badge_1` FOREIGN KEY (
	`badge_id`
)
REFERENCES `badge` (
	`badge_id`
);

ALTER TABLE `plant_info` ADD CONSTRAINT `FK_plant_TO_plant_info_1` FOREIGN KEY (
	`plant_id`
)
REFERENCES `plant` (
	`plant_id`
);

ALTER TABLE `collection` ADD CONSTRAINT `FK_user_TO_collection_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `collection` ADD CONSTRAINT `FK_plant_info_TO_collection_1` FOREIGN KEY (
	`level`
)
REFERENCES `plant_info` (
	`level`
);

ALTER TABLE `collection` ADD CONSTRAINT `FK_plant_info_TO_collection_2` FOREIGN KEY (
	`plant_id`
)
REFERENCES `plant_info` (
	`plant_id`
);

ALTER TABLE `photo` ADD CONSTRAINT `FK_garden_TO_photo_1` FOREIGN KEY (
	`garden_id`
)
REFERENCES `garden` (
	`garden_id`
);

ALTER TABLE `photo` ADD CONSTRAINT `FK_garden_TO_photo_2` FOREIGN KEY (
	`pot_id`
)
REFERENCES `garden` (
	`pot_id`
);

ALTER TABLE `measurement` ADD CONSTRAINT `FK_pot_TO_measurement_1` FOREIGN KEY (
	`pot_id`
)
REFERENCES `pot` (
	`pot_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `FK_user_TO_notification_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `FK_garden_TO_notification_1` FOREIGN KEY (
	`pot_plant_id`
)
REFERENCES `garden` (
	`garden_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `FK_garden_TO_notification_2` FOREIGN KEY (
	`pot_id`
)
REFERENCES `garden` (
	`pot_id`
);

ALTER TABLE `notification` ADD CONSTRAINT `FK_garden_TO_notification_3` FOREIGN KEY (
	`category_id`
)
REFERENCES `garden` (
	`category_id`
);

