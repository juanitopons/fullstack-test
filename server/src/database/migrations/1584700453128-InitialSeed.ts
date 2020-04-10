import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSeed1584700453128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`INSERT INTO department (name) VALUES 
        ('Tecnología'), ('Innovación'), ('Marketing'), ('RRHH');`);
    const departments = await queryRunner.query(`SELECT * FROM department`);
    if (departments.length) {
      await queryRunner.query(`INSERT INTO employee (name, lastname, age, departmentId) VALUES 
        ('Empleado1', 'Appellido1', 25, ${departments[0].id}),
        ('Empleado2', 'Appellido2', 27, ${departments[1].id}),
        ('Empleado3', 'Appellido3', 33, ${departments[1].id}),
        ('Empleado4', 'Appellido4', 32, ${departments[3].id}),
        ('Empleado6', 'Appellido6', 34, ${departments[2].id}),
        ('Empleado7', 'Appellido7', 57, ${departments[2].id}),
        ('Empleado1', 'Appellido8', 45, ${departments[0].id}),
        ('Empleado5', 'Appellido5', 21, ${departments[0].id});`);
    } else {
      console.log('No departments were added');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM employee;`);
    await queryRunner.query(`DELETE FROM department;`);
  }
}
