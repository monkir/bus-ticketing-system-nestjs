import { employeeEntity } from "src/employee/employee.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class posterEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @ManyToOne(()=>employeeEntity, (employeeEntity)=>employeeEntity.posters)
    employee: posterEntity;
}