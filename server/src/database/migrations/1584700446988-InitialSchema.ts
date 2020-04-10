import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1584700446988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE department (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(20) NOT NULL,
        CONSTRAINT UQ_ae4578dcaed5adff96595e61660 UNIQUE (name),
        CONSTRAINT PK_b36bcfe02fc8de3c57a8b2391c2 PRIMARY KEY (id)
       );`);
    await queryRunner.query(`CREATE TABLE employee (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(30) NOT NULL,
        lastname varchar(30) NOT NULL,
        age int NULL,
        departmentId int NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT PK_a95e949168be7b7ece1a2382fed PRIMARY KEY (id)
    );`);

    await queryRunner.query(`ALTER TABLE employee
        ADD CONSTRAINT FK_7bcffdf3e178d0b35c0c50541ee FOREIGN KEY (departmentId) REFERENCES department(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE employee DROP CONSTRAINT FK_7bcffdf3e178d0b35c0c50541ee`,
    );
    await queryRunner.query(`DROP TABLE employee`);
    await queryRunner.query(`DROP TABLE department`);
  }
}
