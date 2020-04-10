import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Employee } from '~entities/employee.entity';

import { CoreEntity } from './core.entity';

@Entity()
export class Department extends CoreEntity {
  public static QUERY_MAPPINGS_TYPES = ['id', 'name'];
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @MinLength(2)
  @MaxLength(20)
  @Column({ unique: true, type: 'varchar', length: 20, nullable: false })
  public name: string;
  @OneToMany(
    () => Employee,
    (employee) => employee.department,
  )
  public employees: Employee[];

  constructor(id?, name?) {
    super();
    this.id = id;
    this.name = name;
  }
}
