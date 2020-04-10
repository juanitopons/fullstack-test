import {
  IsOptional,
  Max,
  MaxLength,
  Min,
  validateOrReject,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { CoreEntity } from '~entities/core.entity';
import { Department } from '~entities/department.entity';

@Entity()
export class Employee extends CoreEntity {
  public static QUERY_MAPPINGS_TYPES = ['id', 'departmentId', 'age'];
  @IsOptional()
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @MaxLength(30)
  @Column({ type: 'varchar', length: 30, nullable: false })
  public name: string;
  @MaxLength(30)
  @Column({ type: 'varchar', length: 30, nullable: false })
  public lastname: string;
  @Max(120)
  @Min(20)
  @Column('int')
  public age?: number;
  @ManyToOne(
    () => Department,
    (department) => department.employees,
  )
  @JoinColumn()
  public department: Department;
  @Column()
  @RelationId((employee: Employee) => employee.department)
  public departmentId: number;
  @CreateDateColumn()
  public created?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

  constructor(id?, name?, lastname?, age?, created?, department?: Department) {
    super();
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.created = created;
    this.department = department;
  }
}
